"use server";

import { getStylesByUser } from "@/data/style";
import { unstable_cache } from "next/cache";

export async function getAllUserStyles(userId: string) {
  unstable_cache(
    async (userId) => {
      const styles = await getStylesByUser(userId);
      return styles;
    },
    ["styles"],
    {
      tags: ["styles"],
      revalidate: false,
    }
  );
  const styles = getStylesByUser(userId);

  return styles;
}
