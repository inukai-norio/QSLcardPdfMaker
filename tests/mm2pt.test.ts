import pt from '../src/lib/pt';

describe('mm2pt', () => {
  it('tp or mm to pt 1', () => {
    expect(pt({ num: 5.5, unit: 'pt' })).toBe(5.5);
  })
  it('tp or mm to pt 2', () => {
    expect(pt({ num: 1, unit: 'mm' })).toBe(72/25.4);
  })
  
  it('tp or mm to pt 3', () => {
    expect(() => (pt(<any>{ num: 1, unit: 'nn' }))).toThrow('undefined unit');
  })
});
