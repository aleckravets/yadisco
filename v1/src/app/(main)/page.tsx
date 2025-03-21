import { Explorer } from "@/components/Explorer/Explorer";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { path } = await searchParams;
  return <Explorer path={path as string} />;
}
