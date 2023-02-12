import { Card, CardHeader, CardBody, CardFooter, Box, Flex, Avatar, Heading, IconButton, Button, Image, Text } from "@chakra-ui/react"
import { BiLike, BiShare, BiChat } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface PostHeaderProps {
  username: string
  title: string
  post: string
};

export const PostHeader = ({ username, title, post }: PostHeaderProps) => {
  return (
    <Card maxW='md'>
    <CardHeader>
      <Flex>
        <Flex flex='1' gap='4' flexWrap='wrap'>
          <Avatar name={username} src='https://avatars.githubusercontent.com/u/65411020?v=4' />
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
      alt='Chakra UI'
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
      <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
        Like
      </Button>
      <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
        Comment
      </Button>
      <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
        Share
      </Button>
    </CardFooter>
    </Card>
)
}
