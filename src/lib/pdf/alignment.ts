export const leftBottom = (data: any) => {
  const { x, y } = data;
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x, y };
};

export const rightBottom = (data: any) => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x: data.x - l, y: data.y };
}

export const leftTop = (data: any) => {
  const { x, y } = data;
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x, y: y - h };
};

export const rightTop = (data: any) => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x: data.x - l, y: data.y - h };
}
