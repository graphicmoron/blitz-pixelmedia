export default async function Page({ params }) {
  const { name } = await params;

  return (
    <div>Hello {name}</div>
  );
}