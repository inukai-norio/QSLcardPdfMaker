import { PDFPage, PDFPageDrawTextOptions } from 'pdf-lib';
import * as page from '../src/lib/pdf/page';

describe('page', () => {
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
  it('drawText', () => {
    pagePage.drawText('aaa', { x: 24, y: 66 });
    expect(originPageMock.drawText.mock.calls.length).toBe(1);
    expect(originPageMock.drawText.mock.calls[0][0]).toEqual('aaa');
    expect(originPageMock.drawText.mock.calls[0][1]).toEqual({ x: 24, y: 66 });
    expect(originPageMock.drawText.mock.results[0].value).toEqual({ x: 24, y: 66, text: 'aaa' });
  });
});
