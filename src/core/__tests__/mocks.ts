const ROOT_PATH_BLUEPRINT = {
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
};

const TEST_WITH_PARAM_ID_BLUEPRINT = {
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
};

const WILDCARD_BLUEPRINT = {
  path: '*',
  components: [
    {
      slot: 'default',
      handler: () => 'default-wildcard',
    },
    {
      slot: 'top',
      handler: () => 'top-wildcard',
    },
  ],
};

export const TEST_BLUEPRINTS = [
  ROOT_PATH_BLUEPRINT,
  TEST_WITH_PARAM_ID_BLUEPRINT,
  WILDCARD_BLUEPRINT,
];

export const TEST_SCHEME = {
  blueprints: TEST_BLUEPRINTS,
};

describe('mocks', () => {
  it('mock shim', () => expect(true).toBe(true));
});
