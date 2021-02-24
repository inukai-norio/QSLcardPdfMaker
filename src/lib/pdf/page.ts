import { Color, LineCapStyle, PDFFont, PDFName, PDFNumber, PDFPage, PDFPageDrawTextOptions } from 'pdf-lib';
import { Alignment, text as alignmentText } from './alignment';
import pt, { Ptuu } from './pt';

interface PDFPageDrawTextOptionsFixWeaken extends PDFPageDrawTextOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  size?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y?: any;
}

interface PDFPageDrawTextOptionsFix extends PDFPageDrawTextOptionsFixWeaken {
  alignment?: Alignment;
  size?: number | string | Ptuu;
  x?: number | string | Ptuu;
  y?: number | string | Ptuu;
}

interface PDFPageDrawLineOptionsFix {
  start: { x: number | string | Ptuu; y: number | string | Ptuu };
  end: { x: number | string | Ptuu; y: number | string | Ptuu };
  thickness?: number | PDFNumber;
  color?: Color;
  dashArray?: (number | PDFNumber)[];
  dashPhase?: number | PDFNumber;
  lineCap?: LineCapStyle;
  graphicsState?: string | PDFName;
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

  setFontSize(size: number | string | Ptuu): void {
    this.fontSize = pt(size);
    this.originPage.setFontSize(this.fontSize);
  }

  drawText(text: string, options?: PDFPageDrawTextOptionsFix): void {
    if (options === undefined) {
      return this.originPage.drawText(text);
    }
    const x = (() => {
      if (options.x !== undefined) {
        const v = pt(options.x);
        Object.assign(options, { x: v });
        return v;
      }
      return 0;
    })();
    const y = (() => {
      if (options.y !== undefined) {
        const v = pt(options.y);
        Object.assign(options, { y: v });
        return v;
      }
      return 0;
    })();
    const fontSize: number | undefined = (() => {
      if (options.size === undefined) {
        return undefined;
      }
      const v = pt(options.size);
      Object.assign(options, { size: v });
      return v;
    })();
    if (options.alignment !== undefined) {
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
        if (fontSize === undefined) {
          if (this.fontSize !== undefined) {
            return this.fontSize;
          }
          throw new Error();
        }
        return fontSize;
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
    return this.originPage.drawText(text, <PDFPageDrawTextOptions>options);
  }

  drawLine(options: PDFPageDrawLineOptionsFix): void {
    const { start, end } = options;
    const convertPt = (v: { x: number | string | Ptuu; y: number | string | Ptuu }) => ({ x: pt(v.x), y: pt(v.y) });

    const o = {...options};
    o.start = convertPt(start);
    o.end = convertPt(end);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.originPage.drawLine(<any>o);
  }
}
