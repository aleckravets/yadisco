import Link from "next/link";

interface Props {
  path?: string[];
}

interface Item {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

export function Breadcrumbs({ path }: Props) {
  const items: Item[] =
    path?.map((part, index) => ({
      name: part,
      path: "/disk/" + path.slice(0, index + 1).join("/"),
    })) ?? [];

  items.unshift({ name: "Мой Диск", path: "/disk" });

  return (
    <nav className="text-xl text-gray-600">
      {items.map(({name, path, icon}, index) => (
        <span key={index}>
          {icon}
          {index !== 0 && " / "}
          {index === items.length - 1 ? (
            <span>{name}</span>
          ) : (
            <Link href={path} className="hover:underline">
              {name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
