export { metadata, viewport } from "next-sanity/studio";
export const dynamic = "force-dynamic";

import { StudioWrapper } from "./StudioWrapper";

export default function Page() {
  return <StudioWrapper />;
}
