import { Avatar, User } from '../types'
import usersvg from '../assets/theuser.svg'
import user0 from '../assets/user_0.svg'
import user1 from '../assets/user_1.svg'
import user2 from '../assets/user_2.svg'
import user3 from '../assets/user_3.svg'
import user4 from '../assets/user_4.svg'
import user5 from '../assets/user_5.svg'
import user6 from '../assets/user_6.svg'
import user7 from '../assets/user_7.svg'
import user8 from '../assets/user_8.svg'
import user9 from '../assets/user_9.svg'
import user10 from '../assets/user_10.svg'
import user11 from '../assets/user_11.svg'
import user12 from '../assets/user_12.svg'
import user13 from '../assets/user_13.svg'
import user14 from '../assets/user_14.svg'
import user15 from '../assets/user_15.svg'
import user16 from '../assets/user_16.svg'
import user17 from '../assets/user_17.svg'
import user18 from '../assets/user_18.svg'
import user19 from '../assets/user_19.svg'

const theAvatar: Avatar = {
  id: 'theUser',
  url: usersvg,
};

export const theUser: User = {
  username: 'You',
  title: 'ENGL108D Student',
  avatar: theAvatar,
};

export const theUserAnon: User = {
  username: 'You',
  title: 'Anon',
  avatar: theAvatar,
}

const allAvatars: Avatar[] =
[user0, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19]
.map((url, index) => ({ id: `user${index}`, url }));

const userNames: string[] = [
  'James Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Wilson', 'Christopher Davis',
  'Jennifer Garcia', 'William Martinez', 'Elizabeth Anderson', 'David Taylor', 'Maria Hernandez',
];

const anons: string[] = [
  '9416', '5825', '9677', '9387', '2577',
  '4782', '3129', '5090', '2789', '5743'
].map(v => `User ${v}`);

export const nonAnonUsers: User[] = userNames.map((username, index) => ({
  username,
  title: 'Student',
  avatar: allAvatars[index],
}));

export const anonUsers: User[] = anons.map((username, index) => ({
  username,
  title: 'Anon',
  avatar: allAvatars[index + 10],
}));

const allUserNames = [...userNames, ...anons];

export const allUsers: User[] = allAvatars.map((avatar, index) => ({
  // username: `User ${index}`,
  username: allUserNames[index],
  title: 'Student',
  avatar,
}));
