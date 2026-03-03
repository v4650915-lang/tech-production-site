"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, Hammer, Home, Utensils } from "lucide-react";
import { useState } from "react";

// Портфолио работ лазерной резки и мангалов
const portfolioItems = [
  {
    id: 1,
    src: "/laser_cutting/Мангалы..jpg",
    title: "Мангалы с лазерной резкой",
    description: "Художественная лазерная резка металла. Индивидуальный дизайн.",
    category: "mangals",
    icon: <Hammer className="h-5 w-5" />,
  },
  {
    id: 2,
    src: "/laser_cutting/Мангальные беседки..jpg",
    title: "Мангальные беседки",
    description: "Комплексные решения для отдыха на природе.",
    category: "mangals",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 3,
    src: "/laser_cutting/журнальный стол из металла с художественной лазерной резкой.jpg",
    title: "Журнальные столы",
    description: "Металлические столы с художественной лазерной резкой.",
    category: "furniture",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 4,
    src: "/laser_cutting/Приставные столики.jpg",
    title: "Приставные столики",
    description: "Компактные столики с элементами лазерной резки.",
    category: "furniture",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 5,
    src: "/laser_cutting/Лазерная резка таблички..jpg",
    title: "Таблички и вывески",
    description: "Лазерная резка табличек для офиса и улицы.",
    category: "signs",
    icon: <ZoomIn className="h-5 w-5" />,
  },
  {
    id: 6,
    src: "/laser_cutting/Лазерная резка подставки..jpg",
    title: "Подставки и держатели",
    description: "Декоративные подставки с лазерной резкой.",
    category: "decor",
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    id: 7,
    src: "/laser_cutting/Лазерная резка ворота оградки..jpg",
    title: "Ворота и ограждения",
    description: "Металлические ворота с художественной резкой.",
    category: "fencing",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 8,
    src: "/laser_cutting/лазерная резка полки.jpg",
    title: "Полки и стеллажи",
    description: "Металлические полки с элементами лазерной резки.",
    category: "furniture",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 9,
    src: "/laser_cutting/photo_2026-02-21_01-49-02.jpg",
    title: "Декоративные элементы",
    description: "Уникальные декоративные изделия из металла.",
    category: "decor",
    icon: <ZoomIn className="h-5 w-5" />,
  },
];

const categoryLabels: Record<string, string> = {
  mangals: "Мангалы",
  furniture: "Мебель",
  signs: "Таблички",
  decor: "Декор",
  fencing: "Ограждения",
};

export function LaserCuttingPortfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            Портфолио
          </Badge>
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
            ЛАЗЕРНАЯ РЕЗКА И МАНГАЛЫ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Примеры наших работ по художественной лазерной резке металла
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Card className="overflow-hidden cursor-pointer group h-full">
                <div 
                  className="relative aspect-square overflow-hidden"
                  onClick={() => handleImageClick(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        {item.icon}
                        <Badge variant="secondary" className="text-xs">
                          {categoryLabels[item.category]}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                  </div>
                  <button 
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Увеличить"
                  >
                    <ZoomIn className="h-5 w-5 text-foreground" />
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline">Цена по запросу</Badge>
                    <Button size="sm" variant="outline">
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dialog для просмотра изображения */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedItem?.icon}
                {selectedItem?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="relative">
              <img
                src={selectedItem?.src || ""}
                alt={selectedItem?.title || ""}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            {selectedItem && (
              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedItem.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm">
                    {categoryLabels[selectedItem.category]}
                  </Badge>
                  <Button onClick={() => setDialogOpen(false)}>
                    Закрыть
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
