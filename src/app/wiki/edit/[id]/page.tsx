import WikiEditor from "@/components/WikiEditor";
import { getArticleById } from "@/lib/data/articles";
import { stackServerApp } from "@/stack/server";
import { notFound } from "next/navigation";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  await stackServerApp.getUser({ or: "redirect" });
  const { id } = await params;

  if (id === "new") {
    return <WikiEditor isEditing={true} articleId={id} />;
  }

  const article = await getArticleById(Number(id));

  if (!article) {
    notFound();
  }

  return (
    <WikiEditor
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={true}
      articleId={id}
    />
  );
}
