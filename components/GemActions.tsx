'use client';

import React from 'react';
import { MessageCircle, ShoppingBag, ShieldCheck, Lock, Sparkles } from 'lucide-react';

interface GemActionsProps {
  title: string;
  sku: string;
  price: number;
  formattedPrice: string;
}

export default function GemActions({ title, sku, price, formattedPrice }: GemActionsProps) {
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890').replace(/[^0-9+]/g, '');

  const inquiryMessage = encodeURIComponent(
    `Hello L'Écrin Impérial Concierge,\n\nI am interested in acquiring the following certified gemstone from your vault:\n\n• Gemstone: ${title}\n• SKU: ${sku}\n• Listed Price: ${formattedPrice}\n\nPlease provide high-resolution certification scans and arrange a private acquisition consultation.\n\nThank you.`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${inquiryMessage}`;

  const handleInstantCheckout = () => {
    alert(`Initiating secure vault checkout for ${title} (${sku}) at ${formattedPrice}. In a full checkout flow, this connects to Stripe or wire transfer escrow.`);
  };

  return (
    <div className="flex flex-col gap-3.5 pt-4">
      {/* High-Ticket VIP WhatsApp Concierge Inquiry Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-6 py-4 text-center font-medium text-white shadow-lg shadow-emerald-950/40 transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.99] cursor-pointer"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageCircle className="h-5 w-5 fill-white/20 text-white" />
        <span className="text-sm font-semibold tracking-wide">Inquire via VIP WhatsApp Concierge</span>
      </a>

      {/* Instant Checkout Button */}
      <button
        type="button"
        onClick={handleInstantCheckout}
        className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-yellow-500/15 px-6 py-3.5 font-medium text-amber-200 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950 shadow-md active:scale-[0.99] cursor-pointer"
      >
        <ShoppingBag className="h-4 w-4" />
        <span className="text-sm font-semibold tracking-wide">Instant Checkout ({formattedPrice})</span>
      </button>

      {/* Security & Buyer Protection Notes */}
      <div className="mt-2 flex items-center justify-center gap-6 text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5 text-amber-400" />
          <span>Encrypted Escrow</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          <span>Insured Armored Delivery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>100% Lifetime Guarantee</span>
        </div>
      </div>
    </div>
  );
}

