import { useLocation } from 'umi';

export default function Items() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return (
    <main>
      <p>Sort: <output>{params.get('sort')}</output></p>
      <p>Page: <output>{params.get('page') ?? 'missing'}</output></p>
    </main>
  );
}
