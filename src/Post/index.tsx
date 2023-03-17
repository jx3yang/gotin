import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../context/user-context"
import { PostController } from "../lib/post-controller"
import { PostBody } from "../PostBody"
import { PostHeader } from "../PostHeader"

interface PostProps {
  postController: PostController
  index: number
}

export const Post = ({ postController, index }: PostProps) => {
  const user = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showComments, setShowComments] = useState(false);

  const focusInput = () => {
    if (!showComments) {
      setShowComments(true);
    }
    inputRef.current?.focus();
  }

  const toggleComments = () => {
    setShowComments(value => !value);
  }

  useEffect(() => {
    setShowComments(false);
  }, [user])

  return (
    <Card width={{ base: '100%', md: 600 }}>
      <CardHeader p={0}>
        <PostHeader
          author={postController.getAuthor()}
          post={postController.getPost()}
          focusInput={focusInput}
          toggleComments={toggleComments}
          index={index}
        />
      </CardHeader>
      <CardBody p={0}>
        {showComments && <PostBody
          comments={postController.getCurrentComments()}
          user={user}
          inputRef={inputRef}
          index={index}
        />}
      </CardBody>
    </Card>
  )
}
