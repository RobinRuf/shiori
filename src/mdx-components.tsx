import Image, { ImageProps } from "next/image";
import Card from "./components/mdx/card";
import MDXPreWrapper from "./components/mdx/pre-wrapper";
import type { ComponentType } from "react";
import CustomLink from "./components/mdx/custom-link";

export type MDXComponents = Partial<Record<string, ComponentType<any>>>;

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  const defaultComponents: MDXComponents = {
    h1: ({ children, ...props }) => (
      <h1
        className="sh:text-4xl sh:font-semibold sh:leading-10 sh:mb-6 sh:break-words sh:no-underline"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="sh:text-2xl sh:font-semibold sh:leading-8 sh:my-5 sh:relative sh:transition-transform sh:duration-150 sh:ease-in-out sh:pointer-events-none"
        {...props}
      >
        <span className="sh:inline-block sh:transition-colors sh:duration-150 sh:ease-in-out sh:pointer-events-auto sh:hover:text-primary">
          {children}
        </span>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="sh:text-xl sh:font-semibold sh:leading-8 sh:my-5 sh:relative sh:transition-transform sh:duration-150 sh:ease-in-out sh:pointer-events-none"
        {...props}
      >
        <span className="sh:inline-block sh:transition-colors sh:duration-150 sh:ease-in-out sh:pointer-events-auto sh:hover:text-primary">
          {children}
        </span>
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className="sh:text-content sh:text-base sh:leading-7 sh:mb-4"
        {...props}
      >
        {children}
      </p>
    ),
    img: (props: ImageProps) => <Image className="mt-4 w-full" {...props} />,
    Card,
    pre: MDXPreWrapper,
    a: CustomLink,
  };

  return {
    ...defaultComponents,
    ...components,
  };
}
