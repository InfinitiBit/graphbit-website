
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
  categories: string[];
  content?: string;
  excerpt?: string;
  featured?: boolean;
  views?: number;
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

      // Calculate reading time (average 200 words per minute)
      const wordCount = content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      // Generate excerpt if not provided
      const excerpt = data.excerpt || content
        .replace(/[#*`>[\]]/g, '') // Remove markdown syntax
        .substring(0, 160) + '...';

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || excerpt,
        date: data.date ? format(new Date(data.date), 'MMMM dd, yyyy') : '',
        author: data.author || 'GraphBit Team',
        readTime: `${readTime} min read`,
        tags: data.tags || [],
        categories: data.categories || data.tags || [], // Use categories or fallback to tags
        excerpt,
        featured: data.featured || false,
        views: data.views || 150, // Default views
      };
    });

  // Sort posts by date (newest first), then by featured status
  return allPostsData.sort((a, b) => {
    // Featured posts first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then by date
    if (a.date < b.date) return 1;
    return -1;
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

    // Process markdown content with enhanced formatting
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Generate excerpt
    const excerpt = data.excerpt || content
      .replace(/[#*`>[\]]/g, '')
      .substring(0, 160) + '...';

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || excerpt,
      date: data.date ? format(new Date(data.date), 'MMMM dd, yyyy') : '',
      author: data.author || 'GraphBit Team',
      readTime: `${readTime} min read`,
      tags: data.tags || [],
      categories: data.categories || data.tags || [], // Use categories or fallback to tags
      content: contentHtml,
      featured: data.featured || false,
      views: data.views || 150,
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

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

export function getPopularTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tagCounts: { [key: string]: number } = {};
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .map(([tag]) => tag)
    .slice(0, 10);
}
