import PageLoading from '@src/components/PageLoadingSkeleton';
// import clsxm from '@src/lib/clsxm';

export default function DiaryFormLoading() {
  return (
    <section className='bg-background'>
      <div className='layout relative flex min-h-screen min-w-full flex-col items-center justify-center text-center'>
        <PageLoading className='px-4' />
      </div>
    </section>
  );
}
