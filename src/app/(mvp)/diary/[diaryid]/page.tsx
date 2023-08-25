/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Page } from '@src/API';
import { getDiary, pagesByDiaryIdAndCreatedOn } from '@src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@src/lib/logger';

import { DashboardShell } from '@src/components/dashboard-shell';
import DatePicker from '@src/components/forms/DatePicker';
import { Icons } from '@src/components/icons';
import PageLoading from '@src/components/PageLoadingSkeleton';
import Typography from '@src/components/typography/Typography';

// import { useAccount } from '@src/hooks/use-account';
import { SessionData } from '@src/types/use-session';

// import { useTheme } from 'next-themes';

// import ButtonLink from '@src/components/links/ButtonLink';
// import clsxm from '@src/lib/clsxm';
// import PageLoading from '@src/components/PageLoadingSkeleton';
// import UnstyledLink from '@src/components/links/UnstyledLink';

function getpageType(pagetype: string) {
  return pagetype.replace('_', ' ');
}

export default function DiaryPage({
  params,
}: {
  params: {
    sessionData: SessionData;
    data: any;
    diaryid: string;
  };
}) {
  // const searchparam = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [datequerystate, setDateQueryState] = useState<Date | null>(new Date());
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // if (!datequery) {
    //   logger('null');
    // }
    logger(datequerystate);
  }, [datequerystate]);

  const methods = useForm<any>({
    mode: 'onTouched',
  });
  const { setValue, handleSubmit } = methods;

  async function onSubmit(data: string) {
    logger(data);
    return;
  }

  useEffect(() => {
    async function getDiaryData() {
      const data: any = await API.graphql(
        graphqlOperation(getDiary, { diaryId: params.diaryid })
      );

      params.data = data.data.getDiary.diaryName;
    }

    if (!params.data) {
      getDiaryData();
    }
    setMounted(true);
  }, [params]);

  useEffect(() => {
    async function fetchDiaryPageData(datequery: string) {
      setLoading(true);
      const variables = {
        diaryId: params.diaryid,
        createdOn: { beginsWith: datequery },
        sortDirection: 'ASC',
      };
      const data: any = await API.graphql(
        graphqlOperation(pagesByDiaryIdAndCreatedOn, variables)
      );

      if (data.data?.pagesByDiaryIdAndCreatedOn?.items) {
        logger(data);

        setPages(data.data.pagesByDiaryIdAndCreatedOn.items);
      }
      setLoading(false);
    }

    if (datequerystate && params.diaryid) {
      // logger(datequerystate.toISOString().slice(0, 10));
      fetchDiaryPageData(datequerystate.toISOString().slice(0, 10));
    }
  }, [datequerystate, params.diaryid]);

  if (!mounted) {
    return <></>;
  }

  if (loading) {
    return (
      <div className='flex flex-col'>
        <PageLoading className='mx-4 mt-8 w-full text-center lg:max-w-xl' />
        <PageLoading className='mx-4 mt-4 w-full text-center lg:max-w-2xl' />
        <PageLoading className='mx-4 mt-4 w-full text-center lg:max-w-3xl' />
        <PageLoading className='mx-4 mb-8 mt-4 w-full text-center lg:max-w-4xl' />
      </div>
    );
  }

  return (
    <DashboardShell>
      <div className='divide-border divide-y rounded-md border'>
        <div className='flex flex-col items-center justify-between lg:flex-row'>
          <div className='pl-0 pt-2 lg:pl-4'>
            <Typography variant='h5'>
              {params.data ?? 'No data found'}
            </Typography>
          </div>

          <div className='pb-4 pr-0 pt-2 text-center lg:pr-4'>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DatePicker
                  id='datequery'
                  name='datequery'
                  placeholder='Select date'
                  label='Search diary based on date..'
                  withPortal
                  defaultValue={new Date().toISOString()}
                  todayButton='Today'
                  maxDate={new Date()}
                  customState={setDateQueryState}
                  rightNode={
                    <button
                      onClick={() => {
                        datequerystate && new Date();
                        setValue('datequery', new Date());
                      }}
                    >
                      <Icons.today className='h-4 w-4' />
                    </button>
                  }
                />
              </form>
            </FormProvider>
          </div>
        </div>
        {/* data page */}

        <div className='ms-4 flex flex-col items-start justify-between pt-4'>
          {pages.length ? (
            pages.map((page: Page) => {
              return (
                <section key={page.pageId} className='my-8 w-full'>
                  <div className='grid grid-cols-3 items-center'>
                    <div className='col-span-2'>
                      <Typography variant='h2'>{`Activity: ${getpageType(
                        page.pageType
                      )}`}</Typography>
                      <Typography variant='h3'>
                        {`${
                          page.diary?.diaryOwnerName ?? 'Student'
                        }'s mood during the activity: ${page.pageContent.mood}`}
                      </Typography>
                      <Typography variant='s2' className='mt-4'>
                        {`Activity detail: ${page.pageContent.activityDetail}`}
                      </Typography>
                    </div>
                    <div className='items-center justify-center p-4 align-middle'>
                      <Image
                        src='https://media.suara.com/pictures/653x366/2021/09/01/37821-siswa-tk-putra-iii-kecamatan-tanah-abang-jakarta-pusat-usai-mengikuti-ptm-terbatas-suaracom.webp'
                        width={500}
                        height={500}
                        alt='Picture of the author'
                      />
                    </div>
                  </div>
                </section>
              );
            })
          ) : (
            <>No data</>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
