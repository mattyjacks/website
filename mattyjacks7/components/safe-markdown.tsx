import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type Props = {
  content: string;
};

const schema = {
  ...defaultSchema,
  tagNames: Array.from(
    new Set([
      ...(defaultSchema.tagNames ?? []),
      "img",
      "figure",
      "figcaption",
      "div",
      "span",
    ])
  ),
  attributes: {
    ...defaultSchema.attributes,
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "width",
      "height",
      "loading",
      "decoding",
      "style",
      "class",
    ],
    a: [...(defaultSchema.attributes?.a ?? []), "target", "rel"],
    div: [...(defaultSchema.attributes?.div ?? []), "style", "class"],
    span: [...(defaultSchema.attributes?.span ?? []), "style", "class"],
    p: [...(defaultSchema.attributes?.p ?? []), "style", "class"],
    figure: [...(defaultSchema.attributes?.figure ?? []), "style", "class"],
    figcaption: [...(defaultSchema.attributes?.figcaption ?? []), "style", "class"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"],
    href: ["http", "https", "mailto"],
  },
};

export default function SafeMarkdown({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}
    >
      {content}
    </ReactMarkdown>
  );
}
