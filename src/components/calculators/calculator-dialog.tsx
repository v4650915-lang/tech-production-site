"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BannerCalculator } from "./banner-calculator";
import { CuttingCalculator } from "./cutting-calculator";
import { UVPrintCalculator } from "./uv-print-calculator";
import { StandsAndSouvenirsCalculator } from "./stands-souvenirs-calculator";
import { Printer, Scissors, Layers, Gift } from "lucide-react";

export type CalculatorType = "banner" | "cutting" | "uv" | "stands" | null;

interface CalculatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calculatorType: CalculatorType;
}

export function CalculatorDialog({ open, onOpenChange, calculatorType }: CalculatorDialogProps) {
  const getTitle = () => {
    switch (calculatorType) {
      case "banner":
        return { title: "Широкоформатная печать", icon: <Printer className="h-5 w-5" /> };
      case "cutting":
        return { title: "Резка материалов", icon: <Scissors className="h-5 w-5" /> };
      case "uv":
        return { title: "УФ-печать", icon: <Layers className="h-5 w-5" /> };
      case "stands":
        return { title: "Стенды и сувениры", icon: <Gift className="h-5 w-5" /> };
      default:
        return { title: "Калькулятор", icon: null };
    }
  };

  const titleData = getTitle();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {titleData.icon}
            {titleData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {calculatorType === "banner" && <BannerCalculator />}
          {calculatorType === "cutting" && <CuttingCalculator />}
          {calculatorType === "uv" && <UVPrintCalculator />}
          {calculatorType === "stands" && <StandsAndSouvenirsCalculator />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
