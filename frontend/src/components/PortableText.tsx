import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextBlock, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[15px] md:text-[16px] leading-[1.8] mb-4 text-text-main">
        {children}
      </p>
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextReact value={value} components={components} />;
}
