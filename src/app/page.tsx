import { ShopBanner } from "@/components";
import { TopHero } from "@/components/TopHero";
import { WhyInfusio } from "@/components/WhyInfusio";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-poppins text-base text-black">
      <main className="min-h-screen w-full bg-white sm:items-start">
        <TopHero />
        <ShopBanner />
        <WhyInfusio />
      </main>
    </div>
  );
}
