import { getRoutesFsData, getRoutesModulesRawData } from '../builder';

export const makeWebpackEntries = (routesBlueprints: TRBuildRouteBlueprint[]) =>
  routesBlueprints.reduce((acc, route) => {
    return { ...acc, [route.name]: route.relativeFsPath };
  }, {});

export const makeDefinedRouterData = (data: any = {}) => ({
  'process.env.TINY_ROUTER_DATA': JSON.stringify(data),
});

export const makeTinyWebpackRouter = (
  props: TRWebpackMakerProps
): TRWebpackMakerResult => {
  try {
    const {
      contextPath = process.cwd(),
      routerPath = ['src', 'router', 'pages'],
    } = props || {};
    const routesFsData = getRoutesFsData(contextPath, routerPath);
    const modulesRawData = getRoutesModulesRawData(routesFsData);

    return {
      entries: makeWebpackEntries(routesFsData),
      modulesRawData,
      definedRouterData: makeDefinedRouterData(modulesRawData),
    };
  } catch (e) {
    console.error('Tiny Router stuck with an error', e);
    return {
      entries: {},
      modulesRawData: [],
      definedRouterData: makeDefinedRouterData(),
    };
  }
};
