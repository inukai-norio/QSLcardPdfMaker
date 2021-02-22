import pt from '../src/lib/pt';

describe('mm2pt', () => {
  it('tp or mm to pt 1', () => {
    expect(pt(5.5, 'pt')).toBe(5.5);
  })
  it('tp or mm to pt 2', () => {
    expect(pt(1, 'mm')).toBe(72/25.4);
  })
  
  it('tp or mm to pt 3', () => {
    expect(() => (pt(1, <any>'nn'))).toThrow('undefined unit');
  })
});
