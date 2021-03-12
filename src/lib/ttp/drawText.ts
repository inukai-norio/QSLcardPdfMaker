import { PDFFont } from "pdf-lib";
import { PDFPageFix, PDFPageDrawTextOptionsFix } from "../pdf/page";

type FontString = {
  font?: string,
}
type PDFPageDrawTextOptionsFixWithoutObject = Omit<PDFPageDrawTextOptionsFix, keyof FontString> & FontString

export type PDFPageDrawTextOptionsFixWithText = { text: string | Object, options?: PDFPageDrawTextOptionsFixWithoutObject };

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
    const type = (<any>text).type.split('.');
    if (type[0] === 'recode' ) {
      if (type[1] === 'date') {
        const m = recode.date.getUTCMonth() + 1;
        return drawText(m < 10 ? '0' + <string>m : m, options);
      }
    }
  }
  return drawText(<string>text, options);
});
