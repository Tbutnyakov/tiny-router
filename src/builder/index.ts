import fs from 'fs';
import path from 'path';

export const parsePage = (path: string, pathname?: string) => {
  const res = fs.readdirSync(path);
  console.log(res);
  return {
    pathname,
  };
};

export const extractRoutesPaths = (pathName: string): string[] => {
  const stat = fs.lstatSync(pathName);
  if (stat.isFile()) return [pathName];
  const pathNames = fs.readdirSync(pathName);
  return pathNames.flatMap(newPathName =>
    extractRoutesPaths(path.resolve(pathName, newPathName))
  );
};

export const getRoutesFsData = (contextDirectoryPath: string) => {
  const fullPaths = extractRoutesPaths(contextDirectoryPath);
  return fullPaths.map(fullPath => ({
    fullPath,
    contextPath: contextDirectoryPath,
    relativePath: fullPath.substring(0, contextDirectoryPath.length),
  }));
};
