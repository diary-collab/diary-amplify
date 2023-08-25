/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

import logger from '@src/lib/logger';

import { DashboardHeader } from '@src/components/dashboard-header';
import { DashboardShell } from '@src/components/dashboard-shell';
import { DiaryItem, DiaryItemProps } from '@src/components/mvp/diary-item';

// import { useAccount } from '@src/hooks/use-account';
import { SessionData } from '@src/types/use-session';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listDiaries, pagesByDiaryIdAndCreatedOn } from '@src/graphql/queries';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

export default function DiaryPage({
  params,
}: {
  params: {
    sessionData: SessionData;
    data: any;
  };
}) {
  const [mounted, setMounted] = useState(false);
  // const [data, setData] = useState<any>();
  logger(params);

  useEffect(() => {
    // async function getDiaries() {
    //   const data = await API.graphql(graphqlOperation(listDiaries));
    //   setData(data);
    // }

    setMounted(true);
    // getDiaries();
  }, []);

  if (!mounted) {
    return <></>;
  }

  // if (data) {
  //   logger(data);
  // }

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Students'
        text='List of all your students in Porject Diary.'
      >
        {/* student create button belum perlu, sekarang masukinnya masih manual aja dulu sesuai keperluan */}
        {/* <StudentCreateButton /> */}
      </DashboardHeader>

      <div className='divide-border divide-y rounded-md border'>
        {params?.data?.listDiaries?.items?.length ? (
          params.data.listDiaries.items.map((item: DiaryItemProps) => {
            return (
              <DiaryItem
                key={item.diaryId}
                id={item.diaryId}
                diaryId={item.diaryId}
                diaryName={item.diaryName}
                diaryOwnerId={item.diaryOwnerId}
                diarySchoolName={item.diarySchoolName}
                diaryType={item.diaryType}
                diaryOwnerName={item.diaryOwnerName}
              />
            );
          })
        ) : (
          <>No student data</>
        )}
      </div>
    </DashboardShell>
  );
}
