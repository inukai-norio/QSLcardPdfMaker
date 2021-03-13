import moment from 'moment';
import { PDFFont } from 'pdf-lib';
import { PDFPageFix, PDFPageDrawTextOptionsFix } from '../pdf/page';

type FontString = {
  font?: string;
};
type PDFPageDrawTextOptionsFixWithoutObject = Omit<
  PDFPageDrawTextOptionsFix,
  keyof FontString
> &
  FontString;

type DataNameObject = {
  type: 'userdata' | 'recode';
  data: string;
  format?: string;
};

export type PDFPageDrawTextOptionsFixWithText = {
  text: string | DataNameObject;
  options?: PDFPageDrawTextOptionsFixWithoutObject;
};

export default (
  o: PDFPageDrawTextOptionsFixWithText,
  fonts: { [field: string]: PDFFont }
): ((
  page: PDFPageFix,
  userdata?: { [field: string]: string },
  recode?: { [field: string]: string },
) => void) => (
  page: PDFPageFix,
  userdata?: { [field: string]: string },
  recode?: { [field: string]: string },
) => {
  const drawText = (
    text: string,
    options?: PDFPageDrawTextOptionsFixWithoutObject
  ) => {
    if (options !== undefined && options.font !== undefined) {
      const font = fonts[options.font];
      Reflect.set(options, 'font', font);
    }
    return page.drawText(text, <PDFPageDrawTextOptionsFix>options);
  };

  const { text, options } = o;
  if (typeof text !== 'string') {
    if (text.type === 'recode') {
      if (recode === undefined) {
        throw new Error();
      }
      if (text.data === 'date') {
        return drawText(moment.utc(recode.date).format(text.format), options);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return drawText((<any>recode)[text.data], options);
    }
    if (text.type === 'userdata') {
      if (userdata === undefined) {
        throw new Error();
      }
      return drawText(userdata[text.data], options);
    }
    throw new Error();
  }
  return drawText(<string>text, options);
};
