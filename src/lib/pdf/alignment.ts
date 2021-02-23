import { PDFFont } from "pdf-lib";

type TextData = {
  alignment: {
    vertical: 'bottom' | 'top',
    horizontal: 'left' | 'right',
  },
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

export const text = (data: TextData): Point => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size)
  if (data.alignment.horizontal === 'left') {
    if (data.alignment.vertical === 'bottom') {
      return { x: data.x, y: data.y };
    }
    if (data.alignment.vertical === 'top') {
      return { x: data.x, y: data.y - h };
    }
  }
  if (data.alignment.horizontal === 'right') {
    if (data.alignment.vertical === 'bottom') {
      return { x: data.x - l, y: data.y };
    }
    if (data.alignment.vertical === 'top') {
      return { x: data.x - l, y: data.y - h };
    }
  }
  return { x: data.x, y: data.y };
}