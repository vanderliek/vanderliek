"use client";

import dynamicImport from "next/dynamic";

const Studio = dynamicImport(() => import("./Studio").then((m) => m.Studio), {
  ssr: false,
});

export function StudioWrapper() {
  return <Studio />;
}
