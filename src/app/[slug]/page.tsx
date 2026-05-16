import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { notFound } from "next/navigation";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = (await params) as { slug: string };
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug: resolvedParams.slug }, options);
  if (!post) return notFound();

  // Use Sanity image if available, otherwise fall back to Unsplash based on first category
  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

  const firstCategory = Array.isArray(post.categories) && post.categories.length ? (post.categories[0] as string) : null;
  const categoryQuery = firstCategory ? (firstCategory.toLowerCase().includes("tech") ? "technology" : firstCategory.toLowerCase()) : "news";
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(700).url() ?? null
    : null;

  // If no Sanity image, use an embedded SVG data URI as a fallback to avoid external fetch timeouts
  const dataUriFromText = (text: string, w = 1200, h = 700) => {
    const hash = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const hue = hash % 360;
    const bg = `hsl(${hue} 70% 40%)`;
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='system-ui, -apple-system, Segoe UI, Roboto, sans-serif'>${(post.title || resolvedParams.slug).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text></svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  };

  const finalImage = postImageUrl ?? dataUriFromText(post.title ?? resolvedParams.slug);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {/* images intentionally removed */}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}