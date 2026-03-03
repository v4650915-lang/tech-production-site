"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Monitor, Coffee, Shirt, FileText } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

// Цены на Roll-up стенды
const ROLLUP_PRICES = [
  { quantity: { min: 1, max: 5 }, price: 3020 },
  { quantity: { min: 6, max: 10 }, price: 2800 },
  { quantity: { min: 11, max: Infinity }, price: 2500 },
];

// Цены на кружки (сублимация)
const MUG_PRICES = [
  { quantity: { min: 1, max: 9 }, price: 470 },
  { quantity: { min: 10, max: 49 }, price: 350 },
  { quantity: { min: 50, max: 99 }, price: 280 },
  { quantity: { min: 100, max: Infinity }, price: 230 },
];

// Цены на футболки (сублимация)
const TSHIRT_PRICES = [
  { quantity: { min: 1, max: 9 }, price: 850 },
  { quantity: { min: 10, max: 49 }, price: 650 },
  { quantity: { min: 50, max: 99 }, price: 520 },
  { quantity: { min: 100, max: Infinity }, price: 450 },
];

// Цены на календари
const CALENDAR_PRICES = [
  { quantity: { min: 1, max: 49 }, price: 180 },
  { quantity: { min: 50, max: 99 }, price: 140 },
  { quantity: { min: 100, max: Infinity }, price: 110 },
];

function getPriceByQuantity(prices: typeof ROLLUP_PRICES, quantity: number): number {
  const tier = prices.find(t => quantity >= t.quantity.min && quantity <= t.quantity.max);
  return tier?.price || prices[0].price;
}

export function StandsAndSouvenirsCalculator() {
  const { addItem } = useCart();
  
  const [activeTab, setActiveTab] = useState<"rollup" | "mug" | "tshirt" | "calendar">("rollup");
  
  // Roll-up
  const [rollupQuantity, setRollupQuantity] = useState<number>(1);
  const [rollupPrice, setRollupPrice] = useState<number>(3020);
  
  // Кружки
  const [mugQuantity, setMugQuantity] = useState<number>(1);
  const [mugPrice, setMugPrice] = useState<number>(470);
  
  // Футболки
  const [tshirtQuantity, setTshirtQuantity] = useState<number>(1);
  const [tshirtPrice, setTshirtPrice] = useState<number>(850);
  
  // Календари
  const [calendarQuantity, setCalendarQuantity] = useState<number>(1);
  const [calendarPrice, setCalendarPrice] = useState<number>(180);

  useEffect(() => {
    setRollupPrice(getPriceByQuantity(ROLLUP_PRICES, rollupQuantity));
  }, [rollupQuantity]);

  useEffect(() => {
    setMugPrice(getPriceByQuantity(MUG_PRICES, mugQuantity));
  }, [mugQuantity]);

  useEffect(() => {
    setTshirtPrice(getPriceByQuantity(TSHIRT_PRICES, tshirtQuantity));
  }, [tshirtQuantity]);

  useEffect(() => {
    setCalendarPrice(getPriceByQuantity(CALENDAR_PRICES, calendarQuantity));
  }, [calendarQuantity]);

  const handleAddToCart = (type: string, name: string, quantity: number, price: number) => {
    const parameters: Record<string, string | number> = {
      "Количество": quantity,
      "Цена за шт": price,
    };

    addItem({
      type: type as any,
      name,
      parameters,
      quantity: 1,
      price: price * quantity,
    });

    toast.success("Добавлено в корзину", {
      description: `Стоимость: ${new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price * quantity)}`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    switch (activeTab) {
      case "rollup": return rollupPrice * rollupQuantity;
      case "mug": return mugPrice * mugQuantity;
      case "tshirt": return tshirtPrice * tshirtQuantity;
      case "calendar": return calendarPrice * calendarQuantity;
    }
  };

  return (
    <div className="space-y-6" id="stands">
      {/* Roll-up стенды */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="font-montserrat">Roll-up стенды</CardTitle>
                <CardDescription>Мобильные выставочные стенды</CardDescription>
              </div>
            </div>
            <Badge variant="outline">{formatPrice(rollupPrice * rollupQuantity)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Количество (шт)</Label>
              <Input
                type="number"
                min="1"
                value={rollupQuantity}
                onChange={(e) => setRollupQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <div>
              <Label>Цена за шт</Label>
              <div className="text-lg font-semibold pt-2">
                {formatPrice(rollupPrice)}
                {rollupQuantity >= 6 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Опт
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => handleAddToCart("rollup_stand", "Roll-up стенд", rollupQuantity, rollupPrice)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить в корзину
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Сувенирная продукция */}
      <Card id="souvenirs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="font-montserrat">Сувенирная продукция</CardTitle>
              <CardDescription>Сублимационная печать</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="mug" className="gap-2">
                <Coffee className="h-4 w-4" />
                Кружки
              </TabsTrigger>
              <TabsTrigger value="tshirt" className="gap-2">
                <Shirt className="h-4 w-4" />
                Футболки
              </TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2">
                <FileText className="h-4 w-4" />
                Календари
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mug" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Количество (шт)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={mugQuantity}
                    onChange={(e) => setMugQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <Label>Цена за шт</Label>
                  <div className="text-lg font-semibold pt-2">
                    {formatPrice(mugPrice)}
                    {mugQuantity >= 100 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Опт
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleAddToCart("souvenir", "Кружка с принтом", mugQuantity, mugPrice)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tshirt" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Количество (шт)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={tshirtQuantity}
                    onChange={(e) => setTshirtQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <Label>Цена за шт</Label>
                  <div className="text-lg font-semibold pt-2">
                    {formatPrice(tshirtPrice)}
                    {tshirtQuantity >= 100 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Опт
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleAddToCart("souvenir", "Футболка с принтом", tshirtQuantity, tshirtPrice)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Количество (шт)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={calendarQuantity}
                    onChange={(e) => setCalendarQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <Label>Цена за шт</Label>
                  <div className="text-lg font-semibold pt-2">
                    {formatPrice(calendarPrice)}
                    {calendarQuantity >= 100 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Опт
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => handleAddToCart("souvenir", "Календарь", calendarQuantity, calendarPrice)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Отдельный компонент для иконки
function Gift({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}
