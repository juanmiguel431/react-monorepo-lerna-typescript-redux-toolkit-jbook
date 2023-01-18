import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        let path: string;
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          path = args.path;
        } else if (args.path.includes('./')) {
          path = new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href;
        } else {
          path = `https://unpkg.com/${args.path}`;
        }

        return { path: path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
                  const message = require('react');
                  console.log(message);
                `,
          };
        }

        const { data, request } = await axios.get<string>(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };
      });
    },
  };
};
