import moment from 'moment';

// TODO: separate files

export const randomWidth = (minWidth: number, offset: number) => minWidth + offset * Math.random();

export const getDateString = (date: string): string => {
  const dateMoment = moment(date);
  const now = moment();

  if (dateMoment.isBefore(now, 'year')) {
    return dateMoment.format('DD.MM.YY');
  } else if (dateMoment.isBefore(now, 'month')) {
    return dateMoment.format('MMMM Do');
  } else if (dateMoment.isBefore(now, 'day')) {
    return dateMoment.format('ddd');
  }

  return dateMoment.format('HH:mm');
};
