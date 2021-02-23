import { PDFPage, PDFPageDrawTextOptions } from "pdf-lib";

export const a = 1;
export class Page {
  private originPage;

  constructor(originPage: PDFPage) {
    this.originPage = originPage;
  }

  get orgin(): PDFPage {
    return this.originPage;
  }

  drawText(text: string, options?: PDFPageDrawTextOptions): void {
    this.originPage.drawText(text, options);
  }
}
