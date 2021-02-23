import { PDFPage, PDFPageDrawTextOptions } from 'pdf-lib';
import * as page from '../src/lib/pdf/page';

describe('page', () => {
  let originPageMock: {[name: string]: jest.Mock};
  let originPage: PDFPage;
  let pagePage: page.Page;
  beforeEach(async () => {
    originPageMock = {
      drawText: jest.fn((text: string, options?: PDFPageDrawTextOptions) => Object.assign(options, { text }))
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originPage = <any>originPageMock;
    pagePage = new page.Page(originPage);
  });
  it('orgin', () => {
    expect(pagePage.orgin).toEqual(originPage);
  });
});
