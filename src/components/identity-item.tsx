import { EnumDiaryType } from '@src/API';
import Link from 'next/link';

import Skeleton from './default-skeleton';
import { IdentityOperations } from './identity-operations';
import { UserAvatar } from './user-avatar';

export interface IdentityItemProps {
  id?: string;
  diaryId: string;
  diaryName?: string;
  diaryOwnerId: string;
  diarySchoolName?: string;
  diaryType?: EnumDiaryType;
  diaryOwnerName: string;
}

export function IdentityItem({
  diaryId,
  diaryOwnerId,
  diarySchoolName,
  diaryOwnerName,
}: IdentityItemProps) {
  return (
    <div className='flex items-start justify-between p-4'>
      <div className='grid grid-cols-2'>
        <UserAvatar
          user={{ name: diaryOwnerId || null, image: null }}
          className='border-muted h-10 w-10 border-2'
        />

        <div className='grid gap-1'>
          <Link
            href={`/diary/${diaryId}`}
            className='font-semibold hover:underline'
          >
            {diaryOwnerName}
          </Link>
          <div>
            <p className='text-muted-foreground text-sm'>{diarySchoolName}</p>
          </div>
        </div>
      </div>
      <IdentityOperations post='asd' />
    </div>
  );
}

IdentityItem.Skeleton = function IdentityItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  );
};
