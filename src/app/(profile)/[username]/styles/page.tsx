import { getServerSession } from "@/actions/auth/get-server-session";
import { getAllUserStyles } from "@/actions/style/get-all-user-styles";
import StyleCard from "@/components/dashboard/style-card";
import { redirect } from "next/navigation";

export default async function Styles({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession();

  if (params.username !== session?.user.username!) {
    redirect(`/${session?.user.username!}`);
  }

  const styles = await getAllUserStyles(session?.user.id!);

  return (
    <div className="w-full bg-white">
      <div className="container flex flex-wrap justify-start gap-x-8 py-8 gap-y-4">
        {styles?.map((style, index) => (
          <StyleCard key={index} style={style} />
        ))}
      </div>
    </div>
  );
}
