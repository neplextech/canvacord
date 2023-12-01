import { createConfig } from '../../tsup.config';

export default createConfig({
  entry: ['./src/index.ts'],
  tsconfig: './tsconfig.json'
});
