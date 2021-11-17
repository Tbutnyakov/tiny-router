import { buildRouter } from '../builder';
import { TEST_SCHEME } from './mocks';

describe('builder tests', () => {
  const testRoutes = buildRouter(TEST_SCHEME);

  it('buildRouter should return the same blueprints count', () => {
    expect(testRoutes.blueprints.length).toBe(TEST_SCHEME.blueprints.length);
  });

  it('buildRouter should inject middlewares if it not exist in blueprint', () => {
    testRoutes.blueprints.forEach(blueprint => {
      expect(Array.isArray(blueprint.middlewares)).toBe(true);
    });
  });
});
