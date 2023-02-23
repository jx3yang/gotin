import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import { useContext, useRef } from "react"
import { UserContext } from "../context/user-context"
import { PostController } from "../lib/post-controller"
import { PostBody } from "../PostBody"
import { PostHeader } from "../PostHeader"

interface PostProps {
  postController: PostController
}

export const Post = ({ postController }: PostProps) => {
  const user = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  }

  return (
    <Card maxW={600} minW={600}>
      <CardHeader p={0}>
        <PostHeader
          author={postController.getAuthor()}
          post={postController.getPost()}
          focusInput={focusInput}
        />
      </CardHeader>
      <CardBody p={0}>
        <PostBody
          comments={postController.getCurrentComments()}
          user={user}
          inputRef={inputRef}
        />
      </CardBody>
    </Card>
  )
}
