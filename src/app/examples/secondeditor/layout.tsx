interface SecondEditorLayoutProps {
  children?: React.ReactNode;
}

export default async function SecondEditorLayout({
  children,
}: SecondEditorLayoutProps) {
  return (
    <div className='container mx-auto grid items-start gap-10 py-8'>
      {children}
    </div>
  );
}
