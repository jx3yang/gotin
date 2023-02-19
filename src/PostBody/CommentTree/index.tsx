import { Avatar, Box, Flex, Text, Card, CardBody, CardHeader, Stack } from '@chakra-ui/react';
import { Comment } from '../../types';

interface CommentCardProps {
  comment: Comment
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const { author, content } = comment;
  const { avatar, username, title } = author;
  const { id: avatarId, url: avatarUrl } = avatar;

  return (
    <Card maxW='full' boxShadow='none' borderRadius='0' p='2' pl='4'>
      <CardHeader p='0'>
        <Flex flex='1' flexWrap='wrap' gap='2' alignContent='center' alignItems='center'>
          <Avatar name={avatarId} src={avatarUrl} height='18px' width='18px' />
          <Box textAlign='left' fontWeight={'semibold'} lineHeight='tight'>
            <Text fontSize='sm'>{username}</Text>
          </Box>
          <Box textAlign='left' fontWeight='light' lineHeight={'tight'}>
            <Text fontSize='xs'>{title}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody p='0'>
        <Text fontSize='sm' textAlign='left'>
          {content}
        </Text>
      </CardBody>
    </Card>
  )
}

interface CommentTreeProps {
  comments: Comment[]
}

export const CommentTree = ({ comments }: CommentTreeProps) => (
  <Stack>
    {comments.map((comment, index) => (
      <Stack key={`${index}`} p={0}>
        <CommentCard comment={comment} key={`${index}`} />
        {comment.replies.length > 0 &&
          <Flex>
            <Box backgroundColor='gray.300' width={'2px'} ml='6'></Box>
            <CommentTree comments={comment.replies} />
          </Flex>
        }
      </Stack>
    ))}
  </Stack>
)
