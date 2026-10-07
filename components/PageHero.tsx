import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

const backgroundImage =
  "https://images.unsplash.com/photo-1650083731644-0596fafde3e5?auto=format&fit=crop&fm=jpg&q=78&w=2000";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero relative isolate overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="page-hero-image absolute inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,20,40,0.94)_0%,rgba(5,35,70,0.82)_48%,rgba(5,35,70,0.48)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,20,40,0.18)_0%,rgba(3,20,40,0.48)_100%)]"
      />

      <div className="mx-auto flex min-h-[390px] max-w-7xl items-center px-5 py-20 sm:px-6 lg:min-h-[450px] lg:px-8 lg:py-24">
        <div className="page-hero-content max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-12 bg-blue-300" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-200 sm:text-sm">
              {eyebrow}
            </p>
          </div>

          <h1 className="font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {description}
          </p>

          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
