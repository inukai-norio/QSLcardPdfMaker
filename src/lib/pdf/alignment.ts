export const leftBottom = (data: any) => {
  const { x, y } = data;
  return { x, y };
};

export const rightBottom = (data: any) => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  return { x: data.x, y: data.y - l };
}