import * as alignment from '../src/lib/pdf/alignment';

describe('alignment', () => {

  it('left bottom', () => {
    expect(alignment.leftBottom({ text: 'aaa', font: '', size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 66 });
  });
});
  