import React from 'react';
import Gem, { IGem } from '@/models/Gem';
import { dbConnect } from '@/lib/db';
import GemCard, { GemData } from '@/components/GemCard';
import { Diamond, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getAvailableGems(): Promise<GemData[]> {
  await dbConnect();
  const rawGems = await Gem.find({ status: 'available' }).sort({ createdAt: -1 }).lean();

  return rawGems.map((gem: any) => ({
    _id: gem._id.toString(),
    title: gem.title,
    origin: gem.origin,
    caratWeight: gem.caratWeight,
    cut: gem.cut,
    color: gem.color,
    clarity: gem.clarity,
    species: gem.species,
    labCertificate: gem.labCertificate,
    price: gem.price,
    image: gem.image,
    status: gem.status,
  }));
}

export default async function GemsPage() {
  const gems = await getAvailableGems();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      {/* Subtle Luxury Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl opacity-60 rounded-full" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-amber-600/5 blur-3xl rounded-full" />
        <div className="absolute top-2/3 -right-40 w-96 h-96 bg-emerald-600/5 blur-3xl rounded-full" />
      </div>

      {/* Luxury Hero Header */}
      <section className="relative border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 px-6 py-20 lg:py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Curated High Jewelry & Rare Gemology</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-extralight tracking-tight sm:text-5xl lg:text-6xl text-neutral-50">
            The Haute <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">Gemstone</span> Collection
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Discover peerless natural gems, ethically sourced from historic mines and verified by international gemological authorities. Each specimen is unique and certified untreated.
          </p>

          {/* Trust Value Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs tracking-wider uppercase text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Independent Lab Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="h-4 w-4 text-amber-400" />
              <span>Conflict-Free Provenance</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Museum-Grade Specimens</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Content Area */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Catalog Control Header Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <h2 className="text-xl font-medium tracking-wide text-neutral-200">
              Available Specimens
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Displaying {gems.length} certified investment-grade gemstones
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs text-neutral-300">
              <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
              <span>Filter & Sort: All Rare Gems</span>
            </div>
          </div>
        </div>

        {/* Responsive Gem Grid: 1 col mobile, 3 cols desktop */}
        {gems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gems.map((gem) => (
              <GemCard key={gem._id} gem={gem} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 py-20 text-center">
            <Diamond className="h-12 w-12 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-neutral-300">No Gemstones Available</h3>
            <p className="mt-1 max-w-sm text-sm text-neutral-500">
              Our inventory is currently being curated. Check back shortly for new acquisitions.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

