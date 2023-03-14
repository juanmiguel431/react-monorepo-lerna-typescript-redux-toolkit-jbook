import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let isInitialized = false;

export const bundle = async (rawCode: string): Promise<string> => {

  if (!isInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.16.16/esbuild.wasm',
      worker: true
    });
    isInitialized = true;
  }

  // const result = await esbuild.transform(input, {
  //   loader: 'jsx',
  //   target: 'es2015'
  // });

  const build = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    }
  });

  return build.outputFiles[0].text;
}


export default bundle;
