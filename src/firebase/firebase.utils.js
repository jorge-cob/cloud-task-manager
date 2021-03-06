import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD21_Ld93yO70mb8p3wV7vZacp9vqUce2w",
  authDomain: "wholist-db.firebaseapp.com",
  projectId: "wholist-db",
  storageBucket: "wholist-db.appspot.com",
  messagingSenderId: "149014277771",
  appId: "1:149014277771:web:1ad9400fc15b803caaae8e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const userName = displayName ? displayName : additionalData.displayName;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName: userName,
        email,
        createdAt
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};

export const createUserItemsDocument = async (userAuth) => {
  if(!userAuth) return;
  return firestore.collection('items');
};

export const createItemsDocument = async (userAuth, itemData) => {
  if(!userAuth) return;
  const { categories, id, title, description, isTodo, status, color, index, dateTime } = itemData.payload;
  const itemsRef = firestore.collection('items');
  const userItemsSnapshot = await itemsRef.where('userId', '==', userAuth.uid).orderBy('index', 'desc').get();
  let isFirst = 0;
  let indexToCompute = '';
  let itemCount = 0;
  userItemsSnapshot.forEach(doc => {
    indexToCompute = isFirst === 0 ?  doc.data().index : indexToCompute;
    itemCount++;
  });
  let computedIndex = index;
  if (!index && itemCount === 0) {
    computedIndex = 1000000000;
  } else if (!index) {
    computedIndex = indexToCompute + 100000000;
  }
  const itemRef = firestore.doc(`items/${id}`);
  const snapShot = await itemRef.get();
  const createdAt = new Date();
  try {
    if(!snapShot.exists) {
      await firestore.collection('items').doc(id).set({ userId: userAuth.uid, categories, id, title, description, isTodo, status, color, index: computedIndex, dateTime, createdAt: createdAt});  
    } else {
      await firestore.collection('items').doc(id).update({categories, id, title, description, isTodo, status, color, index: computedIndex, dateTime});
    }
    const junctions = await firestore
    .collection(`junction_category_item`)
    .where("itemId", "==", id)
    .get();
    await Promise.all(
      junctions.docs
        .filter(doc => doc.exists)
        .map(doc => firestore.doc(`junction_category_item/${doc.data().categoryId}_${doc.data().itemId}`).delete())
    );
    categories.forEach(async cat => {
      const junctionRef = firestore.doc(`junction_category_item/${cat}_${id}`);
      await junctionRef.set({ categoryId: cat, itemId: id, createdAt: createdAt });
    })

  } catch (err) {
    console.log('Something went wrong when updating your item. Please try again later', err.message);
  }

  return itemRef;
};



export const fetchItemCategories = async (action) => {
  const junctions = await firestore
  .collection(`junction_category_item`)
  .where("itemId", "==", action.payload)
  .get();

  const categories = await Promise.all(
    junctions.docs
      .filter(doc => doc.exists)
      .map(doc => firestore.doc(`categories/${doc.data().categoryId}`).get())
  );

  return categories.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
};


export const fetchCategories = async (userAuth) => {
  const junctions = await firestore
  .collection(`junction_user_category`)
  .where("userId", "==", userAuth.uid)
  .get();

  const categories = await Promise.all(
    junctions.docs
      .filter(doc => doc.exists)
      .map(doc => firestore.doc(`categories/${doc.data().categoryId}`).get())
  );

  return categories.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
}

export const getItemCategories = async (itemsMap) => {
  const items = [];
  await Promise.all(Object.values(itemsMap).map(async item => {
    const getCategories = await firestore.collection(`junction_category_item`).where('itemId', '==', item.id).get();
    const categoryIds = await getCategories.docs.filter(doc => doc.exists).map(doc => doc.data().categoryId);     
    items.push({
      ...item,
      categories: categoryIds
    })
  }));
  return items;
}

export const convertItemsSnapshotToMap = (items) => {
  const transformedItem = items.docs.map(doc => {
    const {
      title,
      status,
      description,
      isTodo,
      color,
      index,
      dateTime
    } = doc.data();
    return {
      id: doc.id,
      title,
      status,
      description,
      isTodo,
      color,
      index,
      dateTime
    }
  });
  return transformedItem;
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const removeItemFromDB = async (itemId) => {
  await firestore.collection('items').doc(itemId).delete();
  const junctions = await firestore
    .collection(`junction_category_item`)
    .where("itemId", "==", itemId)
    .get();
  const batch = firestore.batch();
  junctions.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}

export const deleteCategoryFromDB = async (categoryId) => {
  await firestore.collection('categories').doc(categoryId).delete();
  const itemJunctions = await firestore
    .collection(`junction_category_item`)
    .where("categoryId", "==", categoryId)
    .get();
  const userJunctions = await firestore
    .collection(`junction_user_category`)
    .where("categoryId", "==", categoryId)
    .get();
  const batch = firestore.batch();
  itemJunctions.forEach(doc => {
    batch.delete(doc.ref);
  });
  userJunctions.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}

export const addCategoryToDb = async (userId, categoryId, itemData) => {
  const createdAt = new Date();
  const junctionRef = firestore.doc(`junction_user_category/${userId}_${categoryId}`);
  await junctionRef.set({ userId, categoryId, createdAt: createdAt });
  return await firestore.collection('categories').doc(categoryId).set({...itemData, createdAt: createdAt});
};

export const changeItemIndex = async (itemToChangeIndex, newIndex) => {
  return await firestore.collection('items').doc(itemToChangeIndex).update({
    index: newIndex
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
