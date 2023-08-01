export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  ms: number,
) => {
  let id: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<F>) {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};
