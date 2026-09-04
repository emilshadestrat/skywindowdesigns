import { config, collection, fields } from "@keystatic/core";

/**
 * Sky Window Design & More — Keystatic CMS (GitHub mode).
 *
 * One YAML file per post at `content/blog/<slug>/index.yaml`. The directory
 * name is the URL slug (/blog/<slug>).
 *
 * The blog was a placeholder before this — `client/src/pages/Blog.tsx` said so
 * in its own comment, and the live page told visitors to "check back soon".
 * There was no article route and no post data, so nothing was migrated: this is
 * a new blog rather than a move. See BLOG_CMS.md.
 */

const CATEGORIES = [
  "Buying Guides",
  "Care & Maintenance",
  "Design Ideas",
  "Product Guides",
  "Shutters",
  "Shades & Blinds",
] as const;

export default config({
  storage: {
    kind: "github",
    repo: { owner: "emilshadestrat", name: "skywindowdesigns" },
  },
  ui: { brand: { name: "Sky Window Design" } },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/blog/*/",
      format: { data: "yaml" },
      columns: ["title", "publishDate", "status"],
      entryLayout: "form",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { length: { min: 1, max: 300 } } },
          slug: {
            label: "URL slug",
            description:
              "This is the live URL (/blog/<slug>). Changing it on a published post breaks the indexed URL.",
          },
        }),
        status: fields.select({
          label: "Status",
          description: "Draft is never public, whatever its date.",
          options: [
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
          ],
          defaultValue: "draft",
        }),
        publishDate: fields.date({
          label: "Publish date",
          description:
            "A future date schedules the post: it stays a 404 until the date passes, then appears on its own.",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          options: CATEGORIES.map(c => ({ label: c, value: c })),
          defaultValue: "Design Ideas",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Shown on the blog index and used as the meta description.",
          multiline: true,
          validation: { isRequired: true },
        }),
        metaTitle: fields.text({ label: "SEO title", description: "Falls back to the title." }),
        readTime: fields.text({ label: "Read time", defaultValue: "5 min read" }),
        author: fields.text({ label: "Author", defaultValue: "Sky Window Design & More" }),
        body: fields.array(
          fields.object({
            type: fields.select({
              label: "Block",
              options: [
                { label: "Paragraph", value: "p" },
                { label: "Heading", value: "h2" },
                { label: "Subheading", value: "h3" },
                { label: "Bulleted list", value: "ul" },
              ],
              defaultValue: "p",
            }),
            text: fields.text({ label: "Text", multiline: true, description: "For paragraphs and headings." }),
            items: fields.array(fields.text({ label: "Item" }), {
              label: "List items",
              description: "Used only when Block is a bulleted list.",
              itemLabel: props => props.value.slice(0, 60),
            }),
          }),
          {
            label: "Body",
            itemLabel: props =>
              `${props.fields.type.value.toUpperCase()} — ${(props.fields.text.value || props.fields.items.elements[0]?.value || "").slice(0, 55)}`,
          },
        ),
      },
    }),
  },
});
