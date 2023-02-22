import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import { PostController } from "../lib/post-controller"
import { PostBody } from "../PostBody"
import { PostHeader } from "../PostHeader"

interface PostProps {
  postController: PostController
}

export const Post = ({ postController }: PostProps) => {
  return (
    <Card maxW={600} minW={600}>
      <CardHeader p={0}>
        <PostHeader author={postController.getAuthor()} post={postController.getPost()} />
      </CardHeader>
      <CardBody p={0}>
        <PostBody comments={postController.getCurrentComments()} />
      </CardBody>
    </Card>
  )
}
