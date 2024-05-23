"use server";
import { revalidateTag } from "next/cache";

export async function clearCache(id: string) {
  try {
    revalidateTag(id);
  } catch (e) {
    null;
    //didn't work with jest when test a component where the idTag doesn't exists
  }
}
