import moment from 'moment';
import { SimpleAdif } from 'adif-parser-ts';

const makeDate = (date: string, time: string): string =>
  moment.utc(date + time, 'YYYYMMDDHHmmss').toISOString();

export default (data: SimpleAdif): { [field: string]: string }[] => {
  if (data.records === undefined) {
    throw new Error('data is undifined');
  }
  return data.records.map(
    (v) =>
      new Proxy(v, {
        get: (target, p) => {
          if (p === 'mode') {
            return target.mode === 'MFSK' ? target.submode : target.mode;
          }
          if (p === 'date') {
            return makeDate(target.qso_date, target.time_on);
          }
          if (p === 'power') {
            return target.tx_pwr;
          }
          if (p === 'frequency') {
            return target.freq;
          }
          return target[<string>p];
        },
      })
  );
};
