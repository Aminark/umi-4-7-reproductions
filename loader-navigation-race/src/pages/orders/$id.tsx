import { Link, useClientLoaderData, useParams } from 'umi';

export async function clientLoader() {
  const id = window.location.pathname.split('/').pop();
  if (id === '1') {
    await new Promise<void>((resolve) => {
      window.addEventListener('finish-first-order', () => resolve(), { once: true });
    });
  }
  return { id };
}

export default function Order() {
  const { id } = useParams();
  const { data } = useClientLoaderData<typeof clientLoader>();
  return (
    <main>
      <p>Current order: {id}</p>
      <p>Loaded order: <output>{data?.id ?? 'pending'}</output></p>
      <Link to="/orders/2">Open order 2</Link>
      <button onClick={() => window.dispatchEvent(new Event('finish-first-order'))}>
        Finish loading order 1
      </button>
    </main>
  );
}
