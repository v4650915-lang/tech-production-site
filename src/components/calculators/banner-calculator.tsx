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

// Цены из прайс-листа
const BANNER_PRICES = {
  340: { upTo50: 350, from50: 300 },
  440: { upTo50: 420, from50: 370 },
  510: { upTo50: 490, from50: 440 },
};

const MESH_PRICE = { upTo50: 550, from50: 480 };
const FILM_PRICE = { upTo50: 380, from50: 320 };

const EYELET_PRICES = {
  10: 21,
  12: 26,
};

const GLUING_PRICE = 55; // руб/пог. м

export function BannerCalculator() {
  const { addItem } = useCart();
  
  const [material, setMaterial] = useState<"340" | "440" | "510" | "mesh" | "film">("440");
  const [width, setWidth] = useState<number>(1);
  const [length, setLength] = useState<number>(1);
  const [eyelets, setEyelets] = useState<boolean>(false);
  const [eyeletDiameter, setEyeletDiameter] = useState<"10" | "12">("10");
  const [eyeletCount, setEyeletCount] = useState<number>(0);
  const [gluing, setGluing] = useState<boolean>(false);
  const [gluingLength, setGluingLength] = useState<number>(0);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [area, setArea] = useState<number>(0);

  useEffect(() => {
    const calculatedArea = width * length;
    setArea(calculatedArea);

    let basePrice = 0;

    // Расчет стоимости печати
    if (material === "mesh") {
      basePrice = calculatedArea >= 50 ? MESH_PRICE.from50 : MESH_PRICE.upTo50;
    } else if (material === "film") {
      basePrice = calculatedArea >= 50 ? FILM_PRICE.from50 : FILM_PRICE.upTo50;
    } else {
      const prices = BANNER_PRICES[material as "340" | "440" | "510"];
      basePrice = calculatedArea >= 50 ? prices.from50 : prices.upTo50;
    }

    let total = basePrice * calculatedArea;

    // Люверсы
    if (eyelets) {
      const pricePerEyelet = EYELET_PRICES[eyeletDiameter as "10" | "12"];
      total += pricePerEyelet * eyeletCount;
    }

    // Проклейка
    if (gluing) {
      total += GLUING_PRICE * gluingLength;
    }

    setTotalPrice(total);
  }, [material, width, length, eyelets, eyeletDiameter, eyeletCount, gluing, gluingLength]);

  const handleAddToCart = () => {
    const parameters: Record<string, string | number | boolean> = {
      "Материал": material === "mesh" ? "Сетка" : material === "film" ? "Пленка" : `Баннер ${material}г`,
      "Ширина (м)": width,
      "Длина (м)": length,
      "Площадь (м²)": area,
    };

    if (eyelets) {
      parameters["Люверсы"] = `Ø${eyeletDiameter}мм × ${eyeletCount} шт`;
    }
    if (gluing) {
      parameters["Проклейка"] = `${gluingLength} пог. м`;
    }

    addItem({
      type: material === "mesh" ? "mesh_print" : material === "film" ? "film_print" : "banner_print",
      name: "Широкоформатная печать",
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
    <Card id="printing">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-montserrat">Калькулятор широкоформатной печати</CardTitle>
            <CardDescription>
              Баннер, сетка, пленка • Люверсы • Проклейка
            </CardDescription>
          </div>
          <Badge variant="outline">{formatPrice(totalPrice)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Материал */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label>Материал</Label>
            <Select value={material} onValueChange={(v) => setMaterial(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="340">Баннер 340г</SelectItem>
                <SelectItem value="440">Баннер 440г</SelectItem>
                <SelectItem value="510">Баннер 510г</SelectItem>
                <SelectItem value="mesh">Сетка</SelectItem>
                <SelectItem value="film">Пленка</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Ширина (м)</Label>
            <Input
              type="number"
              step="0.1"
              min="0.1"
              value={width}
              onChange={(e) => setWidth(Math.max(0.1, parseFloat(e.target.value) || 0))}
            />
          </div>
          <div>
            <Label>Длина (м)</Label>
            <Input
              type="number"
              step="0.1"
              min="0.1"
              value={length}
              onChange={(e) => setLength(Math.max(0.1, parseFloat(e.target.value) || 0))}
            />
          </div>
          <div>
            <Label>Площадь</Label>
            <div className="text-sm font-medium pt-2">{area.toFixed(2)} м²</div>
          </div>
        </div>

        <Separator />

        {/* Дополнительные опции */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Дополнительные работы</h4>
          
          {/* Люверсы */}
          <div className="flex items-center space-x-4">
            <Checkbox 
              id="eyelets" 
              checked={eyelets} 
              onCheckedChange={(checked) => setEyelets(checked as boolean)} 
            />
            <Label htmlFor="eyelets" className="flex-1">Люверсы</Label>
            {eyelets && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <Select value={eyeletDiameter} onValueChange={(v) => setEyeletDiameter(v as any)}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Ø10мм ({EYELET_PRICES[10]} ₽)</SelectItem>
                    <SelectItem value="12">Ø12мм ({EYELET_PRICES[12]} ₽)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min="0"
                  placeholder="Кол-во"
                  className="w-24"
                  value={eyeletCount || ""}
                  onChange={(e) => setEyeletCount(parseInt(e.target.value) || 0)}
                />
                <span className="text-sm text-muted-foreground">
                  {eyeletCount > 0 && formatPrice(EYELET_PRICES[eyeletDiameter as "10" | "12"] * eyeletCount)}
                </span>
              </motion.div>
            )}
          </div>

          {/* Проклейка */}
          <div className="flex items-center space-x-4">
            <Checkbox 
              id="gluing" 
              checked={gluing} 
              onCheckedChange={(checked) => setGluing(checked as boolean)} 
            />
            <Label htmlFor="gluing" className="flex-1">Проклейка/склейка ({GLUING_PRICE} ₽/пог. м)</Label>
            {gluing && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Длина"
                  className="w-24"
                  value={gluingLength || ""}
                  onChange={(e) => setGluingLength(parseFloat(e.target.value) || 0)}
                />
                <span className="text-sm text-muted-foreground">
                  {gluingLength > 0 && formatPrice(GLUING_PRICE * gluingLength)}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        <Separator />

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
