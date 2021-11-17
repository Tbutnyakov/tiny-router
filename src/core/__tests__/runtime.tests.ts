import { buildRouter } from '../builder';
import { getMatchedRoutesBlueprints } from '../runtime';
import { TEST_SCHEME } from './mocks';

describe('runtime tests', () => {
  const testRoutes = buildRouter(TEST_SCHEME);
  it('getMatchedRoutesBlueprints should return an array of two elements', () => {
    const testBlueprints = getMatchedRoutesBlueprints(
      '/test/2',
      testRoutes.blueprints
    );
    console.log(testBlueprints);
    expect(testBlueprints.length).toBe(TEST_SCHEME.blueprints.length);
  });
});
