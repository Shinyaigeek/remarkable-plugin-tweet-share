export const peek = (src: string, position: number, cnt: number): string => {
  return src.slice(position, position + cnt);
};
