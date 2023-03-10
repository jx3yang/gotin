import { Avatar, Box, Flex, Text, Card, CardBody, CardHeader, Stack, useColorMode, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { PostCommentLikeContext, PostUserLikedCommentsContext } from '../../context/post-context';
import { Avatar as AvatarType, Comment } from '../../types';

interface CommentCardProps {
  comment: Comment
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const { id, author, content } = comment;
  const { username, title } = author;
  const likeComment = useContext(PostCommentLikeContext);
  const userLikedComments = useContext(PostUserLikedCommentsContext);

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
              likeComment(id)
            }}
          >
            <Text
              fontSize='xs'
              fontWeight={'bold'}
              color={userLikedComments.has(id) ? 'blue.300' : ''}
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
          >
            <Text fontSize='xs' fontWeight={'bold'}> Reply </Text>
          </Button>
        </Flex>
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
}

export const CommentTree = ({ comments }: CommentTreeProps) => (
  comments.length > 0
    ? <Stack spacing={'0'}>
      {comments.slice(0).reverse().map((comment, index) => (
        <Flex key={`${index}`}>
          <AvatarBox avatar={comment.author.avatar} />
          <Stack key={`${index}`} p={0} spacing='0'>
            <CommentCard comment={comment} key={`${index}`} />
            {comment.replies.length > 0 &&
              <CommentTree comments={comment.replies} />
            }
          </Stack>
        </Flex>
      ))}
    </Stack>
  : <></>
)
