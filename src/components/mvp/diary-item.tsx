import { EnumDiaryType } from '@src/API';
import Link from 'next/link';

import { DiaryOperations } from './diary-operations';
import Skeleton from '../default-skeleton';
import { UserAvatar } from '../user-avatar';

export interface DiaryItemProps {
  id?: string;
  diaryId: string;
  diaryName?: string;
  diaryOwnerId: string;
  diarySchoolName: string;
  diaryType?: EnumDiaryType;
  diaryOwnerName: string;
}

export function DiaryItem({
  diaryId,
  diaryOwnerId,
  diarySchoolName,
  diaryOwnerName,
}: DiaryItemProps) {
  return (
    <div className='flex items-start justify-between p-4'>
      <div className='flex flex-row items-start justify-start gap-4'>
        <UserAvatar
          user={{ name: diaryOwnerId || null, image: null }}
          className='border-muted h-10 w-10 border-2'
        />

        <div className='grid'>
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
      <DiaryOperations diaryid={diaryId} />
    </div>
  );
}

DiaryItem.Skeleton = function DiaryItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  );
};
