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

// Цены на УФ-печать (руб/м²)
const UV_PRINT_PRICES = {
  customer_material: 800, // Печать на материале заказчика
  company_material: 1200, // Печать на материале компании
};

const WHITE_COLOR_PRICE = 500; // руб/м²
const VARNISH_SURCHARGE = 0.2; // +20%

export function UVPrintCalculator() {
  const { addItem } = useCart();
  
  const [materialType, setMaterialType] = useState<"customer" | "company">("customer");
  const [width, setWidth] = useState<number>(1);
  const [length, setLength] = useState<number>(1);
  const [whiteColor, setWhiteColor] = useState<boolean>(false);
  const [varnish, setVarnish] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [area, setArea] = useState<number>(0);

  useEffect(() => {
    const calculatedArea = width * length;
    setArea(calculatedArea);

    const basePrice = materialType === "customer" 
      ? UV_PRINT_PRICES.customer_material 
      : UV_PRINT_PRICES.company_material;

    let total = basePrice * calculatedArea;

    // Белый цвет
    if (whiteColor) {
      total += WHITE_COLOR_PRICE * calculatedArea;
    }

    // Лак
    if (varnish) {
      total *= (1 + VARNISH_SURCHARGE);
    }

    setTotalPrice(total);
  }, [materialType, width, length, whiteColor, varnish]);

  const handleAddToCart = () => {
    const parameters: Record<string, string | number | boolean> = {
      "Материал": materialType === "customer" ? "Материал заказчика" : "Материал компании",
      "Ширина (м)": width,
      "Длина (м)": length,
      "Площадь (м²)": area,
    };

    if (whiteColor) {
      parameters["Белый цвет"] = `+${WHITE_COLOR_PRICE} ₽/м²`;
    }
    if (varnish) {
      parameters["Лак"] = `+${VARNISH_SURCHARGE * 100}%`;
    }

    addItem({
      type: "uv_print",
      name: "УФ-печать",
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-montserrat">Калькулятор УФ-печати</CardTitle>
            <CardDescription>
              Прямая печать на различных материалах
            </CardDescription>
          </div>
          <Badge variant="outline">{formatPrice(totalPrice)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Тип материала */}
        <div>
          <Label>Тип материала</Label>
          <Select value={materialType} onValueChange={(v) => setMaterialType(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">
                Материал заказчика ({UV_PRINT_PRICES.customer_material} ₽/м²)
              </SelectItem>
              <SelectItem value="company">
                Материал компании ({UV_PRINT_PRICES.company_material} ₽/м²)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Размеры */}
        <div className="grid grid-cols-3 gap-4">
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
          <h4 className="font-semibold text-sm">Дополнительные опции</h4>
          
          {/* Белый цвет */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="whiteColor" 
                checked={whiteColor} 
                onCheckedChange={(checked) => setWhiteColor(checked as boolean)} 
              />
              <Label htmlFor="whiteColor">
                Белый цвет
                <div className="text-xs text-muted-foreground">+{WHITE_COLOR_PRICE} ₽/м²</div>
              </Label>
            </div>
            {whiteColor && (
              <span className="text-sm font-medium">
                {formatPrice(WHITE_COLOR_PRICE * area)}
              </span>
            )}
          </div>

          {/* Лак */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="varnish" 
                checked={varnish} 
                onCheckedChange={(checked) => setVarnish(checked as boolean)} 
              />
              <Label htmlFor="varnish">
                Лакирование
                <div className="text-xs text-muted-foreground">+{VARNISH_SURCHARGE * 100}% к стоимости</div>
              </Label>
            </div>
            {varnish && (
              <span className="text-sm font-medium text-green-600">
                +{VARNISH_SURCHARGE * 100}%
              </span>
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
