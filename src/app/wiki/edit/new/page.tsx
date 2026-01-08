import WikiEditor from "@/components/WikiEditor";
import { stackServerApp } from "@/stack/server";

export default async function NewArticlePage() {
  await stackServerApp.getUser({ or: "redirect" });

  return <WikiEditor isEditing={true} />;
}
