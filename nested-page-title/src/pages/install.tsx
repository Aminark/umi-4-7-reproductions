export async function serverLoader() {
  return {};
}

export function metadataLoader() {
  return { title: 'Installation' };
}

export default function Install() {
  return <h1>Installation</h1>;
}
