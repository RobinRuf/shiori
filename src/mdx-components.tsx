import Image, { ImageProps } from "next/image";
import Card from "./components/mdx/card";
import MDXPreWrapper from "./components/mdx/pre-wrapper";
import type { ComponentType } from "react";
import CustomLink from "./components/mdx/custom-link";

export type MDXComponents = Partial<Record<string, ComponentType<any>>>;

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  const defaultComponents: MDXComponents = {
    h2: ({ children, ...props }) => (
      <h2 {...props}>
        <span>{children}</span>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props}>
        <span>{children}</span>
      </h3>
    ),
    img: (props: ImageProps) => <Image sizes="100vw" {...props} />,
    Card,
    pre: MDXPreWrapper,
    a: CustomLink,
  };

  return {
    ...defaultComponents,
    ...components,
  };
}
