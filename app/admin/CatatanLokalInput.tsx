"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { generateCatatanLokalAI } from "./actions";

export default function CatatanLokalInput({ defaultValue = "", kotaInputId = "" }) {
  const [text, setText] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    let kotaName = "Kota Anda";
    if (kotaInputId) {
      const input = document.getElementById(kotaInputId) as HTMLInputElement;
      if (input && input.value) {
        kotaName = input.value;
      }
    }

    setIsLoading(true);
    const result = await generateCatatanLokalAI(kotaName);
    if (result?.error) {
      setErrorMsg(result.error);
    } else if (result?.text) {
      setText(result.text);
    }
    setIsLoading(false);
  };

  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium">Catatan Lokal (SEO) <span className="text-xs text-slate-500 font-normal">- Opsional</span></label>
      <div className="mt-1 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <button 
            type="button" 
            onClick={handleGenerate}
            disabled={isLoading}
            className="inline-flex items-center rounded-md bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-200 transition-colors"
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1" />}
            Generate dengan AI
          </button>
          {errorMsg && <span className="text-xs text-red-600">{errorMsg}</span>}
        </div>
        <textarea 
          name="artikel_seo" 
          rows={4} 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Teks lokal spesifik untuk SEO di kota ini..." 
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" 
        />
      </div>
    </div>
  );
}
