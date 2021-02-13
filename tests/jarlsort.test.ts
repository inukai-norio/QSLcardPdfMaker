import * as fs from 'fs';
import { readDdifAndParse } from '../src/lib/adif';
import { jarlsort } from '../src/lib/jarlsort';

describe('jarlsort', () => {
  it('jarlsort', () => {
    const adi = readDdifAndParse('tests/data/jarlsort/test.adi');
    const expected = fs.readFileSync('tests/data/jarlsort/test.json', {
      encoding: 'utf8',
    });

    expect(jarlsort(adi).records.map((v) => v.call)).toEqual(JSON.parse(expected));
  })
});
