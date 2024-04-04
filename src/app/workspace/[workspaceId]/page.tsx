import { getServerSession } from "@/actions/auth/get-server-session";
import { getAllUserStyles } from "@/actions/style/get-all-user-styles";
import { redirect } from "next/navigation";
import Workspace from "@/components/workspace/workspace";

export default async function Canvas({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession();

  // if (params.username !== session?.user.username!) {
  //   redirect(`/${session?.user.username!}`);
  // }

  const styles = await getAllUserStyles(session?.user.id!);

  return <Workspace userId={session?.user.id!} styles={styles!} />;
}
