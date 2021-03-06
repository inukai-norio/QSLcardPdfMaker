import { PDFFont } from 'pdf-lib';

export type Alignment = {
  vertical?: 'bottom' | 'middle' | 'top';
  horizontal?: 'left' | 'center' | 'right';
};

type TextData = {
  alignment?: Alignment;
  text: string;
  font: PDFFont;
  size: number;
  x: number;
  y: number;
};

type Point = {
  x: number;
  y: number;
};

export const text = (data: TextData): Point => {
  const l = data.font.widthOfTextAtSize(data.text, data.size);
  const h = data.font.heightAtSize(data.size);
  if (data.alignment === undefined) {
    return { x: data.x, y: data.y };
  }
  if (typeof data.alignment !== 'object') {
    throw new Error('alignment is not object');
  }
  if (
    data.alignment.horizontal === undefined ||
    data.alignment.horizontal === 'left'
  ) {
    if (
      data.alignment.vertical === undefined ||
      data.alignment.vertical === 'bottom'
    ) {
      return { x: data.x, y: data.y };
    }
    if (data.alignment.vertical === 'top') {
      return { x: data.x, y: data.y - h };
    }
    if (data.alignment.vertical === 'middle') {
      return { x: data.x, y: data.y - h / 2 };
    }
  }
  if (data.alignment.horizontal === 'right') {
    if (
      data.alignment.vertical === undefined ||
      data.alignment.vertical === 'bottom'
    ) {
      return { x: data.x - l, y: data.y };
    }
    if (data.alignment.vertical === 'top') {
      return { x: data.x - l, y: data.y - h };
    }
    if (data.alignment.vertical === 'middle') {
      return { x: data.x - l, y: data.y - h / 2 };
    }
  }
  if (data.alignment.horizontal === 'center') {
    if (
      data.alignment.vertical === undefined ||
      data.alignment.vertical === 'bottom'
    ) {
      return { x: data.x - l / 2, y: data.y };
    }
    if (data.alignment.vertical === 'top') {
      return { x: data.x - l / 2, y: data.y - h };
    }
    if (data.alignment.vertical === 'middle') {
      return { x: data.x - l / 2, y: data.y - h / 2 };
    }
  }
  throw new Error('undefined');
};
