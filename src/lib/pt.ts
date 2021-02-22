const mm2pt = (mm: number) => 72/25.4 * mm;
const pt2pt = (pt: number) => pt;

type ptuu = {
  num: number,
  unit: 'pt' | 'mm',
}
export default (data: ptuu) => {
  if (data.unit === 'pt') {
    return pt2pt(data.num);
  }
  if (data.unit === 'mm') {
    return mm2pt(data.num);
  }
  throw new Error('undefined unit')
}