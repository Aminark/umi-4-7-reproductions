import { useLoaderData } from 'umi';

export async function serverLoader() {
  return { name: 'Quarterly report' };
}

export default function Report() {
  const { data } = useLoaderData();
  return <h1>{data.name ?? 'Missing report'}</h1>;
}
