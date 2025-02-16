import { defineConfig } from 'tsup'
import svgr from 'esbuild-plugin-svgr'
import { defaultEntry } from './default-entry'
import packageJson from './package.json';

export default defineConfig({
  name: packageJson.name,
  entry: [
    ...defaultEntry,
    'src/**/*.css',
    '!src/icon.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  bundle: false,
  outDir: 'dist',
  clean: true,
  external: ['next', 'react', 'react-dom'],
  esbuildPlugins: [
    svgr({
      exportType: 'named',
      typescript: true,
      svgoConfig: {
        plugins: ['removeXMLNS']
      },
      plugins: ['@svgr/plugin-svgo']
    }),
  ],
  plugins: [
    {
      name: 'strip-node-colon',
      renderChunk(code) {
        const replaced = code.replace(/(?<= from ")node:(.+)(?=";)/g, '$1')
        return { code: replaced }
      }
    },
    {
      name: 'strip-dot-svg',
      renderChunk(code) {
        const replaced = code.replace(/(?<= from ")(.+)\.svg(?=";)/g, '$1')
        return { code: replaced }
      }
    }
  ]
})
