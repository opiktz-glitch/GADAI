"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppButton({ 
  noWa, 
  messageTemplate, 
  buttonText = "Tanya Admin via WA" 
}: { 
  noWa: string, 
  messageTemplate: string,
  buttonText?: string
}) {
  const [url, setUrl] = useState(`https://wa.me/${noWa}`);

  useEffect(() => {
    // Mendapatkan URL domain secara dinamis
    const host = window.location.host;
    const finalMessage = messageTemplate.replace("[host]", host);
    setUrl(`https://wa.me/${noWa}?text=${encodeURIComponent(finalMessage)}`);
  }, [noWa, messageTemplate]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center space-x-2 rounded-full bg-green-500 px-6 py-4 text-center font-bold text-white shadow-xl transition-transform hover:scale-105 hover:bg-green-600 sm:w-auto"
    >
      <MessageCircle className="h-6 w-6" />
      <span>{buttonText}</span>
    </a>
  );
}
