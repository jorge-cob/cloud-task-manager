import { ReactComponent as IconPending } from '../../assets/svg/calendar-regular.svg';
import { ReactComponent as IconDone } from '../../assets/svg/calendar-check-regular.svg';

export const getStatusIcon = (status, classes) => {
  switch (status) {
    case 'pending':
      return <IconPending className={classes} />;
    case 'done':
      return <IconDone className={classes} />
    default:
      return null;
  }
};
