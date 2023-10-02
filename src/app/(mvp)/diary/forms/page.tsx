/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getDiary } from '@src/graphql/queries';
import { Widget } from '@typeform/embed-react';
import { API, graphqlOperation } from 'aws-amplify';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DashboardShell } from '@src/components/dashboard-shell';
import Typography from '@src/components/typography/default-typography';

// import { useAccount } from '@src/hooks/use-account';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listDiaries, pagesByDiaryIdAndCreatedOn } from '@src/graphql/queries';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function DiaryFormPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>();
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function getDiaries() {
      const data = await API.graphql(
        graphqlOperation(getDiary, { diaryId: id })
      );
      setData(data);
    }

    getDiaries();
  }, [id]);

  if (!mounted) {
    return <></>;
  }

  if (!id || !type) {
    return notFound();
  }

  return (
    <DashboardShell>
      <div className='w-full'>
        {data?.data?.getDiary ? (
          <Widget
            id='hpqRSuDr'
            medium='diary-forms'
            className='h-screen md:-mb-14 md:-mt-20'
            hidden={{
              dairyid: data.data.getDiary.diaryId,
              pagetype: type,
              diaryownername: data.data.getDiary.diaryOwnerName,
              diarytype: data.data.getDiary.diaryType,
            }}
            transitiveSearchParams={['referralcode']}
            iframeProps={{ title: 'Diaryform' }}
          />
        ) : (
          <Typography variant='b2'>Forms not found...</Typography>
        )}
      </div>
    </DashboardShell>
  );
}
