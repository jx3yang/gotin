import { CommentTree } from "./CommentTree"
import { Comment } from "../types"
import { Card } from "@chakra-ui/react"

interface PostBodyProps {
  comments: Comment[]
}

export const PostBody = ({ comments }: PostBodyProps) => {
  return (
    <Card p={2} boxShadow='none'>
      <CommentTree comments={comments} />
    </Card>
  )
}
