import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, MapPin, Sparkles, Scale, Compass } from 'lucide-react';

export interface GemData {
  _id: string;
  title: string;
  slug?: string;
  sku?: string;
  origin: string;
  caratWeight: number;
  cut: string;
  labCertificate: string;
  labReportNumber?: string;
  price: number;
  image: string;
  images?: string[];
  color?: string;
  clarity?: string;
  species?: string;
  dimensions?: string;
  treatment?: string;
  description?: string;
  status?: string;
}

interface GemCardProps {
  gem: GemData;
}

export default function GemCard({ gem }: GemCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(gem.price);

  const href = gem.slug ? `/gems/${gem.slug}` : `/gems/${gem._id}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 backdrop-blur-md shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10">
      {/* Gem Visual Image Showcase */}
      <Link href={href} className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-950 cursor-pointer">
        <Image
          src={gem.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'}
          alt={gem.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Certificate Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-neutral-950/80 px-3 py-1 text-xs font-medium tracking-wide text-amber-300 backdrop-blur-md shadow-lg">
          <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span className="truncate max-w-[150px]">{gem.labCertificate}</span>
        </div>

        {/* Origin Pill */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1 rounded-md bg-neutral-900/80 px-2.5 py-1 text-xs text-neutral-300 border border-neutral-800 backdrop-blur-sm">
          <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
          <span>{gem.origin}</span>
        </div>
      </Link>

      {/* Gem Information Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Title */}
          <Link href={href}>
            <h3 className="font-serif text-xl font-semibold tracking-wide text-neutral-100 transition-colors duration-200 group-hover:text-amber-200 line-clamp-1">
              {gem.title}
            </h3>
          </Link>

          {/* Key Gemological Specifications Grid */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-y border-neutral-800/80 py-3.5 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-400/70" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Weight</span>
                <span className="font-medium text-neutral-200">{gem.caratWeight.toFixed(2)} Carats</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-amber-400/70" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Cut</span>
                <span className="font-medium text-neutral-200 truncate block max-w-[110px]">{gem.cut}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-5 flex items-center justify-between pt-2">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Acquisition Price</span>
            <div className="font-serif text-2xl font-bold tracking-tight text-amber-400">
              {formattedPrice}
            </div>
          </div>

          <Link
            href={href}
            className="flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-300 transition-all duration-300 hover:bg-amber-400 hover:text-neutral-950 group-hover:border-amber-400/60 shadow-sm cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>View Specimen</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
