import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Research | Publications",
  description:
    "Explore the scholarly publications of Dr. Saheed Abdullahi Busari in Fiqh, Usul al-Fiqh, Islamic jurisprudence and related fields.",
  alternates: {
    canonical: "/publications",
  },
};

export default function ResearchPage() {
  redirect("/publications");
}
