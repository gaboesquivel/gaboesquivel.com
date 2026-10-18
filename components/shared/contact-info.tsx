import { Calendar, Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function ContactInfo({ hidden = true }) {
  return (
    <>
      <div
        className={`${hidden ? "hidden" : ""} print-keep-links cv-contact-section cv-print mb-8 pt-14 print:block preview-print:block`}
      >
        <h2 className="mb-4 pt-8 text-xl font-semibold text-[#2563EB]">
          Connect
        </h2>

        <div className="cv-contact-lede">
          <p className="prose prose-neutral dark:prose-invert">
            Open to direct hire, international hire, or contracting through
            Blockmatic Labs LLC. Based in Costa Rica and working US Mountain
            Time.
          </p>
        </div>

        <div className="cv-contact-grid grid grid-cols-2 gap-x-8 pt-4">
          <Link
            href="tel:17865537670"
            className="group flex items-center gap-2 no-underline"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="!m-0 prose !p-0 prose-neutral hover:text-accent dark:prose-invert">
              US: +1 (786) 229 4440
            </span>
          </Link>
          <Link
            href="https://wa.me/50670367089"
            className="group prose flex items-center gap-2 no-underline prose-neutral dark:prose-invert"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="!m-0 prose !p-0 prose-neutral hover:text-accent dark:prose-invert">
              WhatsApp: +506 7036 7089
            </span>
          </Link>
          <Link
            href="mailto:contact@gaboesquivel.com"
            className="group prose flex items-center gap-2 no-underline prose-neutral dark:prose-invert"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="!m-0 prose !p-0 prose-neutral hover:text-accent dark:prose-invert">
              contact@gaboesquivel.com
            </span>
          </Link>
          <Link
            href="https://gaboesquivel.com/cal"
            className="group prose flex items-center gap-2 no-underline prose-neutral dark:prose-invert"
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="!m-0 prose !p-0 prose-neutral hover:text-accent dark:prose-invert">
              gaboesquivel.com/cal
            </span>
          </Link>
          <Link
            href="https://github.com/gaboesquivel"
            className="group prose flex items-center gap-2 no-underline prose-neutral dark:prose-invert"
          >
            <Github className="h-4 w-4 shrink-0" />
            <span className="!m-0 prose !p-0 prose-neutral hover:text-accent dark:prose-invert">
              github.com/gaboesquivel
            </span>
          </Link>
          <Link
            href="https://linkedin.com/in/gaboesquivel"
            className="group prose flex items-center gap-2 no-underline prose-neutral dark:prose-invert"
          >
            <Linkedin className="h-4 w-4 shrink-0" />
            <span className="!m-0 prose !p-0 prose-neutral hover:text-accent dark:prose-invert">
              linkedin.com/in/gaboesquivel
            </span>
          </Link>
        </div>
      </div>
      <p className="print-keep-links cv-contact-footer prose hidden prose-neutral dark:prose-invert print:block preview-print:block">
        The rest of the work is on{" "}
        <Link href="/" className="no-underline">
          gaboesquivel.com
        </Link>
        .
      </p>
    </>
  );
}
