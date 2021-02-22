import { PDFFont } from "pdf-lib";

type TextData = {
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
}

type Point = {
  x: number,
  y: number,
}

export const leftBottom = (data: TextData): Point => {
  const { x, y } = data;
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x, y };
};

export const rightBottom = (data: TextData): Point => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x: data.x - l, y: data.y };
}

export const leftTop = (data: TextData): Point => {
  const { x, y } = data;
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x, y: y - h };
};

export const rightTop = (data: TextData): Point => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  return { x: data.x - l, y: data.y - h };
}
