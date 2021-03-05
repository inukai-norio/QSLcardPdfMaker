import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';
import { PDFPageFix } from '../src/lib/pdf/page';
import drawLine from '../src/lib/ttp/drawLine';


let pageMock: { [name: string]: jest.Mock };
let page: PDFPageFix;
beforeEach(async () => {
  pageMock = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    drawText: jest.fn((text: string, options?: Object) => {
      const o = { ...options };
      return Object.assign(o, { text });
    }),
    setFont: jest.fn((font: PDFFont) => font),
    setFontSize: jest.fn((size: number) => size),
    drawLine: jest.fn((options: unknown) => options),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page = <any>pageMock;
});

describe('drawLine', () => {
  it('drawLine', () => {
    const a = drawLine({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
    a(page);
    expect(pageMock.drawLine.mock.calls.length).toBe(1);
    expect(pageMock.drawLine.mock.calls[0][0]).toEqual({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
    expect(pageMock.drawLine.mock.results[0].value).toEqual({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
  });
});

