import autobind from 'autobind-decorator';
import { AxiosResponse } from 'axios';

export interface IAxiosEitherResponse<T>
  extends Pick<AxiosResponse<T>, 'data' | 'status' | 'statusText'> {}

interface IAxiosEitherLeft<L> {
  left: () => L;
}

interface IAxiosEitherRight<R> {
  right: (r: IAxiosEitherResponse<R>) => R;
}

interface IAxiosEitherCaseOf<L, R>
  extends IAxiosEitherLeft<L>,
    IAxiosEitherRight<R> {}

enum ENEitherType {
  JUST = 'Just',
  NOTHING = 'Nothing'
}

export default class AxiosEither<T> {
  constructor(
    private v: IAxiosEitherResponse<T>,
    private _type: ENEitherType = ENEitherType.NOTHING
  ) {}

  static left<L>(l: IAxiosEitherResponse<L>): AxiosEither<L> {
    return new AxiosEither<L>(l, ENEitherType.NOTHING);
  }

  static right<R>(r: IAxiosEitherResponse<R>): AxiosEither<R> {
    return new AxiosEither<R>(r, ENEitherType.JUST);
  }

  // FIXME: 타입들이 꼬여서 지금은 사용 불가.. 고쳐야한다
  @autobind
  map(
    fn: (
      d: IAxiosEitherResponse<T>
    ) => // ...args: any[]
    IAxiosEitherResponse<T>
  ): AxiosEither<T> {
    if (this._type === ENEitherType.NOTHING) {
      return new AxiosEither<T>(this.v, ENEitherType.NOTHING);
    }
    return new AxiosEither<T>(fn(this.v), ENEitherType.JUST);
  }

  @autobind
  caseOf<L, R>({ left, right }: IAxiosEitherCaseOf<L, R>): L | R {
    if (this._type === ENEitherType.NOTHING || !this.v) {
      return left();
    }

    // FIXME: 이거 타입 변환 이렇게 하면 안될 것 같은데
    return right((this.v as any) as IAxiosEitherResponse<R>);
  }
}
