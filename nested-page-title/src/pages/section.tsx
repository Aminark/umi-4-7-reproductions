import { Outlet } from 'umi';

export async function serverLoader() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {};
}

export function metadataLoader() {
  return { title: 'Documentation' };
}

export default function Section() {
  return <Outlet />;
}
