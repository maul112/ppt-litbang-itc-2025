import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
// import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
    slug: {
        type: "string",
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
}

export const Doc = defineDocumentType(() => ({
    name: "Doc",
    filePathPattern: `markdown/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
            required: true,
        },
        writed: {
            type: "string",
            required: true,
        },
        views: {
            type: "string",
            required: true,
        },
        time: {
            type: "string",
            required: true,
        },
        image: {
            type: "string",
            required: true,
        },
        query: {
            type: "list",
            of: { type: "string" },
            required: true,
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: "src/content",
    documentTypes: [Doc],
    mdx: {
        // remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    onVisitLine(node) {
                        // Prevent lines from collapsing in `display: grid` mode, and
                        // allow them to wrap long lines instead
                        if (node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }];
                        }
                    },
                    onVisitHighlightedLine(node) {
                        // Each line node by default has `className="line"`.
                        node.properties.className.push("line--highlighted");
                    },
                    onVisitHighlightedWord(node) {
                        // Each word node has `className="word"`.
                        node.properties.className = ["word--highlighted"];
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    }
                },
            ]
        ]
    }
})