"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function EditPublicationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [authors, setAuthors] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [journal, setJournal] = useState("");
  const [publisher, setPublisher] = useState("");
  const [url, setUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [status, setStatus] = useState("draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPublication() {
      const supabase = createSupabaseBrowserClient();

      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setTitle(data.title || "");
      setType(data.type || "");
      setDescription(data.description || "");
      setAuthors(data.authors || "");
      setPublicationDate(data.publication_date || "");
      setJournal(data.journal || "");
      setPublisher(data.publisher || "");
      setUrl(data.url || "");
      setPdfUrl(data.pdf_url || "");
      setStatus(data.status || "draft");

      setLoading(false);
    }

    loadPublication();
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase
      .from("publications")
      .update({
        title: title.trim(),
        type: type.trim() || null,
        description: description.trim() || null,
        authors: authors.trim() || null,
        publication_date: publicationDate || null,
        journal: journal.trim() || null,
        publisher: publisher.trim() || null,
        url: url.trim() || null,
        pdf_url: pdfUrl.trim() || null,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/publications");
    router.refresh();
  }

  async function deletePublication() {
    if (!confirm("Delete this publication permanently?")) return;

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase
      .from("publications")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/publications");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Loading publication...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/publications"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Publications
          </Link>

          <button
            onClick={deletePublication}
            className="inline-flex items-center gap-2 rounded-xl border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        <h1 className="mt-6 text-3xl font-semibold">
          Edit Publication
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
        >
          <Input label="Title" value={title} setValue={setTitle} />

          <div className="grid gap-6 md:grid-cols-2">
            <Input label="Type" value={type} setValue={setType} />
            <Input label="Authors" value={authors} setValue={setAuthors} />
          </div>

          <Textarea
            label="Description"
            value={description}
            setValue={setDescription}
            rows={6}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Publication Date"
              type="date"
              value={publicationDate}
              setValue={setPublicationDate}
            />

            <Input
              label="Journal"
              value={journal}
              setValue={setJournal}
            />
          </div>

          <Input
            label="Publisher"
            value={publisher}
            setValue={setPublisher}
          />

          <Input
            label="External URL"
            value={url}
            setValue={setUrl}
          />

          <Input
            label="PDF URL"
            value={pdfUrl}
            setValue={setPdfUrl}
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
  type = "text",
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
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
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  rows: number;
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
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      />
    </div>
  );
}
