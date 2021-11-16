import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/core/index.ts',
  output: {
    dir: 'dist/core',
    format: 'cjs',
  },
  plugins: [typescript()],
};
