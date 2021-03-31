declare module 'path-to-regex';

type TRBuildRouteBlueprint = {
  fullFsPath: string;
  relativeFsPath: string;
  extension: string;
  name: string;
};

type TRWebpackMakerProps = {
  contextPath: string;
  routerPath: string[];
};

type TRWebpackMakerResult = {
  entries: { [key: string]: string };
  modulesRawData: TRRouteRawModuleData[];
  definedRouterData: {
    'process.env.TINY_ROUTER_DATA': string;
  };
};

type TRLocation = {
  fullPath: string;
  path: string;
  hash: string;
  search: string;
};

interface TRActiveRouteRecord extends TRLocation {
  params: { [key: string]: any };
  query: { [key: string]: any };
}

type TRRouteMiddlewareProps = {
  prevRoute?: TRActiveRouteRecord;
  nextRoute: TRActiveRouteRecord;
  redirect: TRRouterReplace;
  next: () => boolean;
};

type TRRouteMiddleware = {
  (props: TRRouteMiddlewareProps): Promise<boolean>;
};

type TRPageData<ComponentType> = {
  middlewares?: TRRouterMiddleware[];
  components: TRRoutePageComponent<ComponentType>[];
};

type TRRoutePageComponent<ComponentType> = {
  slot: string;
  component: ComponentType;
};

type TRRouteRawModuleData = {
  name: string;
  relativeFsPath: string;
};

interface TRRouteModuleDataWithParser extends TRRouteRawModuleData {
  parser: TRRouteParserObject;
}

interface TRRouteParserObject {
  match: (url?: string) => {};
}

interface TRRouteModuleHandler extends TRRouteModuleDataWithParser {
  page: TRPageData<any>;
}

type TRHistoryPushProps = [{ [key: string]: any }, string, string];

type TRRouterPush = (path: string) => void;
type TRRouterReplace = (path: string) => void;

type TROnActiveRouteUpdateHandler = (TRActiveRouteRecord) => any;

type TRReactContextState = {
  activeRouteRecord: TRActiveRouteRecord;
  push: TRRouterPush;
  replace: TRRouterReplace;
};

type RouterProviderProps = {
  children: React.ReactNode;
};

type TRReactLinkProps = {
  children: React.ReactNode;
  to: string;
  href: string;
};
