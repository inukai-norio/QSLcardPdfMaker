import * as fs from 'fs';
import { AdifParser } from 'adif-parser-ts';

export const readDdifAndParse = (filename: string) => {
  const fileContent = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  return AdifParser.parseAdi(fileContent);
};
