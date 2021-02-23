import { PDFDocument, PDFPage } from 'pdf-lib';
import * as page from '../src/lib/pdf/page';

describe('page', () => {
  let pdfDoc: PDFDocument;
  let originPage: PDFPage;
  beforeAll(async () => {
    pdfDoc = await PDFDocument.create();
    originPage = pdfDoc.addPage();
  });
  it('orgin', () => {
    const a = new page.Page(originPage);
    expect(a.orgin).toEqual(originPage);
  });
});
