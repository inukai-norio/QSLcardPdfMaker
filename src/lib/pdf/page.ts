import {
  PDFFont,
  PDFPage,
  PDFPageDrawLineOptions,
  PDFPageDrawTextOptions,
} from 'pdf-lib';
import { Alignment, text as alignmentText } from './alignment';
import pt, { Ptuu } from './pt';

interface PDFPageDrawTextOptionsFixWeaken {
  alignment?: Alignment;
  size?: number | string | Ptuu;
  x?: number | string | Ptuu;
  y?: number | string | Ptuu;
  lineHeight?: number | string | Ptuu;
  maxWidth?: number | string | Ptuu;
}
type PDFPageDrawTextOptionsFix = Omit<
  PDFPageDrawTextOptions,
  keyof PDFPageDrawTextOptionsFixWeaken
> &
  PDFPageDrawTextOptionsFixWeaken;

interface PDFPageDrawLineOptionsFixWeaken {
  start: { x: number | string | Ptuu; y: number | string | Ptuu };
  end: { x: number | string | Ptuu; y: number | string | Ptuu };
}
type PDFPageDrawLineOptionsFix = Omit<
  PDFPageDrawLineOptions,
  keyof PDFPageDrawLineOptionsFixWeaken
> &
  PDFPageDrawLineOptionsFixWeaken;

interface PDFPageFixWeaken {
  setFont: (font: PDFFont) => void;
  setFontSize: (size: number | string | Ptuu) => void;
  drawText: (text: string, options?: PDFPageDrawTextOptionsFix) => void;
  drawLine: (options: PDFPageDrawLineOptionsFix) => void;
}
export type PDFPageFix = Omit<PDFPage, keyof PDFPageFixWeaken> &
  PDFPageFixWeaken;

export const a = 1;
export const Page = (page: PDFPage): PDFPageFix =>
  new Proxy(page, {
    get: (target, p) => {
      if (p === 'setFont') {
        return (font: PDFFont): void => {
          Reflect.set(target, 'wFont', font);
          target.setFont(font);
        };
      }
      if (p === 'setFontSize') {
        return (size: number | string | Ptuu): void => {
          const fontSize = pt(size);
          Reflect.set(target, 'wFontSize', fontSize);
          target.setFontSize(fontSize);
        };
      }
      if (p === 'drawText') {
        return (text: string, options?: PDFPageDrawTextOptionsFix): void => {
          if (options === undefined) {
            return target.drawText(text);
          }
          const o = { ...options };
          const ptuu2pt = (para: keyof typeof o, d?: number): void => {
            if (o[para] === undefined) {
              Reflect.set(o, para, d);
              return;
            }
            Reflect.set(o, para, pt(<number | string | Ptuu>o[para]));
          };
          ptuu2pt('x', 0);
          ptuu2pt('y', 0);
          ptuu2pt('lineHeight');
          ptuu2pt('maxWidth');
          ptuu2pt('size');
          if (options.alignment !== undefined) {
            const font: PDFFont = (() => {
              if (options.font === undefined) {
                if (Reflect.get(target, 'wFont') !== undefined) {
                  return Reflect.get(target, 'wFont');
                }
                throw new Error();
              }
              return options.font;
            })();
            const size: number = (() => {
              if (o.size === undefined) {
                if (Reflect.get(target, 'wFontSize') !== undefined) {
                  return Reflect.get(target, 'wFontSize');
                }
                throw new Error();
              }
              return <number>o.size;
            })();
            const { x, y } = alignmentText({
              alignment: o.alignment,
              text,
              font,
              size,
              x: <number>o.x,
              y: <number>o.y,
            });

            Reflect.set(o, 'x', x);
            Reflect.set(o, 'y', y);
            Reflect.set(o, 'alignment', undefined);
          }
          return target.drawText(text, <PDFPageDrawTextOptions>o);
        };
      }
      if (p === 'drawLine') {
        return (options: PDFPageDrawLineOptionsFix): void => {
          const { start, end } = options;
          const convertPt = (v: {
            x: number | string | Ptuu;
            y: number | string | Ptuu;
          }) => ({ x: pt(v.x), y: pt(v.y) });

          const o = { ...options };
          o.start = convertPt(start);
          o.end = convertPt(end);
          target.drawLine(<PDFPageDrawLineOptions>o);
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (<any>target)[p];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
