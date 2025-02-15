import Image, { ImageProps } from 'next/image';
import Card from './components/mdx/card';
import CodeBlock from './components/mdx/codeblock';
import ExternalLink from './components/mdx/external-link';
import type { ComponentType } from 'react';

export type MDXComponents = Partial<Record<string, ComponentType<any>>>;

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  const defaultComponents: MDXComponents = {
    img: (props: ImageProps) => <Image sizes="100vw" {...props} />,
    Card,
    CodeBlock,
    ExternalLink,
  };

  return {
    ...defaultComponents,
    ...components,
  };
}
