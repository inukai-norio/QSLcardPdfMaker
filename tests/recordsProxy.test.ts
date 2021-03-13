import readDdifAndParse from '../src/lib/adif';
import recordsProxy from '../src/lib/recordsProxy';
import expected from './data/recordsProxy/expected';

describe('recordsProxy', () => {
  it('recordsProxy', () => {
    const adi = readDdifAndParse('./tests/data/recordsProxy/test.adi');
    const ret = recordsProxy(adi);
    expect(ret.length).toBe(expected.length);
    expected.forEach((v, i) => {
      Object.entries(v).forEach((v2) => {
        expect(ret[i][v2[0]]).toEqual(v2[1]);
      });
    });
  });
  it('throw1', () => {
    const adi = {
      records: undefined,
    };
    expect(() => recordsProxy(adi)).toThrow(/undifined/);
  });
});
