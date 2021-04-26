import { ReactComponent as IconPending } from '../../assets/svg/calendar-regular.svg';
import { ReactComponent as IconDone } from '../../assets/svg/calendar-check-regular.svg';
import { ReactComponent as IconDiscarded } from '../../assets/svg/calendar-times-regular.svg';

export const getStatusIcon = (status, classes) => {
  switch (status) {
    case 'pending':
      return <IconPending className={classes} />;
    case 'discarded':
      return <IconDiscarded className={classes} />
    case 'done':
      return <IconDone className={classes} />
    default:
      return null;
  }
};
