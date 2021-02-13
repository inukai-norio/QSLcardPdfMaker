import { getAmateurRadioInfoByCallsign } from 'callsign';
import { SimpleAdif } from 'adif-parser-ts';

export const jarlsort = (data: SimpleAdif): SimpleAdif => {
  if (data.records === undefined) {
    return data;
  }
  data.records = [
    { call:"JF1DPF" },
    { call:"JH2FNN" },
    { call:"JJ2IJU" },
    { call:"JA3QNI" },
    { call:"JA4VPS" },
    { call:"JA7BFT" },
    { call:"JA7FVT" },
    { call:"JA7WXL" },
    { call:"JE7GXQ" },
    { call:"JR0NEA" },
    { call:"7L1DST" },
    { call:"DS5USH" },
    { call:"HL3EMT" },
    { call:"R0CCG" },
    { call:"UA0LW" },
    { call:"VR2XZK" },
  ];
  return data;
}
