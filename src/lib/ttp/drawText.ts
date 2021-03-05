import { PDFFont } from "pdf-lib";
import { PDFPageFix, PDFPageDrawTextOptionsFix } from "../pdf/page";

type FontString = {
  font?: string,
}
type PDFPageDrawTextOptionsFixWithoutObject = Omit<PDFPageDrawTextOptionsFix, keyof FontString> & FontString

export type PDFPageDrawTextOptionsFixWithText = { text: string, options?: PDFPageDrawTextOptionsFixWithoutObject };

export default (o: PDFPageDrawTextOptionsFixWithText, fonts : { [field: string]: PDFFont }): (page: PDFPageFix) => void => ((page: PDFPageFix) => {
  const { text, options } = o;
  if (options !== undefined && options.font !== undefined) {
    const font = fonts[options.font];
    Reflect.set(options, 'font', font)
  }
  return page.drawText(text, <PDFPageDrawTextOptionsFix>options);
});
