import React, { useState } from 'react';
import { RouterContext } from './RouterContext';
import { makeRouterCore } from '../core';

export const RouterProvider = ({ children }: RouterProviderProps) => {
  const [activeRouteRecord, setActiveRouteRecord] = useState(
    (undefined as unknown) as TRActiveRouteRecord
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

  const onRouteUpdate = (newRoute: TRActiveRouteRecord) => {
    setActiveRouteRecord(newRoute);
  };

  const state = {
    activeRouteRecord,
    updateActiveRoute,
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
