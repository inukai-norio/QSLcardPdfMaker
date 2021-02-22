import pt from '../src/lib/pdf/pt';

describe('mm2pt', () => {
  it('tp or mm to pt 1', () => {
    expect(pt({ num: 5.5, unit: 'pt' })).toBe(5.5);
  });
  it('tp or mm to pt 2', () => {
    expect(pt({ num: 1, unit: 'mm' })).toBe(72 / 25.4);
  });

  it('tp or mm to pt 3', () => {
    expect(() => pt(<any>{ num: 1, unit: 'nn' })).toThrow('undefined unit');
  });

  it('tp or mm to pt 4', () => {
    expect(pt(5.5)).toBe(5.5);
  });

  it('mm to pt', () => {
    expect(pt('1mm')).toBe(72 / 25.4);
  });

  it('pt to pt', () => {
    expect(pt('12.5pt')).toBe(12.5);
  });
});
