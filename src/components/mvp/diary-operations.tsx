'use client';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@src/components/default-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';

// async function deletePost(postId: string) {
//   const response = await fetch(`/api/posts/${postId}`, {
//     method: 'DELETE',
//   });

//   if (!response?.ok) {
//     toast({
//       title: 'Something went wrong.',
//       description: 'Your post was not deleted. Please try again.',
//       variant: 'destructive',
//     });
//   }

//   return true;
// }

interface DiaryOperationsProps {
  diaryid: string;
}

export function DiaryOperations({ diaryid }: DiaryOperationsProps) {
  // const router = useRouter();
  // const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  // const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='hover:bg-muted flex h-8 w-8 items-center justify-center rounded-md border transition-colors'>
          <Icons.ellipsis className='h-4 w-4' />
          <span className='sr-only'>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <Link
              href={`/diary/forms?id=${diaryid}&type=absen_datang`}
              className='flex w-full'
            >
              Absen kehadiran
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/diary/forms?id=${diaryid}&type=laporan_kegiatan`}
              className='flex w-full'
            >
              Laporan kegiatan
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/diary/forms?id=${diaryid}&type=pengunguman_kelas`}
              className='flex w-full'
            >
              Pengunguman kelas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/diary/forms?id=${diaryid}&type=pengunguman_sekolah`}
              className='flex w-full'
            >
              Pengunguman sekolah
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/diary/forms?id=${diaryid}&type=absen_pulang`}
              className='flex w-full'
            >
              Absensi pulang
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem
            className='text-destructive focus:text-destructive flex cursor-pointer items-center'
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);
              }}
              className='bg-red-600 focus:ring-red-600'
            >
              {isDeleteLoading ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Icons.trash className='mr-2 h-4 w-4' />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
