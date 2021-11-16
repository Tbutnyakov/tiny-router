import PathToRegex from 'path-to-regex';

import type {
  TRBlueprintScheme,
  TRBlueprintEnrichedScheme,
  TRBlueprint,
  TRBlueprintEnriched,
  TRRouteParserRecord,
} from '../types';

export const createParser = (to: string): TRRouteParserRecord =>
  new PathToRegex(to);

const enrichBlueprints = (blueprints: TRBlueprint[]): TRBlueprintEnriched[] =>
  blueprints.map(blueprint => ({
    ...blueprint,
    parser: createParser(blueprint.path),
    middlewares: blueprint.middlewares || [],
  }));

export const buildRouter = (
  scheme: TRBlueprintScheme
): TRBlueprintEnrichedScheme => {
  return {
    blueprints: enrichBlueprints(scheme.blueprints),
  };
};
