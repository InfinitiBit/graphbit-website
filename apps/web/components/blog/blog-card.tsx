
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, ArrowRight, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 mobile-card">
        {/* Featured image */}
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden responsive-image-container">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
            <div className="text-2xl sm:text-4xl opacity-50">📝</div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="responsive-card">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="responsive-heading-md mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900">
            {post.title}
          </h3>

          {/* Description */}
          <p className="responsive-text text-gray-600 mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </article>
    </Link>
  );
}
