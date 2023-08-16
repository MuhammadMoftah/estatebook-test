interface Blog {
  id: number
  title: string
  slug: string
  short_description: string
  description: string
  keywords: string
  blog_image: string
  images: any[]
  is_liked: boolean
  likes_count: number | string
  created_at: string
  from_time: string
  category: Category
}

interface Category {
  id: number
  name: string
  status: string | boolean
}

type BlogFilterKey = 'title' | 'category.id'

type BlogAllowedInclude =
  | 'category'
  | 'categoryCount'
  | 'author'
  | 'authorCount'
  | 'comments'
  | 'commentsCount'
  | 'comments.commenter'
  | 'comments.children'
  | 'likes'
  | 'likesCount'
  | 'likes.liker'
