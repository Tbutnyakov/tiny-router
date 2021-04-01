import React, { Context } from 'react';
import { TR_ROUTER_CONTEXT } from './RouterContext';

export const useRouterContext = () =>
  React.useContext(
    (TR_ROUTER_CONTEXT as unknown) as Context<TRReactContextState>
  );
