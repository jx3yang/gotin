import { Card, CardHeader, CardBody, CardFooter, Box, Flex, Avatar, Heading, IconButton, Button, Image, Text } from "@chakra-ui/react"
import { useContext } from "react";
import { BiChat } from 'react-icons/bi'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { PostLikeContext, PostStatsContext, PostUserHasLikedContext } from '../context/post-context'
import { User } from '../types'

interface PostHeaderProps {
  author: User
  post: string
  focusInput: () => void
};

export const PostHeader = ({ author, post, focusInput }: PostHeaderProps) => {
  const { username, title, avatar } = author;
  const { id: avatarId, url: avatarUrl } = avatar;
  const userHasLiked = useContext(PostUserHasLikedContext);
  const likeFunction = useContext(PostLikeContext);
  const stats = useContext(PostStatsContext);

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
      <CardBody>
        <Text textAlign='left'>
          {post}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src='https://wonderfulengineering.com/wp-content/uploads/2014/05/train-pictures-14.jpg'
        alt='trains'
      />

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
          <Flex justifyContent={'center'} alignItems='center'>
            <Box color={'blue.300'}><AiFillLike size={'12px'} /></Box>
            <Text pl='1' fontSize={'xs'}>{stats.likes}</Text>
          </Flex>
          <Flex justifyContent={'center'} alignItems='center' ml='auto'>
            <Box><BiChat size={'12px'} /></Box>
            <Text pl='1' fontSize={'xs'}>{stats.numComments} comments</Text>
          </Flex>
        </Flex>
        <Box borderTop='1px' borderColor={'gray.300'} width='100%'>
          <Flex flex='1' pt='2'>
            <Button
              flex='1'
              variant='ghost'
              leftIcon={userHasLiked ? <Box color={'blue.300'}><AiFillLike /></Box> : <AiOutlineLike />}
              onClick={likeFunction}
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
