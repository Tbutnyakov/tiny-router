import React, { useState } from 'react';
import { RouterContext } from './RouterContext';
import { makeRouterCore } from '../core';

export const RouterProvider = ({ children }: TRReactProviderProps) => {
  const [routeRecord, setActiveRouteRecord] = useState(
    (undefined as unknown) as TRActiveRouteRecord
  );
  const [pageData, setActiveRoutePageData] = useState(
    (undefined as unknown) as TRPageData<React.ReactNode>
  );
  const routesModulesData: TRRouteRawModuleData[] = JSON.parse(
    process.env['TINY_ROUTER_DATA'] as string
  );

  const {
    push,
    replace,
    updateActiveRoute,
    historyProvider,
    onActiveRouteUpdate,
  } = makeRouterCore(routesModulesData);

  const onRouteUpdate = (
    newRoute: TRActiveRouteRecord,
    newData: TRPageData<React.ReactNode>
  ) => {
    setActiveRouteRecord(newRoute);
    setActiveRoutePageData(newData);
  };

  const state = {
    historyProvider,
    pageData,
    routeRecord,
    push,
    replace,
  };

  onActiveRouteUpdate(onRouteUpdate);
  updateActiveRoute(historyProvider.getFullPath());

  historyProvider.onHistoryChange(() => {
    updateActiveRoute(historyProvider.getFullPath());
  });

  return (
    <RouterContext.Provider value={state}>{children}</RouterContext.Provider>
  );
};
