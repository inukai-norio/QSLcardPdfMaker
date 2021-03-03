import { PDFPageFix } from '../src/lib/pdf/page';
import drawLine from '../src/lib/ttp/drawLine';

describe('drawLine', () => {
  it('no options', () => {
    const a = drawLine({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
    expect(a).toEqual((page: PDFPageFix) => page.drawLine({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}}));
  });
});

