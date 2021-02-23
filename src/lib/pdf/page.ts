import { PDFFont, PDFPage, PDFPageDrawTextOptions } from "pdf-lib";
import { Alignment, text as alignmentText } from "./alignment";



export const a = 1;
export class Page {
  private originPage;

  private font?: PDFFont;

  private fontSize?: number;

  constructor(originPage: PDFPage) {
    this.originPage = originPage;
  }

  get orgin(): PDFPage {
    return this.originPage;
  }

  setFont(font: PDFFont): void {
    this.font = font;
    this.originPage.setFont(this.font);
  }

  setFontSize(size: number): void {
    this.fontSize = size;
    this.originPage.setFontSize(this.fontSize);
  }

  drawText(text: string, options?: PDFPageDrawTextOptions & { alignment?: Alignment }): void {
    if (options !== undefined && options.alignment !== undefined) {
      const a = alignmentText({
        alignment: options.alignment,
        text,
        font: <any>options.font,
        size: <any>options.size,
        x: <any>options.x,
        y: <any>options.y,
      })
      Object.assign(options, a);
      Object.assign(options, { alignment: undefined });
    }
    this.originPage.drawText(text, options);
  }
}
