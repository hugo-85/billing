"use server";
import { revalidateTag } from "next/cache";

export async function clearCache(id: string) {
  revalidateTag(id);
}
