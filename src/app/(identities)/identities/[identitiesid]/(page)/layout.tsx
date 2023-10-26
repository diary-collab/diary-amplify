import { provideSessionAttributes } from '@src/hooks/use-auth';

import { SessionData } from '@src/types/use-session';

interface LayoutIdentitiesIdProps {
  children: React.ReactNode;
  params: {
    sessionData: SessionData | null;
    diaryid: string;
  };
}

export default async function IdentitiesDetailLayout({
  children,
  params,
}: LayoutIdentitiesIdProps) {
  const sessionData = await provideSessionAttributes();

  params.sessionData = sessionData;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      {children}
    </div>
  );
}
