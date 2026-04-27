import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <h1 className={`${dmSans.className} text-6xl font-bold tracking-tight text-black`}>vanderliek</h1>
    </div>
  );
}
