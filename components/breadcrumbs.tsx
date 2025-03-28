import Link from "next/link";

interface Props {
  path?: string[];
}

interface Item {
  name: string;
  path: string;
}

export function Breadcrumbs({ path }: Props) {
  const items: Item[] = path?.map((part, index) => ({
    name: part,
    path: "/disk/" + path.slice(0, index + 1).join("/"),
  })) ?? [];

  items.unshift({ name: "Мой Диск", path: "/disk" });

  return (
    <nav className="text-sm text-gray-600">
      {items.map((item, index) => (
        <span key={index} className="">
          {index !== 0 && " / "}
          {index === items.length - 1 ? (
            <span>{item.name}</span>
          ) : (
            <Link href={item.path} className="hover:underline">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

function BreadcrumbItem() {}
