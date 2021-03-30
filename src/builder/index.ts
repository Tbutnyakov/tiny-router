import fs from 'fs';
import path from 'path';

export const extractRoutesFsPaths = (pathName: string): string[] => {
  const stat = fs.lstatSync(pathName);
  if (stat.isFile()) return [pathName];
  const pathNames = fs.readdirSync(pathName);
  return pathNames.flatMap(newPathName =>
    extractRoutesFsPaths(path.resolve(pathName, newPathName))
  );
};

export const extractNavFsData = (ctxFsPath: string, routerPath: string[]) => (
  fullFsPath: string
) => {
  const extension = fullFsPath.split('.').pop() || '';
  const pathToRouterPages = path.resolve(ctxFsPath, ...routerPath);
  const relativeFsPath = fullFsPath.substring(ctxFsPath.length);

  const [name = ''] = fullFsPath.substring(pathToRouterPages.length).split('.');

  return {
    relativeFsPath: `./${relativeFsPath}`,
    fullFsPath,
    extension,
    name,
  };
};

export const getRoutesFsData = (
  contextDirectoryPath: string,
  routerPath: string[]
): TRBuildRouteBlueprint[] => {
  const routerCtx = path.resolve(contextDirectoryPath, ...routerPath);
  const fullPaths = extractRoutesFsPaths(routerCtx);
  return fullPaths.map(extractNavFsData(contextDirectoryPath, routerPath));
};

export const getRoutesModulesRawData = (
  blueprints: TRBuildRouteBlueprint[]
): TRRouteRawModuleData[] =>
  blueprints.map(blueprint => ({
    name: blueprint.name.replace('index', '/').replace('_', ':'),
    relativeFsPath: blueprint.relativeFsPath,
  }));
