import webpack, {
  Compiler,
  Compilation,
  EntryPlugin,
  EntryOptionPlugin,
} from 'webpack';

// import { getRoutesFsData } from '../builder';
import path from 'path';

const pluginName = 'TinyRouterPlugin';

type TinyRouterPluginOptions = {
  rootDir: string;
};

export class TinyRouterPlugin {
  private rootDir: string;

  constructor(props: TinyRouterPluginOptions) {
    this.rootDir = props.rootDir;
  }

  apply(compiler: Compiler) {
    const pagesRootDir = path.resolve(this.rootDir, 'router', 'pages');
    /*
    compiler.hooks.watchRun.tapAsync(pluginName, (compiler, cb) => {
      const pagesRootDir = path.resolve(this.rootDir, 'router', 'pages');

      compiler.hooks.thisCompilation.tap(
        pluginName,
        (newCompilation: compilation.Compilation) => {
          const pagesDataSets = getRoutesFsData(pagesRootDir);
          pagesDataSets.forEach(newPageDataSet => {
            newCompilation.addEntry(
              newPageDataSet.contextPath,
              newPageDataSet.relativePath,
              newPageDataSet.relativePath,
              () => undefined
            );
          });

          console.log(pagesDataSets);
        }
      );
      cb();
    });
    */

    /*
    compiler.hooks.beforeRun.tapAsync(pluginName, (compiler, cb) => {
  

      compiler.hooks.thisCompilation.tap(
        pluginName,
        (newCompilation: compilation.Compilation) => {
          const pagesDataSets = getRoutesFsData(pagesRootDir);
          pagesDataSets.forEach(newPageDataSet => {
            newCompilation.addEntry(
              './',
              newPageDataSet.relativePath,
              newPageDataSet.relativePath,
              () => undefined
            );
          });

          console.log(pagesDataSets);
        }
      );
      cb();
    });
    */
  }
}
