// import { Post, User } from '@prisma/client';
// import { notFound, redirect } from 'next/navigation';

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import logger from '@src/lib/logger';

// import { authOptions } from '@src/lib/auth';
// import { db } from '@src/lib/db';
// import { getCurrentUser } from '@src/lib/session';

// import { Editor } from '@src/components/editor';

// async function getPostForUser(postId: Post['id'], userId: User['id']) {
//   return await db.post.findFirst({
//     where: {
//       id: postId,
//       authorId: userId,
//     },
//   });
// }

const ReactQuill = dynamic(
  () => import('react-quill'),

  { ssr: false }
);

interface SecondEditorPageProps {
  params: { postId: string };
}

// eslint-disable-next-line unused-imports/no-unused-vars
export default function SecondEditorPage({ params }: SecondEditorPageProps) {
  logger('params');
  const [value, setValue] = useState('');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return <></>;
  }
  // const user = await getCurrentUser();

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || '/login');
  // }

  // const post = await getPostForUser(params.postId, user.id);

  return <ReactQuill theme='snow' value={value} onChange={setValue} />;
}
