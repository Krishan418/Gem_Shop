import React from 'react';
import Link from 'next/link';
import Gem, { IGem } from '@/models/Gem';
import { dbConnect } from '@/lib/db';
import GemCard, { GemData } from '@/components/GemCard';
import { Diamond, ShieldCheck, Sparkles, SlidersHorizontal, ArrowRight, Compass, PhoneCall } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getAvailableGems(): Promise<GemData[]> {
  try {
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
  } catch (error) {
    console.error('Error fetching gems:', error);
    return [];
  }
}

export default async function Home() {
  const gems = await getAvailableGems();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800/70 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
              <Diamond className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-amber-200">L&apos;ÉCRIN IMPÉRIAL</span>
              <span className="block text-[9px] uppercase tracking-widest text-neutral-400">Haute Joaillerie & Rare Gems</span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-neutral-300 md:flex">
            <Link href="/" className="text-amber-400 transition-colors">Catalog</Link>
            <a href="#about" className="transition-colors hover:text-amber-300">Provenance</a>
            <a href="#certification" className="transition-colors hover:text-amber-300">Certificates</a>
            <a href="#contact" className="transition-colors hover:text-amber-300">Private Viewing</a>
          </nav>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-neutral-950"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Concierge</span>
          </a>
        </div>
      </header>

      {/* Atmospheric Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl opacity-60 rounded-full" />
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-amber-600/5 blur-3xl rounded-full" />
        <div className="absolute top-2/3 -right-48 w-96 h-96 bg-emerald-600/5 blur-3xl rounded-full" />
      </div>

      {/* Luxury Hero Section */}
      <section className="relative border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 px-6 py-20 lg:py-28 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Exclusively Untreated Natural Gemstones</span>
          </div>

          <h1 className="mt-8 font-serif text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl text-neutral-50">
            The Haute <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">Gemstone</span> Collection
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Discover peerless natural gems, ethically sourced from historic mines across Ceylon, Mogok, and Colombia. Verified by international gemological authorities for discerning connoisseurs.
          </p>

          {/* Value Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs tracking-wider uppercase text-neutral-400">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Independent Lab Certified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-amber-400" />
              <span>Ethical Mine Provenance</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Investment Grade Specimens</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Catalog Subheading & Filters Bar */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h2 className="font-serif text-2xl font-light tracking-wide text-neutral-100">
              Curated Vault Specimens
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Currently exhibiting {gems.length} certified natural stones ready for acquisition
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/80 px-4 py-2 text-xs text-neutral-300 shadow-inner">
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
              <span>Filter: All Available Gems</span>
            </div>
          </div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 3 cols on desktop */}
        {gems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gems.map((gem) => (
              <GemCard key={gem._id} gem={gem} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 py-24 text-center">
            <Diamond className="h-12 w-12 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-neutral-300">No Gemstones Available</h3>
            <p className="mt-1 max-w-sm text-sm text-neutral-500">
              Our inventory is currently being curated. Please check back shortly or contact our concierge.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-800/80 bg-neutral-950 py-12 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Diamond className="h-4 w-4 text-amber-400" />
            <span className="font-serif text-sm tracking-widest text-neutral-300">L&apos;ÉCRIN IMPÉRIAL</span>
          </div>
          <p>© {new Date().getFullYear()} L&apos;Écrin Impérial. All rights reserved. Certified Fine Gemology.</p>
        </div>
      </footer>
    </div>
  );
}
