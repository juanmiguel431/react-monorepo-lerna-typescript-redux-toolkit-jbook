import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        let path: string;
        if (args.path === 'tiny-test-pkg') {
          path = 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js';
        } else {
          path = args.path;
        }

        return { path: path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
                  const message = require('tiny-test-pkg');
                  console.log(message);
                `,
          };
        }

        const { data } = await axios.get<string>(args.path);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
