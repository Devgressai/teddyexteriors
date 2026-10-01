import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

const components: MDXComponents = {
  a: ({ href, children, ...rest }) => {
    const url = typeof href === "string" ? href : "";
    const external = url.startsWith("http");
    if (external) {
      return (
        <a href={url} rel="noopener noreferrer" target="_blank" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={url} {...rest}>
        {children}
      </Link>
    );
  },
  img: (props) => (
    <Image
      sizes="(min-width: 1024px) 800px, 100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
