import { WorkPageChrome } from "components/work/work-page-chrome";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkPageChrome>{children}</WorkPageChrome>;
}
