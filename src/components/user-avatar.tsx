// import { User } from "@prisma/client"

// import { CognitoUser } from "@aws-amplify/auth";
import { AvatarProps } from '@radix-ui/react-avatar';

import { Icons } from '@src/components/default-icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@src/components/ui/default-avatar';

export interface User {
  image?: string | null;
  name?: string | null;
}
interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt='Picture' src={user.image} />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user.name}</span>
          <Icons.user className='h-6 w-6' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
