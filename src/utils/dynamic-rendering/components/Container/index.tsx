import React from 'react';

interface IContainer {
  fluid?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Container({
  children,
  fluid = false,
  className,
}: IContainer) {
  const containerClass = fluid ? 'container-fluid' : 'container';

  return <div className={containerClass + ' ' + className}>{children}</div>;
}
