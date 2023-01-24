import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import * as localforage from 'localforage';
import { OnLoadResult } from 'esbuild-wasm';

const fileCache = localforage.createInstance({
  name: 'filecache'
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        let path: string;
        if (args.path === 'index.js') {
          path = args.path;
        } else if (args.path.includes('./')) {
          path = new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href;
        } else {
          path = `https://unpkg.com/${args.path}`;
        }

        return { path: path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
                  const message = require('react-select');
                  console.log(message);
                `,
          };
        }

        const cachedResult: OnLoadResult | null = await fileCache.getItem(args.path);

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get<string>(args.path);

        const result: OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
