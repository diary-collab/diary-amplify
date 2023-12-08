import * as z from 'zod';

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});

export type Post = {
  id?: string;
  title?: string;
  content?: string;
  published?: string;
  pageTitle?: string;
  pageContent?: string;
  version?: string;
};
