import {
  Color,
  LineCapStyle,
  PDFFont,
  PDFName,
  PDFNumber,
  PDFPage,
  PDFPageDrawTextOptions,
} from 'pdf-lib';
import { Alignment, text as alignmentText } from './alignment';
import pt, { Ptuu } from './pt';

interface PDFPageDrawTextOptionsFixWeaken extends PDFPageDrawTextOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  size?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lineHeight?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maxWidth?: any;
}

interface PDFPageDrawTextOptionsFix extends PDFPageDrawTextOptionsFixWeaken {
  alignment?: Alignment;
  size?: number | string | Ptuu;
  x?: number | string | Ptuu;
  y?: number | string | Ptuu;
  lineHeight?: number | string | Ptuu;
  maxWidth?: number | string | Ptuu;
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
    const o = { ... options };
    (<{a: 'x' | 'y' | 'lineHeight' | 'maxWidth' | 'size', d: number | undefined }[]>[
      {a: 'x', d: 0 },
      {a: 'y', d: 0 },
      {a: 'lineHeight', d: undefined },
      {a: 'maxWidth', d: undefined },
      {a: 'size', d: undefined },
    ]).forEach((v) => {
      if (o[v.a] === undefined ) {
        o[v.a] = v.d;
        return;
      }
      o[v.a] = pt(<number | string | Ptuu>o[(v.a)]);
    });
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
        if (o.size === undefined) {
          if (this.fontSize !== undefined) {
            return this.fontSize;
          }
          throw new Error();
        }
        return <number>o.size;
      })();
      Object.assign(
        o,
        alignmentText({
          alignment: o.alignment,
          text,
          font,
          size,
          x: <number>o.x,
          y: <number>o.y,
        })
      );
      Object.assign(o, { alignment: undefined });
    }
    return this.originPage.drawText(text, <PDFPageDrawTextOptions>o);
  }

  drawLine(options: PDFPageDrawLineOptionsFix): void {
    const { start, end } = options;
    const convertPt = (v: {
      x: number | string | Ptuu;
      y: number | string | Ptuu;
    }) => ({ x: pt(v.x), y: pt(v.y) });

    const o = { ...options };
    o.start = convertPt(start);
    o.end = convertPt(end);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.originPage.drawLine(<any>o);
  }
}
