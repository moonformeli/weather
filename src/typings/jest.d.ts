declare namespace jest {
  interface Matchers<R, T> {
    toMatchJSC(data: object): R;
  }
}
