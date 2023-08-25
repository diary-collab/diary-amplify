'use client';

import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Page } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as z from 'zod';

import '@/styles/editor.css';

import { clsxm } from '@src/lib/utils';
import { postPatchSchema } from '@src/lib/validations/post';

import { Icons } from '@src/components/icons';
import { buttonVariants } from '@src/components/ui/button';
import { toast } from '@src/components/ui/use-toast';

interface EditorProps {
  post: Pick<Page, 'id' | 'pageTitle' | 'pageContent' | 'version'>;
}

type FormData = z.infer<typeof postPatchSchema>;

export function Editor({ post }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [Header] = (await import('@editorjs/header')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Embed = (await import('@editorjs/embed')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Table = (await import('@editorjs/table')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const List = (await import('@editorjs/list')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Code = (await import('@editorjs/code')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const InlineCode = (await import('@editorjs/inline-code')).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not saved. Please try again.',
        variant: 'destructive',
      });
    }

    router.refresh();

    return toast({
      description: 'Your post has been saved.',
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-full gap-10'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center space-x-10'>
            <Link
              href='/dashboard'
              className={clsxm(buttonVariants({ variant: 'ghost' }))}
            >
              <>
                <Icons.chevronLeft className='mr-2 h-4 w-4' />
                Back
              </>
            </Link>
            <p className='text-muted-foreground text-sm'>
              {post.version ? 'Published' : 'Draft'}
            </p>
          </div>
          <button type='submit' className={clsxm(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className='prose prose-stone dark:prose-invert mx-auto w-[800px]'>
          <TextareaAutosize
            autoFocus
            id='title'
            defaultValue={post.pageTitle}
            placeholder='Post title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
            {...register('title')}
          />
          <div id='editor' className='min-h-[500px]' />
          <p className='text-sm text-gray-500'>
            Use{' '}
            <kbd className='bg-muted rounded-md border px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
}
