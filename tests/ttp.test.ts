import drawLine from '../src/lib/ttp/drawLine';

describe('drawLine', () => {
  it('drawLine', () => {
    const a = drawLine({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
    expect(a.toString()).toMatch(/page.*page\.drawLine.*options/);
  });
});

