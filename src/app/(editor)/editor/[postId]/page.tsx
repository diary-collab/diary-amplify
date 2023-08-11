// import { Post, User } from '@prisma/client';
// import { notFound, redirect } from 'next/navigation';

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

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  logger(params);
  // const user = await getCurrentUser();

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || '/login');
  // }

  // const post = await getPostForUser(params.postId, user.id);

  // if (!post) {
  //   notFound();
  // }

  return (
    // <Editor
    //   post={{
    //     id: post.id,
    //     title: post.title,
    //     content: post.content,
    //     published: post.published,
    //   }}
    // />
    <></>
  );
}
