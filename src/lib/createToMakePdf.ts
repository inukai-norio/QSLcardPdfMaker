import { SimpleAdif } from "adif-parser-ts";
export type makePdf = {
  band: String,
  call: String,
  frequency: String,
  mode: String,
  date: String,
  time: String,
  rst_rcvd: String,
  rst_sent: String,
  power: String,
  gridsquare: String,
};

export const createToMakePdf = (data: SimpleAdif): makePdf[] => {
  if (data.records === undefined) {
    throw new Error('data is undifined');
  }
  return data.records.map((v) => {
    return {
      band: v.band,
      call: v.call,
      frequency: v.freq,
      mode: v.mode === 'MFSK' ? v.submode : v.mode,
      date: v.qso_date,
      time: v.time_on,
      rst_rcvd: v.rst_rcvd,
      rst_sent: v.rst_sent,
      power: v.tx_pwr,
      gridsquare: v.gridsquare,
    }
  });
}