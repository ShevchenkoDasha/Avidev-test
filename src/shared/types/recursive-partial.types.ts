export type RecursivePartialModel<T> = {
  [Key in keyof T]?: T[Key] extends (infer U)[]
    ? RecursivePartialModel<U>[]
    : T[Key] extends object
      ? RecursivePartialModel<T[Key]>
      : T[Key];
};
