import WikiCard from "@/components/WikiCard";
import { getArticles } from "@/lib/data/articles";

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        {articles.map(({ title, id, author, createdAt, content }) => (
          <WikiCard
            key={id}
            title={title}
            author={author ? author : "Unknown Author"}
            date={createdAt}
            summary={content}
            href={`/wiki/${id}`}
          />
        ))}
      </main>
    </div>
  );
}
