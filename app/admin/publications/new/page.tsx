"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function NewPublicationPage() {
  const router = useRouter();

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.from("publications").insert({
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
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/publications");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/admin/publications"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Publications
        </Link>

        <h1 className="mt-6 text-3xl font-semibold">
          New Publication
        </h1>

        <p className="mt-2 text-slate-400">
          Add a book, paper, journal article or other academic publication.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-7"
        >
          <Input
            label="Title"
            value={title}
            setValue={setTitle}
            required
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Type"
              value={type}
              setValue={setType}
              placeholder="Book, Journal Article, Paper..."
            />

            <Input
              label="Authors"
              value={authors}
              setValue={setAuthors}
              placeholder="Author names"
            />
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
            placeholder="https://..."
          />

          <Input
            label="PDF URL"
            value={pdfUrl}
            setValue={setPdfUrl}
            placeholder="https://..."
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
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Publication"}
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
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
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
