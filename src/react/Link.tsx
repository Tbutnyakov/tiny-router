import React, { MouseEvent } from 'react';
import { useRouterContext } from './useRouterContext';

export const Link = (props: TRReactLinkProps) => {
  const { href, children, to, replace, ...restProps } = props;
  if (href)
    return (
      <a href={href} {...restProps}>
        {children}
      </a>
    );

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const {
      historyProvider,
      replace: replaceAction,
      push,
    } = useRouterContext();
    if (!Object.is(historyProvider.getFullPath(), href)) return undefined;
    if (replace) return replaceAction(href);
    return push(href);
  };

  return (
    <a onClick={handleClick} href={to} {...restProps}>
      {children}
    </a>
  );
};
