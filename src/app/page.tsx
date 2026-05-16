import HomeApp from "@/components/HomeApp";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, body, "author": author->name, "categories": categories[]->title}`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

export default async function IndexPage() {
  const posts = (await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)) ?? [];

  const enriched = posts.map((p) => {
    const imageUrl = p.image ? urlFor(p.image)?.width(1200).height(700).url() ?? null : null;
    return { ...(p as any), imageUrl };
  });

  return <HomeApp posts={enriched} />;
}