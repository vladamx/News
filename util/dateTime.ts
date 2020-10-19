import format from 'date-fns/format';

export const dateTime = (dateFormat: string) => {
  return format(new Date(), dateFormat);
};
