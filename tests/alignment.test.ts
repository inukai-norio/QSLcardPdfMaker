import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';
import * as alignment from '../src/lib/pdf/alignment';

describe('alignment', () => {
  let testFont: PDFFont;
  beforeAll(async () => {
    const pdfDoc = await PDFDocument.create();
    testFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  })
  it('left bottom', () => {
    expect(alignment.text({ alignment: { vertical: 'bottom', horizontal: 'left' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 66 });
  });
  it('right bottom', () => {
    expect(alignment.text({ alignment: { vertical: 'bottom', horizontal: 'right' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 3.983999999999998, y: 66 });
  });
  it('left top', () => {
    expect(alignment.text({ alignment: { vertical: 'top', horizontal: 'left' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 54.9 });
  });
  it('right top', () => {
    expect(alignment.text({ alignment: { vertical: 'top', horizontal: 'right' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 3.983999999999998, y: 54.9 });
  });
});
  