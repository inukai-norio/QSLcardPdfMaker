import { PDFFont } from "pdf-lib";
import { PDFPageFix } from "../pdf/page";
import drawLine from "./drawLine";
import drawText from "./drawText";

export default class {
  private fonts;

  constructor(fonts: { [field: string]: PDFFont }) {
    this.fonts = fonts
  }

  public do(o: Object): (page: PDFPageFix) => void {
    const entries = Object.entries(o);
    if (entries.length !== 1) {
      throw new Error('meny or non parameter');
    }
    const entrie = entries[0];
    if (entrie[0] === 'drawLine') {
      return drawLine(<any>entrie[1]);
    }
    if (entrie[0] === 'drawText') {
      return drawText(<any>entrie[1], this.fonts);
    }
    throw new Error('undefined');
  }

}