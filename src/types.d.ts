export type Avatar = {
  id: string
  url: string
}

export type User = {
  username: string
  title: string
  avatar: Avatar
}

export type CommentStats = {
  likes: number
}

export type Comment = {
  id: number
  author: User
  content: string
  replies: Comment[]
  stats: CommentStats
}

export type PostStats = {
  likes: number
  numComments: number
}

export type PostData = {
  author: User
  post: string
  stats: PostStats
  comments: Comment[]
}
