import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = "https://drbusarisaheed.com";

const defaultTitle =
  "Dr. Saheed Abdullahi Busari | Associate Professor of Fiqh & Usul al-Fiqh";

const defaultDescription =
  "Official academic website of Dr. Saheed Abdullahi Busari, Associate Professor of Fiqh and Usul al-Fiqh at the International Islamic University Malaysia. Explore research, publications, lectures, questions and scholarly work.";

const heroImage =
  "https://images.unsplash.com/photo-1650083731644-0596fafde3e5?auto=format&fit=crop&fm=jpg&q=68&w=1920";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: "%s | Dr. Saheed Abdullahi Busari",
  },

  description: defaultDescription,

  keywords: [
    "Dr. Saheed Abdullahi Busari",
    "Saheed Abdullahi Busari",
    "Saheed Busari",
    "Fiqh",
    "Usul al-Fiqh",
    "Islamic jurisprudence",
    "Islamic legal theory",
    "Maqasid al-Shariah",
    "Islamic finance",
    "Islamic social finance",
    "Islamic wealth management",
    "Islamic banking",
    "Halal financing",
    "International Islamic University Malaysia",
    "IIUM",
  ],

  authors: [
    {
      name: "Dr. Saheed Abdullahi Busari",
      url: siteUrl,
    },
  ],

  creator: "Dr. Saheed Abdullahi Busari",
  publisher: "Dr. Saheed Abdullahi Busari",

  applicationName: "Dr. Saheed Abdullahi Busari Academic Website",

  category: "education",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Dr. Saheed Abdullahi Busari",
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_MY",
    images: [
      {
        url: heroImage,
        width: 1920,
        height: 1080,
        alt: "Dr. Saheed Abdullahi Busari academic profile",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Official academic website of Dr. Saheed Abdullahi Busari, Associate Professor of Fiqh and Usul al-Fiqh at the International Islamic University Malaysia.",
    images: [heroImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Dr. Saheed Abdullahi Busari",
  url: siteUrl,

  jobTitle: "Associate Professor of Fiqh & Usul al-Fiqh",

  description:
    "Dr. Saheed Abdullahi Busari is an Associate Professor of Fiqh and Usul al-Fiqh at the International Islamic University Malaysia, with academic interests spanning Islamic jurisprudence, legal theory, Maqasid al-Shariah, Islamic finance and related fields.",

  worksFor: {
    "@type": "CollegeOrUniversity",
    name: "International Islamic University Malaysia",
    url: "https://www.iium.edu.my/",
  },

  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "International Islamic University Malaysia",
    url: "https://www.iium.edu.my/",
  },

  knowsAbout: [
    "Fiqh",
    "Usul al-Fiqh",
    "Islamic jurisprudence",
    "Islamic legal theory",
    "Maqasid al-Shariah",
    "Islamic finance",
    "Islamic banking and capital markets",
    "Halal financing",
    "Islamic social finance",
    "Islamic wealth management",
    "Research methodology",
    "Sustainable development",
  ],

  sameAs: [
    "https://irep.iium.edu.my/profile/2490",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />

        <link
          rel="dns-prefetch"
          href="https://images.unsplash.com"
        />

        <link
          rel="preload"
          as="image"
          href={heroImage}
        />
      </head>

      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}