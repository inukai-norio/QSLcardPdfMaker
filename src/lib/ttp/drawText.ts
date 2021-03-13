import moment from "moment";
import { PDFFont } from "pdf-lib";
import { PDFPageFix, PDFPageDrawTextOptionsFix } from "../pdf/page";

type FontString = {
  font?: string,
}
type PDFPageDrawTextOptionsFixWithoutObject = Omit<PDFPageDrawTextOptionsFix, keyof FontString> & FontString

type DataNameObject = {
  type: 'userdata' | 'recode',
  data: string,
  format?: string,
};

export type PDFPageDrawTextOptionsFixWithText = { text: string | DataNameObject, options?: PDFPageDrawTextOptionsFixWithoutObject };

export default (o: PDFPageDrawTextOptionsFixWithText, fonts : { [field: string]: PDFFont }): (page: PDFPageFix, userdata?: { [field: string]: string }, recode?: any) => void => ((page: PDFPageFix, userdata?: any, recode?: any) => {
  const drawText = (text: string, options?: PDFPageDrawTextOptionsFixWithoutObject) => {
    if (options !== undefined && options.font !== undefined) {
      const font = fonts[options.font];
      Reflect.set(options, 'font', font)
    }
    return page.drawText(text, <PDFPageDrawTextOptionsFix>options);
  }
  
  const { text, options } = o;
  if (typeof text !== 'string') {
    if (text.type === 'recode' ) {
      if (text.data === 'date') {
        return drawText(recode.date.format(text.format), options);
      }
      return drawText(recode[text.data], options);
    }
    if (text.type === 'userdata') {
      return drawText(userdata[text.data], options);
    }
  }
  return drawText(<string>text, options);
});
