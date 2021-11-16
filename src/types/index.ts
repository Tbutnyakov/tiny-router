export type TRMiddlewareProps = {
  prevRecord: any;
  nextRecord: any;
  next: () => undefined;
};

export type TRMiddleware = (prop: TRMiddlewareProps) => Promise<any>;

export type TRRouteParserRecord = {
  match: (url?: string) => {};
};

export type TRComponentRecord = {
  slot: string;
  handler: any;
};

export type TRBlueprint = {
  path: string;
  components: TRComponentRecord[];
  middlewares?: TRMiddleware[];
};

export type TRBlueprintEnriched = TRBlueprint & {
  parser: any;
  middlewares: TRMiddleware[];
};

export type TRBlueprintScheme = {
  blueprints: TRBlueprint[];
};

export type TRBlueprintEnrichedScheme = {
  blueprints: TRBlueprintEnriched[];
};

export type TRRouteRecord = {
  search: string;
  hash: string;
  pathname: string;
  params: {
    [key: string]: string;
  };
  queryParams: {
    [key: string]: string;
  };
};
