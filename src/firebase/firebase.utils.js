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
};;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
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

export const createUserCategoriesDocument = async (userAuth) => {
  if(!userAuth) return;
  return firestore.collection('categories');
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
  console.log(itemsMap);
  return itemsMap;
 
}

export const convertItemsSnapshotToMap = (items) => {
  const transformedItem = items.docs.map(doc => {
    const {
      title,
      status,
      description
    } = doc.data();
    return {
      id: doc.id,
      title,
      status,
      description,
    }
  });
  return transformedItem;
};

export const convertCategoriesSnapshotToMap = (categories) => {
  const transformedCategory = categories.docs.map(doc => {
    const {
      title,
      description
    } = doc.data();
    return {
      id: doc.id,
      title,
      description,
    }
  });
  return transformedCategory;
};



if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotTopMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const addItemToDB = async (categoryId, newItemId, itemData) => {
  await firestore.collection('items').doc(newItemId).set(itemData);
  const junctions = await firestore
  .collection(`junction_category_item`)
  .where("itemId", "==", newItemId)
  .get();

  await Promise.all(
    junctions.docs
      .filter(doc => doc.exists)
      .map(doc => firestore.doc(`junction_category_item/${doc.data().categoryId}_${doc.data().itemId}`).delete())
  );
  return categoryId.forEach(async cat => {
    const junctionRef = firestore.doc(`junction_category_item/${cat}_${newItemId}`);
    await junctionRef.set({ categoryId: cat, itemId: newItemId });
  })
};


export const addCategoryToDb = async (userId, newItemId, itemData) => {
  const junctionRef = firestore.doc(`junction_user_category/${userId}_${newItemId}`);
  await junctionRef.set({ userId, categoryId: newItemId });
  return await firestore.collection('categories').doc(newItemId).set(itemData);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
