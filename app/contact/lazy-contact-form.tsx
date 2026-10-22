"use client";

import dynamic from "next/dynamic";
import { startTransition, useEffect, useRef, useState } from "react";

const contactFormDesktopQuery = "(min-width: 1024px)";

const ContactFormPlaceholder = () => (
  <div
    aria-busy="true"
    className="min-h-[28rem] w-full rounded-lg border border-hairline bg-neutral-950/50 sm:min-h-[32rem]"
    role="status"
  >
    <span className="sr-only">Loading contact form</span>
  </div>
);

const ContactForm = dynamic(
  () => import("./contact-form").then((mod) => mod.ContactForm),
  { loading: () => <ContactFormPlaceholder />, ssr: false }
);

export const LazyContactForm = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => startTransition(() => setShouldLoad(true));

    if (window.matchMedia(contactFormDesktopQuery).matches) {
      load();
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        load();
        observer.disconnect();
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {shouldLoad ? <ContactForm /> : <ContactFormPlaceholder />}
    </div>
  );
};
