import { buildRouter } from '../builder';

const TEST_BLUEPRINTS = [
  {
    path: '/',
    components: [
      {
        slot: 'default',
        handler: () => 'default-result',
      },
      {
        slot: 'top',
        handler: () => 'top-result',
      },
    ],
  },
  {
    path: '/test/:testId',
    components: [
      {
        slot: 'default',
        handler: () => 'default-result',
      },
      {
        slot: 'top',
        handler: () => 'top-result',
      },
    ],
  },
];

const TEST_SCHEME = {
  blueprints: TEST_BLUEPRINTS,
};

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
