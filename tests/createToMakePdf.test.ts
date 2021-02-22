import * as fs from 'fs';
import readDdifAndParse from '../src/lib/adif';
import { createToMakePdf } from '../src/lib/createToMakePdf';
import expected from './data/createToMakePdf/expected';

describe('createToMakePdf', () => {
  it('createToMakePdf', () => {
    const adi = readDdifAndParse('./tests/data/createToMakePdf/test.adi');
    adi.records
    const ret = createToMakePdf(adi);
    expect(ret).toEqual(expected);
  })
  it('throw1', () => {
    const adi = {
      records: undefined,
    };
    expect(() => createToMakePdf(adi)).toThrow(/undifined/);
  })
  it('throw2', () => {
    const rec = {
      band: '40M',
      call: 'JJ1UTY',
      freq: '7.042900',
      mode: 'FT8',
      qso_date: '20210216',
      time_on: '000000',
      rst_rcvd: '-1',
      rst_sent: '-2',
    };
    Object.keys(rec).map((v) => {
      const t = Object.assign({}, rec);
      delete (<{[field: string]: string;}>t)[v];
      return t;
    }).map((v) => {
      const adi = {
        records: [
          v
        ],
      };
      expect(() => createToMakePdf(adi)).toThrow(/undifined/);
    })
  })
});
