import React, { MouseEvent } from 'react';

export const Link = (props: TRReactLinkProps) => {
  const { href, children, to, ...restProps } = props;
  if (href)
    return (
      <a href={href} {...restProps}>
        {children}
      </a>
    );
  const handleClick = (e: MouseEvent) => {
    console.log(e);
  };

  return (
    <a onClick={handleClick} href={to} {...restProps}>
      {children}
    </a>
  );
};
