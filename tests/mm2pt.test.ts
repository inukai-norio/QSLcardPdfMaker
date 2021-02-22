import * as pt from '../src/lib/pt';

describe('mm2pt', () => {
  it('1mm', () => {
    expect(pt.mm2pt(1)).toBe(72/25.4);
  })

  it('1pt', () => {
    expect(pt.mm2pt(25.4/72)).toBe(1);
  })

  it('tp to tp 12', () => {
    expect(pt.pt2pt(12)).toBe(12);
  })
  it('tp to tp 5.5', () => {
    expect(pt.pt2pt(5.5)).toBe(5.5);
  })
  it('tp or mm to pt 1', () => {
    expect(pt.ptormm2pt({ num: 5.5, unit: 'pt' })).toBe(5.5);
  })
  it('tp or mm to pt 2', () => {
    expect(pt.ptormm2pt({ num: 1, unit: 'mm' })).toBe(72/25.4);
  })
});
