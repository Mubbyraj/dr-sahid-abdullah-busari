export type Fatwa = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  slug: string;
};

export const fatwas: Fatwa[] = [
  {
    title: "Fatwa & Juristic Responses",
    category: "Fiqh",
    date: "Coming soon",
    excerpt:
      "Verified fatwas and juristic responses by Dr. Saheed Abdullahi Busari will be published here.",
    slug: "fatwa-archive",
  },
  {
    title: "Questions on Contemporary Financial Transactions",
    category: "Islamic Finance",
    date: "Coming soon",
    excerpt:
      "A dedicated space for verified responses concerning contemporary financial and commercial matters.",
    slug: "contemporary-financial-transactions",
  },
  {
    title: "Questions on Fiqh & Usul al-Fiqh",
    category: "Fiqh & Usul",
    date: "Coming soon",
    excerpt:
      "Selected juristic questions and answers will be added following verification and editorial review.",
    slug: "fiqh-usul-questions",
  },
];
