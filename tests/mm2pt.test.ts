import * as mm2pt from '../src/lib/mm2pt';

describe('mm2pt', () => {
  it('mm2pt', () => {
    expect(mm2pt.mm2pt(1)).toBe(72/25.4);
  })

  it('1pt', () => {
    expect(mm2pt.mm2pt(25.4/72)).toBe(1);
  })
});
