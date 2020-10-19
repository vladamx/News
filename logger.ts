import { dateTime } from './util/dateTime';

// NOTE: Simple logging utility. Can be expanded to support multiple transports
// i.e 3-rd party crash reporting, analytics ...

const tagDateTime = (message: string) => {
  return `${dateTime('HH:MM:SS:SSS')} ${message}`;
};

export const log = {
  debug(message: string) {
    console.log(tagDateTime(`DEBUG: ${message}`));
  },
  error(message: string) {
    console.log(tagDateTime(`ERROR: ${message}`));
  },
  info(message: string) {
    console.log(tagDateTime(`INFO: ${message}`));
  },
};
