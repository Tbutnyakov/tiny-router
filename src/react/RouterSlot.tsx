import { useRouterContext } from './useRouterContext';

export const RouterSlot = ({ name }: TRReactSlotProps) => {
  const { pageData } = useRouterContext();
  const { components } = pageData;
  return components.find(data => data.slot === name)?.component || null;
};
