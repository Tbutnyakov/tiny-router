import PathToRegex from 'path-to-regex';
import { parse, stringify } from 'query-string';

export const stringifyQuery = stringify;
export const parseQuery = (str: string) => ({ ...parse(str) });
export const createParser = (to: string): TRRouteParserObject =>
  new PathToRegex(to);

export const getMatchedParams = (
  routeData: TRRouteModuleDataWithParser,
  url: string
) =>
  // @ts-ignore
  routeData.parser.match(url);

export const findMatchedRouteData = (
  routesData: TRRouteModuleDataWithParser[],
  path: string
) => routesData.find(data => getMatchedParams(data, path));

export const makeRouteLocation = (fullPath: string): TRLocation => {
  const pattern = RegExp(
    '^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?'
  ); // just rfc spec regexp;
  const matches = fullPath.match(pattern) || [];
  return {
    fullPath,
    search: matches[7] || '',
    hash: matches[9] || '',
    path: matches[5] || '',
  };
};

export const loadRouteData = async (url: string) => {
  try {
    const { default: page } = await import(url);
    return page;
  } catch (e) {
    return false;
  }
};

export const createActiveRouteObject = (
  routeData: TRRouteModuleDataWithParser,
  locationObj: TRLocation
): TRActiveRouteRecord => {
  const { fullPath, search, path, hash } = locationObj;

  const params = getMatchedParams(routeData, path) || {};
  const query = parseQuery(search);
  return {
    fullPath,
    path,
    hash,
    search,
    params,
    query,
  };
};

export const findRouteHandler = (
  routesHandlers: TRRouteModuleHandler[],
  mathedRouteData: TRRouteModuleDataWithParser
) =>
  routesHandlers.find(handler => Object.is(handler.name, mathedRouteData.name));

export const pipeMiddlewares = async (
  nextRoute: TRActiveRouteRecord,
  prevRoute: TRActiveRouteRecord,
  middlewares: TRRouteMiddleware[]
) => {
  const redirect = () => false;
  const next = () => true;
  for (const middleware of middlewares || []) {
    const result = await middleware({ prevRoute, nextRoute, redirect, next });
    if (!result) break;
    return false;
  }
  return true;
};

export const makeRouterCore = (routesRawData: TRRouteRawModuleData[] = []) => {
  let mathedRoutesData: TRRouteModuleDataWithParser[] = [];
  let routesHandlers: TRRouteModuleHandler[] = [];

  let activeRouteRecord = (undefined as unknown) as TRActiveRouteRecord;

  const setActiveRoute = (newRecord: TRActiveRouteRecord) => {
    activeRouteRecord = newRecord;
  };

  const handleUpdateActiveRoute = async (
    previousRoute: TRActiveRouteRecord | undefined,
    fullPath: string
  ) => {
    const targetLocation = makeRouteLocation(fullPath);
    const matchedRouteData = findMatchedRouteData(
      mathedRoutesData,
      targetLocation.path
    );
    if (!matchedRouteData) return false;
    const routeHandlerData = findRouteHandler(routesHandlers, matchedRouteData);
    if (!routeHandlerData) await loadNewRouteHandler(matchedRouteData);
    const newRouteHandlerData = findRouteHandler(
      routesHandlers,
      matchedRouteData
    );
    if (!newRouteHandlerData) return false;

    console.log(previousRoute);

    const newActiveRouteRecord = createActiveRouteObject(
      newRouteHandlerData,
      targetLocation
    );

    if (
      !pipeMiddlewares(
        newActiveRouteRecord,
        activeRouteRecord,
        newRouteHandlerData.page.middlewares as TRRouteMiddleware[]
      )
    )
      return false;

    setActiveRoute(activeRouteRecord);
    return true;
  };

  const loadNewRouteHandler = async (
    matchedRouteData: TRRouteModuleDataWithParser
  ) => {
    const pageComponent = await loadRouteData(matchedRouteData.relativeFsPath);
    if (!pageComponent) return false;
    routesHandlers.push({
      ...matchedRouteData,
      page: pageComponent,
    });
    return true;
  };

  const makeMathToRoutesData = () => {
    mathedRoutesData = routesRawData.map(data => ({
      ...data,
      parser: createParser(data.name),
    }));
  };

  makeMathToRoutesData();

  return {
    handleUpdateActiveRoute,
    setActiveRoute,
  };
};

export const core = makeRouterCore();
