export default (num: number, unit: 'pt' | 'mm' = 'pt') => {
  if (unit === 'pt') {
    return num;
  }
  if (unit === 'mm') {
    return 72/25.4 * num;
  }
  throw new Error('undefined unit')
}