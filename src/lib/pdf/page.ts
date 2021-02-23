import { PDFFont, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib';
import { Alignment, text as alignmentText } from './alignment';
import pt, { Ptuu } from './pt';

interface PDFPageDrawTextOptionsFixWeaken extends PDFPageDrawTextOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y?: any;
}

interface PDFPageDrawTextOptionsFix extends PDFPageDrawTextOptionsFixWeaken {
  alignment?: Alignment;
  x?: number | string | Ptuu;
  y?: number | string | Ptuu;
}

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

  drawText(text: string, options?: PDFPageDrawTextOptionsFix): void {
    const x = (() => {
      if (options !== undefined && options.x !== undefined) {
        const v = pt(options.x);
        Object.assign(options, { x: v });
        return v;
      }
      return 0;
    })();
    const y = (() => {
      if (options !== undefined && options.y !== undefined) {
        const v = pt(options.y);
        Object.assign(options, { y: v });
        return v;
      }
      return 0;
    })();
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
      Object.assign(
        options,
        alignmentText({
          alignment: options.alignment,
          text,
          font,
          size,
          x,
          y,
        })
      );
      Object.assign(options, { alignment: undefined });
    }
    this.originPage.drawText(text, <PDFPageDrawTextOptions>options);
  }
}
