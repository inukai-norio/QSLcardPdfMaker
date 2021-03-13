import moment from "moment";
import { PDFFont } from "pdf-lib";
import { PDFPageFix, PDFPageDrawTextOptionsFix } from "../pdf/page";

type FontString = {
  font?: string,
}
type PDFPageDrawTextOptionsFixWithoutObject = Omit<PDFPageDrawTextOptionsFix, keyof FontString> & FontString

type DataNameObject = {
  type: string,
  date: string,
};

export type PDFPageDrawTextOptionsFixWithText = { text: string | DataNameObject, options?: PDFPageDrawTextOptionsFixWithoutObject };

export default (o: PDFPageDrawTextOptionsFixWithText, fonts : { [field: string]: PDFFont }): (page: PDFPageFix, userdata?: any, recode?: any) => void => ((page: PDFPageFix, userdata?: any, recode?: any) => {
  const drawText = (text: string, options?: PDFPageDrawTextOptionsFixWithoutObject) => {
    if (options !== undefined && options.font !== undefined) {
      const font = fonts[options.font];
      Reflect.set(options, 'font', font)
    }
    return page.drawText(text, <PDFPageDrawTextOptionsFix>options);
  }
  
  const { text, options } = o;
  if (typeof text !== 'string') {
    const type = text.type.split('.');
    if (type[0] === 'recode' ) {
      if (type[1] === 'date') {
        return drawText(recode.date.format(text.date), options);
      }
    }
  }
  return drawText(<string>text, options);
});
