export const mm2pt = (mm: number) => 72/25.4 * mm;
export const pt2pt = (pt: number) => pt;

export const ptormm2pt = (data: any) => {
  if (data.unit === 'pt') {
    return pt2pt(data.num);
  }
  if (data.unit === 'mm') {
    return mm2pt(data.num);
  }
}