import * as fs from 'fs';
import { readDdifAndParse } from '../src/lib/adif';
import { createToMakePdf } from '../src/lib/createToMakePdf';
import expected from './data/createToMakePdf/expected';

describe('createToMakePdf', () => {
  it('createToMakePdf', () => {
    const adi = readDdifAndParse('./tests/data/createToMakePdf/test.adi');
    const ret = createToMakePdf(adi);
    expect(ret).toEqual(expected);
  })
});
