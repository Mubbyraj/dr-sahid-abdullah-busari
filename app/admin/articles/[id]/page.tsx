"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [status, setStatus] = useState("draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArticle() {
      const supabase = createSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setTitle(data.title || "");
      setSlug(data.slug || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");
      setCategory(data.category || "");
      setFeaturedImageUrl(data.featured_image_url || "");
      setStatus(data.status || "draft");

      setLoading(false);
    }

    loadArticle();
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase
      .from("articles")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        category: category.trim() || null,
        featured_image_url: featuredImageUrl.trim() || null,
        status,
        published_at:
          status === "published" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  }

  async function deleteArticle() {
    if (!confirm("Delete this article permanently?")) return;

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Loading article...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Articles
          </Link>

          <button
            onClick={deleteArticle}
            className="inline-flex items-center gap-2 rounded-xl border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        <h1 className="mt-6 text-3xl font-semibold">
          Edit Article
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
        >
          <Input label="Title" value={title} setValue={setTitle} />
          <Input label="Slug" value={slug} setValue={setSlug} />
          <Input label="Category" value={category} setValue={setCategory} />
          <Input
            label="Featured Image URL"
            value={featuredImageUrl}
            setValue={setFeaturedImageUrl}
          />

          <Textarea
            label="Excerpt"
            value={excerpt}
            setValue={setExcerpt}
            rows={4}
          />

          <Textarea
            label="Article Content"
            value={content}
            setValue={setContent}
            rows={20}
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {error && (
            <div className="rounded-xl bg-red-950/50 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  setValue,
  rows,
  required = false,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  rows: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      />
    </div>
  );
}
