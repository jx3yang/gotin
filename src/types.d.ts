export type Avatar = {
  id: string
  url: string
}

export type User = {
  username: string
  title: string
  avatar: Avatar
}

export type Comment = {
  author: User
  content: string
  replies: Comment[]
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
