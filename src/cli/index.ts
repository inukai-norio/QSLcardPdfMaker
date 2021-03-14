import { PDFDocument, PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import page from '../lib/pdf/page';
import pt, { Ptuu } from '../lib/pdf/pt';
import TTP, { DoOption } from '../lib/ttp';

type Template = {
  template: DoOption[],
  font: {
    [field: string]: string;
  },
  height:string | number | Ptuu,
  width: string | number | Ptuu,
  defaultFont: string,
  defaultSize: string | number | Ptuu,
}

(async () => {
  const userdata = {
    qth: [
      '43-1, Minamiotsuka 3-chome,',
      'Toshima-ku, TOKYO',
      '170-8073, JAPAN',
    ].join('\n'),
    qth_local: [
      '170-8073 東京都豊島区南大塚 3-43-1',
      '大塚HTビル6階',
    ].join('\n'),
  };
  const recs = [
    {
      band: '40M',
      call: 'AB1CDE',
      frequency: '7.042900',
      mode: 'FT8',
      date: (new Date(1613433600000)).toISOString(),
      rst_rcvd: '-1',
      rst_sent: '-2',
      rig: 'FT-450DM',
      power: '50W',
    },
    {
      band: '40M',
      call: 'AB0CDE',
      frequency: '7.042900',
      mode: 'FT4',
      date: (new Date(1613433600000)).toISOString(),
      rst_rcvd: '-1',
      rst_sent: '-2',
      rig: 'IC-7300M',
      power: '50W',
    },
  ];
  
  const templateJSON = await fs.readFile('./template/standard.json', {encoding: 'utf8'});
  const template = <Template>JSON.parse(templateJSON);

  // PDF Creation
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  
  const font: {[field: string]: PDFFont} = {};
  await Promise.all(Object.entries(template.font).map(async (o) => pdfDoc.embedFont(await fs.readFile(o[1])).then((v) => { font[o[0]] = v })));

  const ttp = new TTP(font);
  const DoOptionJSON = JSON.stringify(template.template);

  recs.forEach((rec) => {
    const pagea = page(
      pdfDoc.addPage(<[number, number]>[template.height, template.width].map((v) => pt(v)))
    );
    
    pagea.setFont(font[template.defaultFont]);
    pagea.setFontSize(template.defaultSize);
    (<DoOption[]>JSON.parse(DoOptionJSON)).forEach((o) => ttp.do(o)(pagea, userdata, rec));
  });

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile('aaa.pdf', pdfBytes);
})();
