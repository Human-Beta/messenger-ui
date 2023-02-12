import { FC } from "react";
import { formatDate } from "../../../utils/date.utils";
import styles from './DateGroup.module.scss';

interface DateGroupProps {
  date: string
}

const DateGroup: FC<DateGroupProps> = ({date}) => {
  return (
    <span className={`${styles.root} unselectable`}>{formatDate(date)}</span>
  );
};

export default DateGroup;