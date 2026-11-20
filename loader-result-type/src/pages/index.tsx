import { useLoaderData } from 'umi';

export async function clientLoader() {
  return { count: 7 };
}

export default function Home() {
  const result = useLoaderData<typeof clientLoader>();
  return <output>{JSON.stringify(result)}</output>;
}
