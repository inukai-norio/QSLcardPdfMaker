import {
  PDFDocument,
  PDFFont,
  PDFPage,
  PDFPageDrawTextOptions,
  StandardFonts,
} from 'pdf-lib';
import * as page from '../src/lib/pdf/page';

let originPageMock: { [name: string]: jest.Mock };
let originPage: PDFPage;
let pagePage: page.Page;
let testFont: PDFFont;
beforeEach(async () => {
  originPageMock = {
    drawText: jest.fn((text: string, options?: PDFPageDrawTextOptions) => {
      const o = { ...options };
      return Object.assign(o, { text });
    }),
    setFont: jest.fn((font: PDFFont) => font),
    setFontSize: jest.fn((size: number) => size),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originPage = <any>originPageMock;
  pagePage = new page.Page(originPage);
  const pdfDoc = await PDFDocument.create();
  testFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
});

it('orgin', () => {
  expect(pagePage.orgin).toEqual(originPage);
});

describe('drawText (setFont)', () => {
  beforeEach(async () => {
    pagePage.setFont(testFont);
    pagePage.setFontSize(12);
  });
  it('std', () => {
    pagePage.drawText('aaa', { x: 24, y: 66 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({ x: 24, y: 66 });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 24,
      y: 66,
      text: 'aaa',
    });
  });

  it('std font and size', () => {
    pagePage.drawText('aaa', { x: 24, y: 66, font: testFont, size: 12 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 24,
      y: 66,
      font: testFont,
      size: 12,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 24,
      y: 66,
      text: 'aaa',
      font: testFont,
      size: 12,
    });
  });
  it('cm font and size', () => {
    pagePage.drawText('aaa', {
      x: 24,
      y: 66,
      font: testFont,
      size: 12,
      alignment: { vertical: 'middle', horizontal: 'center' },
    });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 13.991999999999999,
      y: 60.45,
      font: testFont,
      size: 12,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 13.991999999999999,
      y: 60.45,
      text: 'aaa',
      font: testFont,
      size: 12,
    });
  });
  it('cm font and size no font and size', () => {
    pagePage.drawText('aaa', {
      x: 24,
      y: 66,
      alignment: { vertical: 'middle', horizontal: 'center' },
    });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 13.991999999999999,
      y: 60.45,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 13.991999999999999,
      y: 60.45,
      text: 'aaa',
    });
  });
  it('cm font and size no xy', () => {
    pagePage.drawText('aaa', {
      alignment: { vertical: 'middle', horizontal: 'center' },
    });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: -10.008000000000001,
      y: -5.550000000000001,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: -10.008000000000001,
      y: -5.550000000000001,
      text: 'aaa',
    });
  });
});

describe('drawText (no setFont)', () => {
  it('std', () => {
    pagePage.drawText('aaa', { x: 24, y: 66 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({ x: 24, y: 66 });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 24,
      y: 66,
      text: 'aaa',
    });
  });

  it('std font and size', () => {
    pagePage.drawText('aaa', { x: 24, y: 66, font: testFont, size: 12 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 24,
      y: 66,
      font: testFont,
      size: 12,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 24,
      y: 66,
      text: 'aaa',
      font: testFont,
      size: 12,
    });
  });
  it('cm font and size', () => {
    pagePage.drawText('aaa', {
      x: 24,
      y: 66,
      font: testFont,
      size: 12,
      alignment: { vertical: 'middle', horizontal: 'center' },
    });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 13.991999999999999,
      y: 60.45,
      font: testFont,
      size: 12,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 13.991999999999999,
      y: 60.45,
      text: 'aaa',
      font: testFont,
      size: 12,
    });
  });
  it('cm font and size no font and size', () => {
    expect(() =>
      pagePage.drawText('aaa', {
        x: 24,
        y: 66,
        alignment: { vertical: 'middle', horizontal: 'center' },
      })
    ).toThrow();
  });
  it('cm font and size no font', () => {
    expect(() =>
      pagePage.drawText('aaa', {
        x: 24,
        y: 66,
        size: 12,
        alignment: { vertical: 'middle', horizontal: 'center' },
      })
    ).toThrow();
  });
  it('cm font and size no size', () => {
    expect(() =>
      pagePage.drawText('aaa', {
        x: 24,
        y: 66,
        font: testFont,
        alignment: { vertical: 'middle', horizontal: 'center' },
      })
    ).toThrow();
  });
  it('cm font and size no xy', () => {
    expect(() =>
      pagePage.drawText('aaa', {
        alignment: { vertical: 'middle', horizontal: 'center' },
      })
    ).toThrow();
  });
});

describe('drawText (mm)', () => {
  it('string', () => {
    pagePage.drawText('aaa', { x: '24mm', y: '66mm' });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 68.03149606299213,
      y: 187.08661417322836,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 68.03149606299213,
      y: 187.08661417322836,
      text: 'aaa',
    });
  });
  it('string', () => {
    pagePage.drawText('aaa', {
      x: { num: 24, unit: 'mm' },
      y: { num: 66, unit: 'mm' },
    });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({
      x: 68.03149606299213,
      y: 187.08661417322836,
    });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({
      x: 68.03149606299213,
      y: 187.08661417322836,
      text: 'aaa',
    });
  });
});
