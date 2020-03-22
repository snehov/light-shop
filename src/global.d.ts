import 'reactn'
// NOTE: changes here needs SERVER RESTART to apply changes

declare module 'reactn/default' {
  export interface Reducers {
    /*   append: (
      global: State,
      dispatch: Dispatch,
      ...strings: any[]
    ) => Pick<State, 'value'>;

    increment: (
      global: State,
      dispatch: Dispatch,
      i: number,
    ) => Pick<State, 'count'>;

    doNothing: (
      global: State,
      dispatch: Dispatch,
    ) => null;

    cartItems: (
      global: State,
      dispatch: Dispatch,
    ) => null; */
  }

  export interface State {
    cartItems: array
  }
}
