import React from 'react';
import { useRouterContext } from './useRouterContext';

export const RouterSlot = ({ name }: TRReactSlotProps) => {
  const { pageData } = useRouterContext();
  const targetComponent = pageData.components.find(data => data.slot === name)
    ?.component;
  return <>{targetComponent || null} </>;
};
