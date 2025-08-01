
import Link from 'next/link';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const getGradientForTag = () => {
    const gradients = {
      'Getting Started': 'from-green-50 via-emerald-50 to-teal-50',
      'Tutorial': 'from-green-50 via-emerald-50 to-teal-50',
      'Best Practices': 'from-purple-50 via-indigo-50 to-blue-50',
      'Architecture': 'from-purple-50 via-indigo-50 to-blue-50',
      'Advanced': 'from-orange-50 via-red-50 to-pink-50',
      'Performance': 'from-orange-50 via-red-50 to-pink-50',
      'Tracing': 'from-orange-50 via-red-50 to-pink-50',
      default: 'from-blue-50 via-purple-50 to-pink-50'
    };
    
    const primaryTag = post.tags[0];
    return gradients[primaryTag as keyof typeof gradients] || gradients.default;
  };

  const getIconForCategory = () => {
    const icons = {
      'Getting Started': '🚀',
      'Tutorial': '📚',
      'Best Practices': '⭐',
      'Architecture': '🏗️',
      'Advanced': '🔥',
      'Performance': '⚡',
      'Tracing': '🔍',
      default: '📝'
    };
    
    const primaryTag = post.tags[0];
    return icons[primaryTag as keyof typeof icons] || icons.default;
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className={`group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? 'ring-2 ring-blue-500/20' : ''}`}>
        {/* Featured image */}
        <div className={`${featured ? 'aspect-[2/1]' : 'aspect-[16/9]'} bg-gradient-to-br ${getGradientForTag()} overflow-hidden relative`}>
          <div className="w-full h-full flex items-center justify-center relative">
                          <div className={`${featured ? 'text-5xl' : 'text-3xl'} opacity-60`}>
                {getIconForCategory()}
            </div>
            {featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-600 text-white text-xs font-medium">Featured</Badge>
              </div>
            )}
            {post.views && (
              <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
                                  <ArrowRight className="h-3 w-3" />
                <span>{post.views}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className={`${featured ? 'p-8' : 'p-6'}`}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className={`${featured ? 'text-2xl' : 'text-lg'} font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-foreground`}>
            {post.title}
          </h3>

          {/* Description */}
          <p className={`${featured ? 'text-base' : 'text-sm'} text-muted-foreground mb-6 line-clamp-3 leading-relaxed`}>
            {post.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
              <span className="mr-1">Read more</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </article>
    </Link>
  );
}
