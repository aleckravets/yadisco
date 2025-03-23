import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect("/login");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
    </div>
  );
}
