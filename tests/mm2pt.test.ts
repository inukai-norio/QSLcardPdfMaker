import * as pt from '../src/lib/pt';

describe('mm2pt', () => {
  it('1mm', () => {
    expect(pt.mm2pt(1)).toBe(72/25.4);
  })

  it('1pt', () => {
    expect(pt.mm2pt(25.4/72)).toBe(1);
  })
});
