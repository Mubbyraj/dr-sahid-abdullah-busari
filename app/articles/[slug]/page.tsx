import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="page-shell">
      <div className="article-page">
        <Link href="/articles" className="back-link">
          <ArrowLeft size={16} />
          Back to Articles
        </Link>

        <span className="eyebrow">ARTICLE</span>

        <h1>{slug.replace(/-/g, " ")}</h1>

        <p className="article-intro">
          Scholarly articles and academic writings by Dr. Saheed Abdullahi
          Busari.
        </p>

        <div className="article-placeholder">
          <p>
            Article content will be published here. This section is structured
            for future scholarly articles and research publications.
          </p>
        </div>
      </div>
    </main>
  );
}
