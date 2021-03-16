import { degrees, PDFDocument, PDFFont, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import page, { PDFPageFix } from '../lib/pdf/page';
import pt, { Ptuu } from '../lib/pdf/pt';
import TTP, { DoOption } from '../lib/ttp';
import adif from '../lib/adif';
import jarlsort from '../lib/jarlsort';
import recordsProxy from '../lib/recordsProxy';

type Template = {
  template: DoOption[];
  font: {
    [field: string]: string;
  };
  height: string | number | Ptuu;
  width: string | number | Ptuu;
  defaultFont: string;
  defaultSize: string | number | Ptuu;
  callBox: boolean;
  callText: boolean;
  jarlsort: boolean;
};

const callText = (pagea: PDFPageFix, call: string, font: PDFFont) => {
  call.split('').forEach((v, i) => {
    const l = call.length;
    pagea.drawText(v, {
      rotate: degrees(90),
      x: { num: 19, unit: 'mm' },
      y: { num: 100 - (l + 1) * 9 + 9 * i + 3.5, unit: 'mm' },
      size: { num: 9, unit: 'mm' },
      font,
    });
  });
};

const callBox = (pagea: PDFPageFix, call: string) => {
  const l = call.length > 6 ? 8 : 6;
  for (let i = 1; i <= l; i += 1) {
    pagea.drawLine({
      start: {
        x: { num: 11, unit: 'mm' },
        y: { num: 100 - 9 * i, unit: 'mm' },
      },
      end: {
        x: { num: 11, unit: 'mm' },
        y: { num: 100 - 9 * i - 6.5, unit: 'mm' },
      },
      color: rgb(1, 0, 0),
    });
    pagea.drawLine({
      start: {
        x: { num: 11, unit: 'mm' },
        y: { num: 100 - 9 * i, unit: 'mm' },
      },
      end: {
        x: { num: 20, unit: 'mm' },
        y: { num: 100 - 9 * i, unit: 'mm' },
      },
      color: rgb(1, 0, 0),
    });

    pagea.drawLine({
      start: {
        x: { num: 20, unit: 'mm' },
        y: { num: 100 - 9 * i, unit: 'mm' },
      },
      end: {
        x: { num: 20, unit: 'mm' },
        y: { num: 100 - 9 * i - 6.5, unit: 'mm' },
      },
      color: rgb(1, 0, 0),
    });
    pagea.drawLine({
      start: {
        x: { num: 11, unit: 'mm' },
        y: { num: 100 - 9 * i - 6.5, unit: 'mm' },
      },
      end: {
        x: { num: 20, unit: 'mm' },
        y: { num: 100 - 9 * i - 6.5, unit: 'mm' },
      },
      color: rgb(1, 0, 0),
    });
  }
};

const main = async (
  adifFile: string,
  userdataFile: string,
  templateFile: string,
  outFile: string
) => {
  const userdataJSON = await fs.readFile(userdataFile, { encoding: 'utf8' });
  const userdata = <{ [field: string]: string }>JSON.parse(userdataJSON);

  const templateJSON = await fs.readFile(templateFile, { encoding: 'utf8' });
  const template = <Template>JSON.parse(templateJSON);

  const recs = (() =>
    template.jarlsort
      ? recordsProxy(jarlsort(adif(adifFile)))
      : recordsProxy(adif(adifFile)))();

  // PDF Creation
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font: { [field: string]: PDFFont } = {};
  await Promise.all(
    Object.entries(template.font).map(async (o) =>
      pdfDoc.embedFont(await fs.readFile(o[1])).then((v) => {
        font[o[0]] = v;
      })
    )
  );

  const ttp = new TTP(font);
  const doOptionJSON = JSON.stringify(template.template);

  recs.forEach((rec) => {
    const pagea = page(
      pdfDoc.addPage(
        <[number, number]>[template.height, template.width].map((v) => pt(v))
      )
    );

    pagea.setFont(font[template.defaultFont]);
    pagea.setFontSize(template.defaultSize);

    if (template.callText) {
      callText(pagea, rec.call, font.m1mr);
    }
    if (template.callBox) {
      callBox(pagea, rec.call);
    }
    (<DoOption[]>JSON.parse(doOptionJSON)).forEach((o) =>
      ttp.do(o)(pagea, userdata, rec)
    );
  });

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outFile, pdfBytes);
};

main(
  './tests/data/jarlsort/test.adi',
  'userdata.json',
  './template/standard.json',
  'aaa.pdf'
);
