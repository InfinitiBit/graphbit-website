import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full transition-all duration-200 hover:border-gray-300 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-100 text-xs text-gray-700 hover:bg-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl font-bold leading-tight transition-colors group-hover:text-gray-800">
            {post.title}
          </CardTitle>
          <CardDescription className="leading-relaxed text-gray-600">
            {post.description || post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="h-3.5 w-3.5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
            {post.date && <span className="text-gray-400">•</span>}
            {post.date && <span>{post.date}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
