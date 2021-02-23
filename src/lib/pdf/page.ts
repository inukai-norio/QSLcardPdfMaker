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
      const font: PDFFont = (() => {
        if (options.font === undefined) {
          if (this.font !== undefined) {
            return this.font;
          }
          throw new Error();
        }
        return options.font;
      })();
      const size: number = (() => {
        if (options.size === undefined) {
          if (this.fontSize !== undefined) {
            return this.fontSize;
          }
          throw new Error();
        }
        return options.size;
      })();
      Object.assign(options, alignmentText({
        alignment: options.alignment,
        text,
        font,
        size,
        x: options.x === undefined ? 0 : options.x,
        y: options.y === undefined ? 0 : options.y,
      }));
      Object.assign(options, { alignment: undefined });
    }
    this.originPage.drawText(text, options);
  }
}
