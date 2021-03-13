import moment from 'moment';
import { SimpleAdif } from 'adif-parser-ts';

export type MakePdf = {
  band: string;
  call: string;
  frequency: string;
  mode: string;
  date: moment.Moment;
  rst_rcvd: string;
  rst_sent: string;
  power?: string;
  gridsquare?: string;
};

const makeDate = (date: string, time: string): moment.Moment =>
  moment.utc(date + time, 'YYYYMMDDHHmmss');

export const createToMakePdf = (data: SimpleAdif): {[field: string]: string | moment.Moment}[] => {
  
  if (data.records === undefined) {
    throw new Error('data is undifined');
  }
return data.records.map((v) => 
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
    }
  }));
}