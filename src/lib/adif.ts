import * as fs from 'fs';
import { AdifParser, SimpleAdif } from 'adif-parser-ts';

export default (filename: string): SimpleAdif => {
  const fileContent = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  return AdifParser.parseAdi(fileContent);
};
