// import { User } from "@prisma/client"

// import { CognitoUser } from "@aws-amplify/auth";
import { AvatarProps } from '@radix-ui/react-avatar';

// import { Icons } from '@src/components/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@src/components/ui/avatar-box';

export interface User {
  image?: string | null;
  name?: string | null;
}
interface PartyAvatarProps extends AvatarProps {
  party: Pick<User, 'image' | 'name'>;
}

export function PartyAvatar({ party, ...props }: PartyAvatarProps) {
  return (
    <Avatar {...props}>
      {party.image ? (
        <AvatarImage alt='Picture' src={party.image} />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{party.name}</span>
          {/* <Icons.party className='h-4 w-4' /> */}
          {party.name ? party.name.charAt(0).toUpperCase() : '?'}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
