import { useLoaderData } from 'umi';
import type { clientLoader } from './src/pages';

export function useCount(): number {
  const result = useLoaderData<typeof clientLoader>();
  return result.data.count;
}
