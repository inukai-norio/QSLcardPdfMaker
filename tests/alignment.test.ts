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

  it('center top', () => {
    expect(alignment.text({ alignment: { vertical: 'top', horizontal: 'center' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 13.991999999999999, y: 54.9 });
  });
  it('center bottom', () => {
    expect(alignment.text({ alignment: { vertical: 'bottom', horizontal: 'center' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 13.991999999999999, y: 66 });
  });
  it('left middle', () => {
    expect(alignment.text({ alignment: { vertical: 'middle', horizontal: 'left' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 60.45 });
  });
  it('right middle', () => {
    expect(alignment.text({ alignment: { vertical: 'middle', horizontal: 'right' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 3.983999999999998, y: 60.45 });
  });

  it('center middle', () => {
    expect(alignment.text({ alignment: { vertical: 'middle', horizontal: 'center' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 13.991999999999999, y: 60.45 });
  });

  it('undefined undefined', () => {
    expect(alignment.text({ text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 66 });
  });
  it('left undefined', () => {
    expect(alignment.text({ alignment: { horizontal: 'left' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 66 });
  });
  it('center undefined', () => {
    expect(alignment.text({ alignment: { horizontal: 'center' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 13.991999999999999, y: 66 });
  });
  it('right undefined', () => {
    expect(alignment.text({ alignment: { horizontal: 'right' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 3.983999999999998, y: 66 });
  });
  it('undefined top', () => {
    expect(alignment.text({ alignment: { vertical: 'top' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 54.9 });
  });
  it('undefined middle', () => {
    expect(alignment.text({ alignment: { vertical: 'middle' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 60.45 });
  });
  it('undefined bottom', () => {
    expect(alignment.text({ alignment: { vertical: 'bottom' }, text: 'aaa', font: testFont, size: 12, x: 24, y: 66 })).toEqual({ x: 24, y: 66 });
  });
});
  