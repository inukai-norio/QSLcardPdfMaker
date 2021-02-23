import { PDFPage } from "pdf-lib";

export const a = 1;
export class Page {
  private originPage;

  constructor(originPage: PDFPage) {
    this.originPage = originPage;
  }

  get orgin(): PDFPage {
    return this.originPage;
  }
}
