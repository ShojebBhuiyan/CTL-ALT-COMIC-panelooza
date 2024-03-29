import { getServerSession } from "@/actions/auth/get-server-session";
import AccountController from "@/components/account/account-controller";
import ImageHandler from "@/components/account/image-handler";
import { redirect } from "next/navigation";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession();

  if (params.username !== session?.user.username!) {
    redirect(`/${session?.user.username!}`);
  }

  return (
    <div className="bg-white p-16 flex justify-between gap-16">
      <ImageHandler
        id={session?.user.id!}
        username={session?.user.username!}
        imageUrl={session?.user.image!}
      />
      <AccountController
        id={session?.user.id!}
        name={session?.user.name!}
        username={session?.user.username!}
        email={session?.user.email!}
      />
    </div>
  );
}
