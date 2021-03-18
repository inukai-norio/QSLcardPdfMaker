import { PDFPageFix, PDFPageDrawLineOptionsFix } from '../pdf/page';

export default (
  options: PDFPageDrawLineOptionsFix
): ((page: PDFPageFix) => void) => (page: PDFPageFix) =>
  page.drawLine(options);
