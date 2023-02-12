import moment from "moment/moment";

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

export const formatDate = (date: string): string => {
  const dateMoment = moment(date);
  const now = moment();

  if (dateMoment.isBefore(now, 'year')) {
    return dateMoment.format('DD.MM.YY');
  } else if (dateMoment.isBefore(now, 'month')) {
    return dateMoment.format('MMMM Do');
  } else if (dateMoment.isBefore(now, 'day')) {
    if (now.date() - dateMoment.date() === 1) {
      return 'Yesterday';
    }
    return dateMoment.format('dddd');
  }

  return 'Today';
};