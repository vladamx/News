export type Ok<T> = { tag: 'Ok'; ok: T };
export type Err<F> = { tag: 'Err'; err: F };
export type Result<T, F> = Ok<T> | Err<F>;
export const Res = Object.freeze({
  Ok: <T, F>(ok: T): Result<T, F> => ({ tag: 'Ok', ok }),
  Err: <T, F>(err: F): Result<T, F> => ({ tag: 'Err', err }),
});
