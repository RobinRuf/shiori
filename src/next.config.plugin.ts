import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/**
 * Shiori Wrapper for NextJS Config
 *
 * @param shioriOptions - Optional MDX options, that will be merged with the default options
 * @returns A function, that gets an existing NextConfig and modifies it
 */
export default function shiori(shioriOptions = {}) {
  const mdxOptions = {
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
          },
        ],
      ],
      ...shioriOptions,
    },
  };

  const withMDX = createMDX(mdxOptions);

  return function (nextConfig = {}) {
    return withMDX({
      ...nextConfig,
      pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    })
  }
}
