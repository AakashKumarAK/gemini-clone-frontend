"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Country = { name: string, code: string, dialCode?: string };

export default function CountrySelect({ value, onChange }: { value: string; onChange: (v:string) => void }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    axios.get("https://restcountries.com/v3.1/all?fields=idd,name")
      .then(res => {
        if (cancelled) return;
        const list = (res.data || []).map((c:any) => {
          const idd = c.idd || {};
          const root = idd.root || "";
          const suffixes = idd.suffixes || [];
          const dial = suffixes.length ? `${root}${suffixes[0]}` : root;
          return { name: c.name.common, code: c.cca2 || c.ccn3 || c.name.common, dialCode: dial };
        }).sort((a:any,b:any)=> a.name.localeCompare(b.name));
        setCountries(list);
      })
      .catch(() => setCountries([]))
      .finally(()=> setLoading(false));
    return ()=> { cancelled = true; };
  }, []);

  return (
    <select className="border rounded px-2 py-1 text-slate-700 dark:text-slate-200" value={value} onChange={e=>onChange(e.target.value)} aria-label="Country dial code">
      <option value="">Select country</option>
      {loading ? <option>Loading...</option> : countries.map(c => (
        <option key={c.name + c.dialCode} value={c.dialCode || c.name}>
          {c.name} {c.dialCode ? `(${c.dialCode})` : ""}
        </option>
      ))}
    </select>
  );
}
