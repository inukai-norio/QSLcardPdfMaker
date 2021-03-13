import moment from "moment";
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

const makeDate = (date: string, time: string): moment.Moment => moment.utc(date + time, 'YYYYMMDDHHmmss');

export const createToMakePdf = (data: SimpleAdif): MakePdf[] => {
  if (data.records === undefined) {
    throw new Error('data is undifined');
  }

  return data.records.map((v) => {
    [
      'band',
      'call',
      'freq',
      'mode',
      'qso_date',
      'time_on',
      'rst_rcvd',
      'rst_sent',
    ].forEach((i) => {
      if (v[i] === undefined) {
        throw new Error(`${i} is undifined`);
      }
    });
    return {
      band: v.band,
      call: v.call,
      frequency: v.freq,
      mode: v.mode === 'MFSK' ? v.submode : v.mode,
      date: makeDate(v.qso_date, v.time_on),
      rst_rcvd: v.rst_rcvd,
      rst_sent: v.rst_sent,
      power: v.tx_pwr,
      gridsquare:
        v.gridsquare === undefined ? undefined : v.gridsquare.slice(0, 4),
    };
  });
};
