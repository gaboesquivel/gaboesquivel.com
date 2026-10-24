import { siteProfile } from "lib/api/profile";
import { hireContractBlogPath, publicBookingUrl } from "lib/hire-terms";
import Link from "next/link";

export const EngagementOptions = () => {
  const profile = siteProfile();
  const contractHref = hireContractBlogPath;

  return (
    <ul className="space-y-3 text-sm text-neutral-300">
      <li>
        <Link className="text-accent hover:underline" href={publicBookingUrl}>
          Book a short intro call
        </Link>
        <span className="text-neutral-500">
          {" "}
          (15 or 30 minutes, {profile.timeZoneLabel})
        </span>
      </li>
      <li>
        <Link className="text-accent hover:underline" href="/contact">
          Send a project note
        </Link>
        <span className="text-neutral-500"> through the contact form</span>
      </li>
      <li>
        <Link className="text-accent hover:underline" href="/cv">
          View the résumé online
        </Link>
      </li>
      <li>
        <Link className="text-accent hover:underline" href={contractHref}>
          Read how contracting works
        </Link>
      </li>
    </ul>
  );
};
