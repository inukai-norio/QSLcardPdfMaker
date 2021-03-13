import readDdifAndParse from '../src/lib/adif';
import createToMakePdf from '../src/lib/createToMakePdf';
import expected from './data/createToMakePdf/expected';

describe('createToMakePdf', () => {
  it('createToMakePdf', () => {
    const adi = readDdifAndParse('./tests/data/createToMakePdf/test.adi');
    const ret = createToMakePdf(adi);
    expect(ret.map((v) => v.date)).toEqual(expected.map((v) => v.date));
    expect(ret.map((v) => v.band)).toEqual(expected.map((v) => v.band));
    expect(ret.map((v) => v.call)).toEqual(expected.map((v) => v.call));
    expect(ret.map((v) => v.frequency)).toEqual(expected.map((v) => v.frequency));
    expect(ret.map((v) => v.mode)).toEqual(expected.map((v) => v.mode));
    expect(ret.map((v) => v.rst_rcvd)).toEqual(expected.map((v) => v.rst_rcvd));
    expect(ret.map((v) => v.rst_sent)).toEqual(expected.map((v) => v.rst_sent));
    expect(ret.map((v) => v.power)).toEqual(expected.map((v) => v.power));
    expect(ret.map((v) => v.gridsquare)).toEqual(expected.map((v) => v.gridsquare));

  });
  it('throw1', () => {
    const adi = {
      records: undefined,
    };
    expect(() => createToMakePdf(adi)).toThrow(/undifined/);
  });
});
