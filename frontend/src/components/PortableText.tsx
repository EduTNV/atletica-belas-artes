import { PortableText as PortableTextReact } from "@portabletext/react";

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-[15px] md:text-[16px] leading-[1.8] mb-4 text-text-main">
        {children}
      </p>
    ),
  },
};

export function PortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />;
}
