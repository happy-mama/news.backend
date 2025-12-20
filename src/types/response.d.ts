interface GRes<T extends any> {
  code: number;
  message?: string;
  data?: T;
}
