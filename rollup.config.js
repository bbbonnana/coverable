import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'

const commonPlugins = [
  nodeResolve(),
  commonjs()
]

const demoConfig = [{
  input: './src/demo.js',
  output: {
    file: './dist-demo/demo.js',
    format: 'cjs',
    exports: 'none'
  },
  plugins: [
    copy({ targets: [{ src: 'public/**/*', dest: 'dist-demo' }] }),
    ...commonPlugins
  ]
}]

const coreConfig = [{
  input: './src/index.js',
  output: [
    {
      file: './dist/pika9.common.js',
      format: 'cjs',
      exports: 'auto'
    },
    {
      file: './dist/pika9.esm.js',
      format: 'esm',
      exports: 'default'
    }
  ],
  plugins: [
    terser(),
    copy({
      targets: [
        { src: 'public/pika9.css', dest: 'dist' },
        { src: 'src/index.d.ts', dest: 'dist' }
      ]
    }),
    ...commonPlugins
  ]
}]

const config = process.env.TARGET === 'demo' ? demoConfig : coreConfig

export default config
