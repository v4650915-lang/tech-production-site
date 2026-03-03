"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

// Цены на ЧПУ резку (до 100м / от 100м)
const CNC_PRICES: Record<string, { upTo100: number; from100: number }> = {
  "pvc_3mm": { upTo100: 75, from100: 65 },
  "pvc_5mm": { upTo100: 80, from100: 70 },
  "pvc_10mm": { upTo100: 150, from100: 130 },
  "acrylic_3mm": { upTo100: 90, from100: 80 },
  "acrylic_5mm": { upTo100: 120, from100: 100 },
  "acp_3mm": { upTo100: 100, from100: 85 },
  "plywood_6mm": { upTo100: 70, from100: 60 },
  "plywood_10mm": { upTo100: 120, from100: 100 },
};

// Цены на лазерную резку (до 100м / от 100м)
const LASER_PRICES: Record<string, { upTo100: number; from100: number }> = {
  "acrylic_3mm": { upTo100: 110, from100: 95 },
  "acrylic_5mm": { upTo100: 150, from100: 130 },
  "acrylic_8mm": { upTo100: 220, from100: 190 },
  "wood_3mm": { upTo100: 80, from100: 70 },
  "wood_5mm": { upTo100: 120, from100: 100 },
  "wood_10mm": { upTo100: 200, from100: 170 },
  "felt": { upTo100: 90, from100: 75 },
  "leather": { upTo100: 130, from100: 110 },
};

const SMALL_PARTS_SURCHARGE = 0.3; // +30%

export function CuttingCalculator() {
  const { addItem } = useCart();
  
  const [cuttingType, setCuttingType] = useState<"cnc" | "laser">("cnc");
  const [material, setMaterial] = useState<string>("pvc_3mm");
  const [totalLength, setTotalLength] = useState<number>(10);
  const [smallParts, setSmallParts] = useState<boolean>(false);
  const [smallPartsPercent, setSmallPartsPercent] = useState<number>(0);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const prices = cuttingType === "cnc" ? CNC_PRICES : LASER_PRICES;
  const materialPrice = prices[material];

  useEffect(() => {
    if (!materialPrice) return;

    const pricePerMeter = totalLength >= 100 ? materialPrice.from100 : materialPrice.upTo100;
    let total = pricePerMeter * totalLength;

    // Наценка за мелкие детали
    if (smallParts && smallPartsPercent > 0) {
      total += total * SMALL_PARTS_SURCHARGE * (smallPartsPercent / 100);
    }

    setTotalPrice(total);
  }, [cuttingType, material, totalLength, smallParts, smallPartsPercent, materialPrice]);

  const handleAddToCart = () => {
    const materialNames: Record<string, string> = {
      pvc_3mm: "ПВХ 3мм",
      pvc_5mm: "ПВХ 5мм",
      pvc_10mm: "ПВХ 10мм",
      acrylic_3mm: "Акрил 3мм",
      acrylic_5mm: "Акрил 5мм",
      acrylic_8mm: "Акрил 8мм",
      acp_3mm: "АКП 3мм",
      plywood_6mm: "Фанера 6мм",
      plywood_10mm: "Фанера 10мм",
      wood_3mm: "Дерево 3мм",
      wood_5mm: "Дерево 5мм",
      wood_10mm: "Дерево 10мм",
      felt: "Войлок",
      leather: "Кожа",
    };

    const parameters: Record<string, string | number | boolean> = {
      "Тип резки": cuttingType === "cnc" ? "ЧПУ" : "Лазерная",
      "Материал": materialNames[material] || material,
      "Длина реза (пог. м)": totalLength,
    };

    if (smallParts) {
      parameters["Мелкие детали"] = `${smallPartsPercent}%`;
    }

    addItem({
      type: cuttingType === "cnc" ? "cnc_cutting" : "laser_cutting",
      name: `${cuttingType === "cnc" ? "ЧПУ" : "Лазерная"} резка`,
      parameters,
      quantity: 1,
      price: totalPrice,
    });

    toast.success("Добавлено в корзину", {
      description: `Стоимость: ${new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(totalPrice)}`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card id="cutting">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-montserrat">Калькулятор резки</CardTitle>
            <CardDescription>
              ЧПУ и лазерная резка материалов
            </CardDescription>
          </div>
          <Badge variant="outline">{formatPrice(totalPrice)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Тип резки */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={cuttingType === "cnc" ? "default" : "outline"}
            onClick={() => {
              setCuttingType("cnc");
              setMaterial("pvc_3mm");
            }}
          >
            ЧПУ резка
          </Button>
          <Button
            variant={cuttingType === "laser" ? "default" : "outline"}
            onClick={() => {
              setCuttingType("laser");
              setMaterial("acrylic_3mm");
            }}
          >
            Лазерная резка
          </Button>
        </div>

        {/* Материал и длина */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label>Материал</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cuttingType === "cnc" ? (
                  <>
                    <SelectItem value="pvc_3mm">ПВХ 3мм ({CNC_PRICES.pvc_3mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="pvc_5mm">ПВХ 5мм ({CNC_PRICES.pvc_5mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="pvc_10mm">ПВХ 10мм ({CNC_PRICES.pvc_10mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="acrylic_3mm">Акрил 3мм ({CNC_PRICES.acrylic_3mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="acrylic_5mm">Акрил 5мм ({CNC_PRICES.acrylic_5mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="acp_3mm">АКП 3мм ({CNC_PRICES.acp_3mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="plywood_6mm">Фанера 6мм ({CNC_PRICES.plywood_6mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="plywood_10mm">Фанера 10мм ({CNC_PRICES.plywood_10mm.upTo100} ₽)</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="acrylic_3mm">Акрил 3мм ({LASER_PRICES.acrylic_3mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="acrylic_5mm">Акрил 5мм ({LASER_PRICES.acrylic_5mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="acrylic_8mm">Акрил 8мм ({LASER_PRICES.acrylic_8mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="wood_3mm">Дерево 3мм ({LASER_PRICES.wood_3mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="wood_5mm">Дерево 5мм ({LASER_PRICES.wood_5mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="wood_10mm">Дерево 10мм ({LASER_PRICES.wood_10mm.upTo100} ₽)</SelectItem>
                    <SelectItem value="felt">Войлок ({LASER_PRICES.felt.upTo100} ₽)</SelectItem>
                    <SelectItem value="leather">Кожа ({LASER_PRICES.leather.upTo100} ₽)</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Длина реза (пог. м)</Label>
            <Input
              type="number"
              min="1"
              value={totalLength}
              onChange={(e) => setTotalLength(Math.max(1, parseFloat(e.target.value) || 0))}
            />
          </div>
        </div>

        <Separator />

        {/* Наценка за мелкие детали */}
        <div className="flex items-center space-x-4">
          <Checkbox 
            id="smallParts" 
            checked={smallParts} 
            onCheckedChange={(checked) => setSmallParts(checked as boolean)} 
          />
          <Label htmlFor="smallParts" className="flex-1">
            Мелкие детали (+30%)
            <div className="text-xs text-muted-foreground">
              Укажите процент площади с мелкими деталями
            </div>
          </Label>
          {smallParts && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="%"
                className="w-20"
                value={smallPartsPercent || ""}
                onChange={(e) => setSmallPartsPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </motion.div>
          )}
        </div>

        <Separator />

        {/* Информация о цене */}
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <div className="flex justify-between mb-2">
            <span>Цена за пог. м:</span>
            <span className="font-medium">
              {totalLength >= 100 ? materialPrice?.from100 : materialPrice?.upTo100} ₽
              {totalLength >= 100 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Опт
                </Badge>
              )}
            </span>
          </div>
          {smallParts && smallPartsPercent > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Наценка за мелкие детали:</span>
              <span>+{SMALL_PARTS_SURCHARGE * 100}% × {smallPartsPercent}%</span>
            </div>
          )}
        </div>

        {/* Итого и кнопка */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Итоговая стоимость:</div>
            <div className="text-2xl font-bold font-montserrat">{formatPrice(totalPrice)}</div>
          </div>
          <Button size="lg" onClick={handleAddToCart} className="gap-2">
            <Plus className="h-5 w-5" />
            Добавить в корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
