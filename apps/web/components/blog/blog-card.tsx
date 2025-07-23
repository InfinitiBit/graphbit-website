import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-gray-300">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl font-bold leading-tight group-hover:text-gray-800 transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed">
            {post.description || post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-3.5 w-3.5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
            {post.date && (
              <span className="text-gray-400">•</span>
            )}
            {post.date && (
              <span>{post.date}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 