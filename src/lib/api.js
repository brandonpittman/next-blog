import fs from "fs";
import { join, basename } from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import globby from "globby";

const postsDirectory = join(process.cwd(), "content/posts");

export function queryPost(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}

export const getPostSlugs = () =>
  globby.sync(`${postsDirectory}/**.md`).map((path) => basename(path));

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "timeToRead") {
      items[field] = readingTime(content).text;
    }

    if (data[field]) {
      switch (field) {
        case "tags":
          items[field] = JSON.stringify(data[field]);
          break;
        case "date":
          items[field] = data[field].toISOString();
          break;
        default:
          items[field] = data[field];
      }
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"));
  return posts;
}

export function getAllTags() {
  const slugs = getPostSlugs();
  const tags = slugs
    .map((slug) => getPostBySlug(slug, ["tags"]))
    .reduce((acc, val) => [...acc, JSON.parse(val.tags)], [])
    .flat();

  return Array.from(new Set(tags));
}
