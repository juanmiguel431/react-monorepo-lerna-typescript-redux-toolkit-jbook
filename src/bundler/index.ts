import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let isInitialized = false;

export const bundle = async (rawCode: string): Promise<{ code: string, error: string  }> => {

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

  try {
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

    return {
      code: build.outputFiles[0].text,
      error: ''
    };

  } catch (e: any) {
    return {
      code: '',
      error: e.message
    };
  }
}


export default bundle;
