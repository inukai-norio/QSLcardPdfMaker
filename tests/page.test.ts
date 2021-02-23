import { PDFDocument, PDFFont, PDFPage, PDFPageDrawTextOptions, StandardFonts } from 'pdf-lib';
import * as page from '../src/lib/pdf/page';

let originPageMock: {[name: string]: jest.Mock};
let originPage: PDFPage;
let pagePage: page.Page;
beforeEach(async () => {
  originPageMock = {
    drawText: jest.fn((text: string, options?: PDFPageDrawTextOptions) => {
      const o = { ...options}
      return Object.assign(o, { text });
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originPage = <any>originPageMock;
  pagePage = new page.Page(originPage);
});

it('orgin', () => {
  expect(pagePage.orgin).toEqual(originPage);
});

describe('drawText', () => {
  let testFont: PDFFont;
  beforeEach(async () => {
    const pdfDoc = await PDFDocument.create();
    testFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  })
  it('std', () => {
    pagePage.drawText('aaa', { x: 24, y: 66 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({ x: 24, y: 66 });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({ x: 24, y: 66, text: 'aaa' });
  });
  
  it('std font and size', () => {
    pagePage.drawText('aaa', { x: 24, y: 66, font: testFont, size: 12 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({ x: 24, y: 66, font: testFont, size: 12 });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({ x: 24, y: 66, text: 'aaa', font: testFont, size: 12 });
  });
  it('std font and size', () => {
    pagePage.drawText('aaa', { x: 24, y: 66, font: testFont, size: 12, alignment: { vertical: 'middle', horizontal: 'center' } });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({ x: 24, y: 66, font: testFont, size: 12 });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({ x: 24, y: 66, text: 'aaa', font: testFont, size: 12 });
  });
});
