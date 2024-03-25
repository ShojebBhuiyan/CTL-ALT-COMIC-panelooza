import { getServerSession } from "@/actions/auth/get-server-session";
import AccountController from "@/components/account/account-controller";
import ImageHandler from "@/components/account/image-handler";

export default async function Profile() {
  const session = await getServerSession();

  return (
    <div className="bg-white p-16 flex justify-between gap-16">
      <ImageHandler
        imageUrl={session?.user.image!}
        name={session?.user.username!}
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
