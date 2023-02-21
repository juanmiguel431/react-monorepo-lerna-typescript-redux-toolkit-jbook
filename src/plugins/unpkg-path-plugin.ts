import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      // Handle root entry file of 'index.js'
      build.onResolve({filter: /^index\.js$/ }, (args) => {
        return { path: args.path, namespace: 'a' };
      });

      // Handle relative path in a module
      build.onResolve({filter: /^\.\// }, (args) => {
        const path = new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href;
        return { path: path, namespace: 'a' };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args) => {
        const path = `https://unpkg.com/${args.path}`;
        return { path: path, namespace: 'a' };
      });
    },
  };
};
