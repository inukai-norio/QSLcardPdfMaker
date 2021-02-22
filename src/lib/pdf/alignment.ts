export const leftBottom = (data: any) => {
  const { x, y } = data;
  return { x, y };
};

export const rightBottom = (data: any) => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  return { x: data.x, y: data.y - l };
}

export const leftTop = (data: any) => {
  const { x, y } = data;
  const h = data.font.heightAtSize(data.size)
  return { x: x - h, y };
};

export const rightTop = (data: any) => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x: data.x - h, y: data.y - l };
}
