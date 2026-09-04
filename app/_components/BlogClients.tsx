"use client";

// Design philosophy: the blog reuses the site's existing Layout and editorial
// type treatment, so a post looks like the rest of the site rather than like a
// CMS bolted on. Data arrives as props from the server routes — these
// components never read the filesystem.
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { CONTACT } from "@/lib/siteData";
import { BookOpen, ChevronRight, Phone } from "lucide-react";
import type { BlogBlock, BlogPost } from "../../lib/blog";

type Card = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "readTime" | "displayDate">;

const HEADING_FONT = "Fraunces,Georgia,serif";

export function BlogIndexClient({ posts }: { posts: Card[] }) {
  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Blog" }]}>
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[760px]">
          <span className="eyebrow">Blog &amp; Resources</span>
          <h1
            className="font-[Fraunces,Georgia,serif] font-extrabold leading-tight text-slate-900 mb-6"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Window Treatment Tips &amp; Design Ideas
          </h1>
          <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8 max-w-[600px]">
            Practical guides on choosing the right window treatments, caring for your shades and
            shutters, and making the most of your Gulf Coast home&rsquo;s natural light.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">Get Quote</Link>
            <a href={CONTACT.phoneHref} className="btn-outline">
              <Phone size={15} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-[860px]">
          {posts.length === 0 ? (
            <div className="text-center max-w-[560px] mx-auto">
              <BookOpen size={28} className="mx-auto mb-5 text-slate-400" />
              <h2 className="font-[Fraunces,Georgia,serif] text-2xl font-bold text-slate-900 mb-3">
                Our first articles are on the way
              </h2>
              <p className="text-slate-600 mb-7">
                In the meantime, our team is happy to answer window treatment questions directly.
              </p>
              <Link href="/contact" className="btn-primary">Get Quote</Link>
            </div>
          ) : (
            <ul className="grid gap-8 list-none p-0 m-0">
              {posts.map(post => (
                <li key={post.slug} className="border-b border-slate-200 pb-8 last:border-b-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 mb-3">
                    <span className="text-slate-700 font-semibold">{post.category}</span>
                    <span>{post.displayDate}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2
                    className="font-[Fraunces,Georgia,serif] font-bold text-slate-900 leading-snug mb-3"
                    style={{ fontSize: "clamp(1.3rem, 1.1rem + 0.8vw, 1.7rem)" }}
                  >
                    <Link href={`/blog/${post.slug}`} className="hover:text-slate-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4 max-w-[640px]">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-slate-600"
                  >
                    Read the article
                    <ChevronRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "h2") {
    return (
      <h2
        className="font-[Fraunces,Georgia,serif] font-bold text-slate-900 leading-snug mt-11 mb-4"
        style={{ fontSize: "clamp(1.25rem, 1.05rem + 0.7vw, 1.6rem)" }}
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">{block.text}</h3>;
  }
  if (block.type === "ul") {
    return (
      <ul className="my-5 pl-5 flex flex-col gap-2 text-slate-700">
        {block.items.map(item => (
          <li key={item} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-[1.0625rem] leading-[1.75] text-slate-700 mb-5">{block.text}</p>;
}

export function BlogArticleClient({ post }: { post: BlogPost }) {
  return (
    <Layout
      breadcrumb={[{ label: "Home", url: "/" }, { label: "Blog", url: "/blog" }, { label: post.title }]}
    >
      <article className="py-14 bg-white">
        <div className="container max-w-[720px]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 mb-4">
            <span className="text-slate-700 font-semibold">{post.category}</span>
            <span>{post.displayDate}</span>
            <span>{post.readTime}</span>
          </div>
          <h1
            className="font-[Fraunces,Georgia,serif] font-extrabold text-slate-900 leading-tight mb-6"
            style={{ fontSize: "clamp(1.75rem, 1.4rem + 1.9vw, 2.7rem)", letterSpacing: "-0.022em" }}
          >
            {post.title}
          </h1>
          <p className="text-[1.15rem] leading-relaxed text-slate-600 mb-10 pb-8 border-b border-slate-200">
            {post.excerpt}
          </p>

          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="font-[Fraunces,Georgia,serif] text-xl font-bold text-slate-900 mb-3">
              Ready to plan your windows?
            </h2>
            <p className="text-slate-600 mb-6 max-w-[560px]">
              We bring samples to your home and measure every opening in place, so you can compare
              options in the room they are for.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Get Quote</Link>
              <a href={CONTACT.phoneHref} className="btn-outline">
                <Phone size={15} />
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <p className="mt-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-slate-600">
              All articles
            </Link>
          </p>
        </div>
      </article>
    </Layout>
  );
}

void HEADING_FONT;
