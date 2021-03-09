import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';
import { PDFPageFix } from '../src/lib/pdf/page';
import drawLine from '../src/lib/ttp/drawLine';
import drawText from '../src/lib/ttp/drawText';
import TTP from '../src/lib/ttp';


let pageMock: { [name: string]: jest.Mock };
let page: PDFPageFix;
let testFont: PDFFont;
beforeEach(async () => {
  pageMock = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    drawText: jest.fn((text: string, options?: Object) => {
      const o = { ...options };
      return Object.assign(o, { text });
    }),
    setFont: jest.fn((font: PDFFont) => font),
    setFontSize: jest.fn((size: number) => size),
    drawLine: jest.fn((options: unknown) => options),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page = <any>pageMock;
});

describe('drawLine', () => {
  it('drawLine', () => {
    const a = drawLine({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
    a(page);
    expect(pageMock.drawLine.mock.calls.length).toBe(1);
    expect(pageMock.drawLine.mock.calls[0][0]).toEqual({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
    expect(pageMock.drawLine.mock.results[0].value).toEqual({ "start": { "x": "25mm", "y": "70mm" },  "end": {"x": "137mm",  "y": "70mm"}});
  });
});

describe('drawText', () => {
  it('drawText', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a = drawText({ "text": "Year", "options": { "font": "testFont", "size": 9, "x": "32mm", "y": "71mm", "alignment": { "horizontal": "center" }}}, { testFont: <PDFFont><any>'testFontObject' });
    a(page);
    expect(pageMock.drawText.mock.calls.length).toBe(1);
    expect(pageMock.drawText.mock.calls[0][0]).toEqual("Year");
    expect(pageMock.drawText.mock.calls[0][1]).toEqual({ "font": 'testFontObject', "size": 9, "x": "32mm", "y": "71mm", "alignment": { "horizontal": "center" }});
    expect(pageMock.drawText.mock.results[0].value).toEqual({ "text": "Year", "font": 'testFontObject', "size": 9, "x": "32mm", "y": "71mm", "alignment": { "horizontal": "center" }});
  });
  it('', () => {
    
    const a = drawText({ "drawText": {  "text": {  "type": "recode.date", "date": "MM"}, "options": { "font": "fm1ml", "size": 12, "x": "46mm", "y": "63mm", "alignment": { "horizontal": "center" } } } });
    a(page, undefined, { date: new Date(1613433600000), });
    expect(pageMock.drawText.mock.calls[0][0]).toEqual("02");
    expect(pageMock.drawText.mock.calls[0][1]).toEqual({ "font": "fm1ml", "size": 12, "x": "46mm", "y": "63mm", "alignment": { "horizontal": "center" } } );
    expect(pageMock.drawText.mock.results[0].value).toEqual({ "text": "02","font": "fm1ml", "size": 12, "x": "46mm", "y": "63mm", "alignment": { "horizontal": "center" } });
  })
});


describe('ttp', () => {
  let ttp: TTP;
  beforeEach(()=> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ttp = new TTP({ fm2prjp: <PDFFont><any>'fm2prjpObject' });
  });
  it('drawLine', () => {
    const a = ttp.do({
      "drawLine": {
        "start": {
          "x": "123mm",
          "y": "80mm"
        },
        "end": {
          "x": "123mm",
          "y": "60mm"
        }
      }
    });
    
    a(page);
    expect(pageMock.drawLine.mock.calls.length).toBe(1);
    expect(pageMock.drawLine.mock.calls[0][0]).toEqual({ "start": { "x": "123mm", "y": "80mm" },  "end": {"x": "123mm",  "y": "60mm"}});
    expect(pageMock.drawLine.mock.results[0].value).toEqual({ "start": { "x": "123mm", "y": "80mm" },  "end": {"x": "123mm",  "y": "60mm"}});
  });

  it('drawText', () => {
    const a = ttp.do(
      {
        "drawText": {
          "text": "Year",
          "options": {
            "font": "fm2prjp",
            "size": 9,
            "x": "32mm",
            "y": "71mm",
            "alignment": {
              "horizontal": "center"
            }
          }
        }
      });
    a(page);
    expect(pageMock.drawText.mock.calls.length).toBe(1);
    expect(pageMock.drawText.mock.calls[0][0]).toEqual("Year");
    expect(pageMock.drawText.mock.calls[0][1]).toEqual({ "font": 'fm2prjpObject', "size": 9, "x": "32mm", "y": "71mm", "alignment": { "horizontal": "center" }});
    expect(pageMock.drawText.mock.results[0].value).toEqual({ "text": "Year", "font": 'fm2prjpObject', "size": 9, "x": "32mm", "y": "71mm", "alignment": { "horizontal": "center" }});
  
  });
});
