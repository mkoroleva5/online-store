export const parsePathname = (path: string) => {
  return path.split('/').filter((el) => el);
};
