import { Card, CardHeader, CardBody, CardFooter, Box, Flex, Avatar, Heading, IconButton, Button, Image, Text } from "@chakra-ui/react"
import { useContext } from "react";
import { BiChat } from 'react-icons/bi'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { PostLikeContext, PostGetStatsContext, PostUserHasLikedContext } from '../context/post-context'
import { User } from '../types'

interface PostHeaderProps {
  author: User
  post: string
  focusInput: () => void
  toggleComments: () => void
  index: number
};

export const PostHeader = ({ author, post, focusInput, toggleComments, index }: PostHeaderProps) => {
  const { username, title, avatar } = author;
  const { id: avatarId, url: avatarUrl } = avatar;
  const userHasLiked = useContext(PostUserHasLikedContext);
  const likeFunction = useContext(PostLikeContext);
  const getStats = useContext(PostGetStatsContext);
  const stats = getStats(index);

  return (
    <Card boxShadow={'none'}>
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' flexWrap='wrap'>
            <Avatar name={avatarId} src={avatarUrl} />
            <Box textAlign='left'>
              <Heading size='sm'>{username}</Heading>
              <Text>{title}</Text>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody pt='0' pb='0'>
        <Text textAlign='left'>
          {post}
        </Text>
      </CardBody>

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Flex width={'100%'}>
          {stats.likes > 0 &&
            <Flex justifyContent={'center'} alignItems='center'>
              <Box color={'blue.300'}><AiFillLike size={'12px'} /></Box>
              <Text pl='1' fontSize={'xs'}>{stats.likes}</Text>
            </Flex>
          }
          <Flex justifyContent={'center'} alignItems='center' ml='auto'>
            <Box><BiChat size={'12px'} /></Box>
            <Text pl='1' fontSize={'xs'} cursor='pointer' onClick={toggleComments}>{stats.numComments} comments</Text>
          </Flex>
        </Flex>
        <Box borderTop='1px' borderColor={'gray.300'} width='100%'>
          <Flex flex='1' pt='2'>
            <Button
              flex='1'
              variant='ghost'
              leftIcon={userHasLiked(index) ? <Box color={'blue.300'}><AiFillLike /></Box> : <AiOutlineLike />}
              onClick={() => likeFunction(index)}
            >
              Like
            </Button>
            <Button
              flex='1'
              variant='ghost'
              leftIcon={<BiChat />}
              onClick={focusInput}
            >
              Comment
            </Button>
          </Flex>
        </Box>
      </CardFooter>
    </Card>
  )
}
