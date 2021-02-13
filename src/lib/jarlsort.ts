import { getAmateurRadioInfoByCallsign } from 'callsign/src/node';
import { SimpleAdif } from 'adif-parser-ts';

type records = {
  [field: string]: string;
};

const compare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const preset = (v: string) => {
  // JA1BCD -> 1JABCD
  if (v[2] === '0') {
    // ascii 文字コードの '9' より大きければいいので、'A' にする
    return 'A' + v.slice(0, 2) + v.slice(3);
  }
  return v[2] + v.slice(0, 2) + v.slice(3);
};

const jaSort = (data: records[]): records[] => {
  // 'J'で始まる局とその他（'7' or '8'）に分ける。
  const dataJ = data.filter((v) => v.call[0] === 'J');
  const data7 = data.filter((v) => v.call[0] !== 'J');
  const sortedDataJ = dataJ.sort((a, b) => {
    
    const atemp = preset(a.call);
    const btemp = preset(b.call);

    return compare(atemp, btemp);
  });
  const sortedData7 = data7.sort((a, b) => compare(a.call, b.call));
  return sortedDataJ.concat(sortedData7);
};

export const jarlsort = (data: SimpleAdif): SimpleAdif => {
  if (data.records === undefined) {
    return data;
  }
  // 1. JA局とその他（外国局）で分ける。
  const recordsJA = data.records.filter((v) => getAmateurRadioInfoByCallsign(v.call).area === 'Japan');
  const recordsDX = data.records.filter((v) => getAmateurRadioInfoByCallsign(v.call).area !== 'Japan');
  const sortedRecordsJA = jaSort(recordsJA);
  const sortedRecordsDX = recordsDX.sort((a, b) => compare(a.call, b.call));
  
  data.records = sortedRecordsJA.concat(sortedRecordsDX);
  return data;
}
