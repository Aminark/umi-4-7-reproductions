import { Link } from 'umi';

export async function serverLoader() {
  return { name: 'Home' };
}

export default function Home() {
  return <Link to="/report">Open report</Link>;
}
