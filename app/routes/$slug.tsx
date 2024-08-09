import Layout from "~/layouts/layout";
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getPostBlocks, getPost } from "~/libs/notion";
import {
  getPageTableOfContents,
  uuidToId,
  getPageImageUrls,
} from "notion-utils";
import { PageBlock, Block } from "notion-types";
import { mapImageUrl } from "~/libs/utils";
import { useLoaderData } from "@remix-run/react";

const BlogPost = () => {
  const { post, coverImage, blockMap, tableOfContent } =
    useLoaderData<typeof loader>();
  if (!post) return null;
  return (
    <Layout
      blockMap={blockMap}
      coverImage={coverImage}
      tableOfContent={tableOfContent}
      frontMatter={post}
      fullWidth={post.fullWidth}
    />
  );
};

export const loader = async (params: LoaderFunctionArgs) => {
  const { slug } = params.params;
  const { NOTION_ACCESS_TOKEN, NOTION_PAGE_ID } = params.context.cloudflare.env;
  const [post] = await getPost({
    slug,
    notionPageId: NOTION_PAGE_ID,
    notionAccessToken: NOTION_ACCESS_TOKEN,
  });

  if (!post) {
    throw new Response("", { status: 404 });
  }

  const blockMap = await getPostBlocks(post.id);

  const [coverImage = ""] =
    getPageImageUrls(blockMap, {
      mapImageUrl: (url: string, block: Block) => {
        if (block.format?.page_cover) {
          return mapImageUrl(url, block);
        }
      },
    }) || [];

  const keys = Object.keys(blockMap?.block || {});
  const block = blockMap?.block?.[keys[0]]?.value as PageBlock;

  const tableOfContent =
    getPageTableOfContents(block, blockMap)?.map(
      ({ id, text, indentLevel }) => ({
        id: uuidToId(id),
        text,
        indentLevel,
      })
    ) || [];

  return json(
    { post, blockMap, coverImage, tableOfContent },
    {
      headers: {
        "Cache-Control": "public, stale-while-revalidate=60",
      },
    }
  );
};

export default BlogPost;