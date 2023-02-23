import { CommentTree } from "./CommentTree"
import { Comment, User } from "../types"
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Input } from "@chakra-ui/react"
import { RefObject, useContext, useState } from "react"
import { PostCommentContext } from "../context/post-context"

interface PostBodyProps {
  comments: Comment[]
  user: User
  inputRef: RefObject<HTMLInputElement>
}

export const PostBody = ({ user, comments, inputRef }: PostBodyProps) => {
  const addComment = useContext(PostCommentContext);
  const [inputValue, setInputValue] = useState("");

  return (
    <Card p={2} boxShadow='none'>
      <CardHeader pt='0'>
        <Flex alignItems={'center'} gap='2'>
          <Box><Avatar id={user.avatar.id} src={user.avatar.url} width='44px' height='44px' /></Box>
          <Box width={'100%'}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue != "") {
                  addComment(inputValue);
                }
                setInputValue("");
              }}
              >
              <Input
                ref={inputRef}
                placeholder="Add a comment..."
                size={'md'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody pt='0'>
        <CommentTree comments={comments} />
      </CardBody>
    </Card>
  )
}
