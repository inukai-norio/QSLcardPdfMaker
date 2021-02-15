import * as fs from 'fs';
import { readDdifAndParse } from '../src/lib/adif';
import { createToMakePdf } from '../src/lib/createToMakePdf';

describe('createToMakePdf', () => {
  it('createToMakePdf', () => {
    const adi = readDdifAndParse('./tests/data/createToMakePdf/test.adi');
    const expected = fs.readFileSync('./tests/data/createToMakePdf/test.json', {
      encoding: 'utf8',
    });
    const ret = createToMakePdf(adi);
    expect(ret).toEqual(JSON.parse(expected));
  })
});
