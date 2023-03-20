import { Avatar, Box, Flex, Text, Card, CardBody, CardHeader, Stack, useColorMode, Button, Input } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { PostCommentLikeContext, PostReplyContext, PostUserLikedCommentsContext } from '../../context/post-context';
import { Avatar as AvatarType, Comment } from '../../types';

interface CommentCardProps {
  comment: Comment
  index: number
}

const CommentCard = ({ comment, index }: CommentCardProps) => {
  const { id, author, content } = comment;
  const { username, title } = author;
  const [isShowReply, setShowReply] = useState(false);
  const likeComment = useContext(PostCommentLikeContext);
  const userLikedComments = useContext(PostUserLikedCommentsContext);
  const [replyValue, setReplyValue] = useState("");
  const replyFunction = useContext(PostReplyContext);

  const showReply = () => {
    setShowReply(true);
  }

  const hideReply = () => {
    setShowReply(false);
  }

  return (
    <Card maxW='full' boxShadow='none' borderRadius='0' p='2' pt='4'>
      <CardHeader p='0'>
        <Flex flex='1' flexWrap='wrap' gap='2' alignContent='center' alignItems='center'>
          <Box textAlign='left' fontWeight={'semibold'} lineHeight='tight'>
            <Text fontSize='sm'>{username}</Text>
          </Box>
          <Box textAlign='left' fontWeight='light' lineHeight={'tight'}>
            <Text fontSize='xs'>{title}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody p='0' pt='2'>
        <Text fontSize='sm' textAlign='left'>
          {content}
        </Text>
        <Flex gap='2' alignItems={'center'} pt='2'>
          <Button
            variant={'outline'} p='0' height={'5'} m='0'
            onClick={() => {
              likeComment(id, index)
            }}
          >
            <Text
              fontSize='xs'
              fontWeight={'bold'}
              color={userLikedComments(index).has(id) ? 'blue.300' : ''}
            >
              Like
            </Text>
          </Button>
          {comment.stats.likes > 0 &&
          <Flex alignItems={'center'} gap='1'>
            <Box color={'blue.300'}><AiFillLike size={'12px'} /></Box>
            <Text fontSize='xs' fontWeight={'light'}> {comment.stats.likes} </Text>
          </Flex>
          }
          <Text fontSize='xs' fontWeight={'light'}>|</Text>
          <Button
            variant={'ghost'} p='0' height={'5'} m='0'
            onClick={showReply}
          >
            <Text fontSize='xs' fontWeight={'bold'}> Reply </Text>
          </Button>
        </Flex>
        {isShowReply &&
          <Box width='250px' pt='4'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                replyFunction(replyValue, index, id);
                setReplyValue("");
                hideReply();
              }}
              >
              <Input
                height={'30px'}
                placeholder="Add a reply..."
                size={'md'}
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
              />
            </form>
          </Box>
        }
      </CardBody>
    </Card>
  )
}

interface AvatarBoxProps {
  avatar: AvatarType
}

const AvatarBox = ({ avatar }: AvatarBoxProps) => {
  const { id, url } =  avatar;
  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection={'column'} pt='12px' pl='2' pb='2'>
      <Avatar name={id} src={url} height='24px' width='24px' />
      <Box backgroundColor={colorMode === 'dark' ? 'gray.500' : 'gray.200'} width='2px' mt='2' ml='11px' height='100%' />
    </Flex>
  )
}

interface CommentTreeProps {
  comments: Comment[]
  index: number
}

export const CommentTree = ({ comments, index }: CommentTreeProps) => (
  comments.length > 0
    ? <Stack spacing={'0'}>
      {comments.slice(0).reverse().map((comment, _index) => (
        <Flex key={`${_index}`}>
          <AvatarBox avatar={comment.author.avatar} />
          <Stack key={`${_index}`} p={0} spacing='0'>
            <CommentCard comment={comment} key={`${_index}`} index={index} />
            {comment.replies.length > 0 &&
              <CommentTree comments={comment.replies} index={index} />
            }
          </Stack>
        </Flex>
      ))}
    </Stack>
  : <></>
)
