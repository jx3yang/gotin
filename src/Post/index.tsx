import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import { PostBody } from "../PostBody"
import { PostHeader } from "../PostHeader"
import { Comment, User } from "../types"

interface PostProps {
  author: User
  post: string
  comments: Comment[]
}

export const Post = ({ author, post, comments }: PostProps) => {
  return (
    <Card maxW={600}>
      <CardHeader p={0}>
        <PostHeader author={author} post={post} />
      </CardHeader>
      <CardBody p={0}>
        <PostBody comments={comments} />
      </CardBody>
    </Card>
  )
}
