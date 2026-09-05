import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gem from '@/models/Gem';
import { dbConnect } from '@/lib/db';
import GemGallery from '@/components/GemGallery';
import GemActions from '@/components/GemActions';
import { 
  ArrowLeft, 
  Award, 
  MapPin, 
  Scale, 
  Maximize2, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2,
  Diamond
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GemDetailPage({ params }: PageProps) {
  const { slug } = await params;

  await dbConnect();

  // Search by slug first; fallback to _id if someone navigates directly by ID
  let rawGem: any = await Gem.findOne({ slug }).lean();

  if (!rawGem && slug.match(/^[0-9a-fA-F]{24}$/)) {
    rawGem = await Gem.findById(slug).lean();
  }

  if (!rawGem) {
    notFound();
  }

  const gem = {
    _id: rawGem._id.toString(),
    title: rawGem.title,
    slug: rawGem.slug || slug,
    sku: rawGem.sku || `GEM-${rawGem._id.toString().slice(-6).toUpperCase()}`,
    species: rawGem.species || 'Corundum',
    variety: rawGem.variety || 'Natural Gemstone',
    origin: rawGem.origin,
    caratWeight: rawGem.caratWeight,
    cut: rawGem.cut,
    color: rawGem.color || 'Natural Vivid Hue',
    clarity: rawGem.clarity || 'Eye Clean (VVS)',
    dimensions: rawGem.dimensions || 'Confidential / Upon Request',
    treatment: rawGem.treatment || 'None (Unheated / Untreated)',
    labCertificate: rawGem.labCertificate,
    labReportNumber: rawGem.labReportNumber || 'Report On File',
    price: rawGem.price,
    image: rawGem.image,
    images: (rawGem.images && rawGem.images.length > 0) ? rawGem.images : [rawGem.image],
    status: rawGem.status,
    description: rawGem.description || 'An extraordinary museum-grade natural gemstone with exceptional cut, transparency, and certified provenance.',
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(gem.price);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent blur-3xl opacity-50 rounded-full" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-600/5 blur-3xl rounded-full" />
      </div>

      {/* Top Breadcrumb Bar */}
      <div className="relative border-b border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-400 transition-colors hover:text-amber-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Vault Catalog</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-mono text-[11px] text-amber-400/90 tracking-wider">SKU: {gem.sku}</span>
            <span className="text-neutral-700">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Gem Showcase */}
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Image Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <GemGallery
                images={gem.images}
                title={gem.title}
                labCertificate={gem.labCertificate}
              />

              {/* Gemological Guarantee Callout */}
              <div className="mt-8 rounded-2xl border border-amber-500/20 bg-neutral-900/40 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-neutral-200">
                      100% Guaranteed Natural & Untreated
                    </h4>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                      Every gemstone offered by L&apos;Écrin Impérial has passed rigorous spectroscopic and microscopic analysis by the world&apos;s leading gemological authorities. Full archival dossiers accompany each shipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Gem Details, Specs & Actions (5 cols on desktop) */}
          <div className="flex flex-col lg:col-span-5">
            {/* Title & Origin */}
            <div className="border-b border-neutral-800 pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <Diamond className="h-3.5 w-3.5" />
                <span>{gem.variety}</span>
              </div>

              <h1 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-4xl text-neutral-50">
                {gem.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Mined in {gem.origin}</span>
              </div>

              {/* Price Banner */}
              <div className="mt-6 flex items-baseline gap-4 rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4">
                <div>
                  <span className="block text-[10px] font-medium uppercase tracking-widest text-neutral-400">Acquisition Value</span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-amber-300">
                    {formattedPrice}
                  </div>
                </div>
                <span className="text-xs text-neutral-400">Includes secure bonded courier & insurance</span>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-neutral-800">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Curator&apos;s Appraisal
              </h3>
              <p className="mt-2 text-sm text-neutral-300 font-light leading-relaxed">
                {gem.description}
              </p>
            </div>

            {/* Comprehensive Specification Table */}
            <div className="py-6 border-b border-neutral-800">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4 flex items-center justify-between">
                <span>Gemological Specifications</span>
                <span className="text-[11px] text-amber-400/80 font-normal">Verified Specimen</span>
              </h3>

              <div className="overflow-hidden rounded-xl border border-neutral-800/90 bg-neutral-900/40 divide-y divide-neutral-800/80 text-xs">
                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Scale className="h-3.5 w-3.5 text-amber-400/80" /> Carat Weight
                  </span>
                  <span className="font-medium text-neutral-200">{gem.caratWeight.toFixed(2)} ct</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Maximize2 className="h-3.5 w-3.5 text-amber-400/80" /> Millimeter Dimensions
                  </span>
                  <span className="font-medium text-neutral-200">{gem.dimensions}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-amber-400/80" /> Historic Origin
                  </span>
                  <span className="font-medium text-neutral-200">{gem.origin}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400/80" /> Cut & Faceting
                  </span>
                  <span className="font-medium text-neutral-200">{gem.cut}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-amber-400/80" /> Thermal Treatment
                  </span>
                  <span className="font-medium text-emerald-400">{gem.treatment}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-amber-400/80" /> Laboratory Certificate
                  </span>
                  <span className="font-medium text-amber-300">{gem.labCertificate}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-amber-400/80" /> Lab Report Number
                  </span>
                  <span className="font-mono text-[11px] text-neutral-200">{gem.labReportNumber}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <GemActions
              title={gem.title}
              sku={gem.sku}
              price={gem.price}
              formattedPrice={formattedPrice}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

