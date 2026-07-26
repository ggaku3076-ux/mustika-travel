"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface BrandContextType {
  brandName: string;
  brandPhone: string;
  isCustomBrand: boolean;
}

const BrandContext = createContext<BrandContextType>({
  brandName: "Mustika Travel",
  brandPhone: "0812-3456-789",
  isCustomBrand: false,
});

function BrandSearchParamsHandler({ setBrand }: { setBrand: (b: { name: string; phone: string; custom: boolean }) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawNama = searchParams.get("nama") || searchParams.get("brand") || searchParams.get("travel");
    const rawPhone = searchParams.get("wa") || searchParams.get("phone") || "0812-3456-789";

    if (rawNama && rawNama.trim() !== "") {
      setBrand({
        name: rawNama.trim(),
        phone: rawPhone.trim(),
        custom: true,
      });
    } else {
      setBrand({
        name: "Mustika Travel",
        phone: "0812-3456-789",
        custom: false,
      });
    }
  }, [searchParams, setBrand]);

  return null;
}

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState({
    name: "Mustika Travel",
    phone: "0812-3456-789",
    custom: false,
  });

  return (
    <BrandContext.Provider value={{ brandName: brand.name, brandPhone: brand.phone, isCustomBrand: brand.custom }}>
      <Suspense fallback={null}>
        <BrandSearchParamsHandler setBrand={setBrand} />
      </Suspense>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
