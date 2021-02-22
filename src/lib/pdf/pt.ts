type ptuu = {
  num: number,
  unit: 'pt' | 'mm',
}

export default (data: number | ptuu) => {
  if (typeof data === 'number') {
    return data;
  }
  if (data.unit === 'pt') {
    return data.num;
  }
  if (data.unit === 'mm') {
    return 72/25.4 * data.num;
  }
  throw new Error('undefined unit')
}