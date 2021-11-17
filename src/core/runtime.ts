import { TRBlueprintEnriched, TRBlueprintEnrichedScheme } from '../types';

export const getMatchedRoutesBlueprints = (
  requestPath: string,
  blueprints: TRBlueprintEnriched[]
): TRBlueprintEnriched[] =>
  blueprints.filter(bluperint => bluperint.parser.match(requestPath));

export const handleRouteTransition = (
  requestPath: string,
  scheme: TRBlueprintEnrichedScheme
) => {
  // Here all transition work
  console.log(requestPath, scheme);
};
