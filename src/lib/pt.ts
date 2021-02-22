type ptuu = {
  num: number,
  unit: 'pt' | 'mm',
}
export default (data: ptuu) => {
  if (data.unit === 'pt') {
    return data.num;
  }
  if (data.unit === 'mm') {
    return 72/25.4 * data.num;
  }
  throw new Error('undefined unit')
}