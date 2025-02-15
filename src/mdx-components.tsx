import Image, { ImageProps } from 'next/image';
import Card from './components/mdx/card';
import ExternalLink from './components/mdx/external-link';
import MDXPreWrapper from './components/mdx/pre-wrapper';
import type { ComponentType } from 'react';

export type MDXComponents = Partial<Record<string, ComponentType<any>>>;

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  const defaultComponents: MDXComponents = {
    img: (props: ImageProps) => <Image sizes="100vw" {...props} />,
    Card,
    pre: MDXPreWrapper,
    ExternalLink,
  };

  return {
    ...defaultComponents,
    ...components,
  };
}
