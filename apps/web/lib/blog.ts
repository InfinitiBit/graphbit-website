import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { format } from 'date-fns';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  content?: string;
  excerpt?: string;
}

const BLOG_POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

// Ensure blog directory exists
export function ensureBlogDirectory() {
  if (!fs.existsSync(BLOG_POSTS_DIRECTORY)) {
    fs.mkdirSync(BLOG_POSTS_DIRECTORY, { recursive: true });
  }
}

export function getAllBlogPosts(): BlogPost[] {
  ensureBlogDirectory();
  
  if (!fs.existsSync(BLOG_POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_POSTS_DIRECTORY);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(BLOG_POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Calculate reading time (rough estimate: 200 words per minute)
      const wordCount = content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date ? format(new Date(data.date), 'MMMM dd, yyyy') : '',
        author: data.author || 'GraphBit Team',
        readTime: `${readTime} min read`,
        tags: data.tags || [],
        excerpt: data.excerpt || content.substring(0, 200) + '...',
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  ensureBlogDirectory();
  
  try {
    const fullPath = path.join(BLOG_POSTS_DIRECTORY, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown content
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date ? format(new Date(data.date), 'MMMM dd, yyyy') : '',
      author: data.author || 'GraphBit Team',
      readTime: `${readTime} min read`,
      tags: data.tags || [],
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

export function getBlogPostSlugs(): string[] {
  ensureBlogDirectory();
  
  if (!fs.existsSync(BLOG_POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_POSTS_DIRECTORY);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
} 