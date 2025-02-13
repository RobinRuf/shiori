import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Card from './components/mdx/card';
import CodeBlock from './components/mdx/codeblock';
import ExternalLink from './components/mdx/external-link';

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
