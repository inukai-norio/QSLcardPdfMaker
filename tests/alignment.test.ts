import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';
import * as alignment from '../src/lib/pdf/alignment';

describe('alignment', () => {
  let testFont: PDFFont;
  beforeAll(async () => {
    const pdfDoc = await PDFDocument.create();
    testFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  })
  it('left bottom', () => {
    expect(alignment.leftBottom({ text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 66 });
  });
  it('right bottom', () => {
    expect(alignment.rightBottom({ text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 45.983999999999995 });
  });
});
  