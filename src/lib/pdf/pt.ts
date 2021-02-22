type Ptuu = {
  num: number;
  unit: 'pt' | 'mm';
};

export default (data: number | Ptuu | string): number => {
  if (typeof data === 'number') {
    return data;
  }
  if (typeof data === 'string') {
    const num = parseFloat(data);
    const unit = data.slice(-2);
    if (unit === 'pt') {
      return num;
    }
    if (unit === 'mm') {
      return (72 / 25.4) * num;
    }
    throw new Error('undefined unit');
  }
  if (data.unit === 'pt') {
    return data.num;
  }
  if (data.unit === 'mm') {
    return (72 / 25.4) * data.num;
  }
  throw new Error('undefined unit');
};
