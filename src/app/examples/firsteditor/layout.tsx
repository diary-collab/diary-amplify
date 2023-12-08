interface FirstEditorLayoutProps {
  children?: React.ReactNode;
}

export default async function FirstEditorLayout({
  children,
}: FirstEditorLayoutProps) {
  return (
    <div className='container mx-auto grid items-start gap-10 py-8'>
      {children}
    </div>
  );
}
