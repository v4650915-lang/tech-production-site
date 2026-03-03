"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  Scissors,
  MonitorSmartphone,
  Gift,
  Layers,
  Target
} from "lucide-react";
import { ServiceCard } from "./service-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalculatorType } from "@/components/calculators/calculator-dialog";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "printing" | "cutting" | "stands" | "souvenirs" | "signs";
  calculatorType?: CalculatorType;
}

const services: Service[] = [
  {
    icon: <Printer className="h-10 w-10" />,
    title: "Широкоформатная печать",
    description: "Печать на баннере, сетке, пленке. Люверсы, проклейка.",
    category: "printing" as const,
    calculatorType: "banner",
  },
  {
    icon: <Layers className="h-10 w-10" />,
    title: "Интерьерная печать",
    description: "Высококачественная печать для внутреннего оформления.",
    category: "printing" as const,
    calculatorType: "banner",
  },
  {
    icon: <Scissors className="h-10 w-10" />,
    title: "Плоттерная резка",
    description: "Раскрой пленки, бумаги, картона по контуру.",
    category: "cutting" as const,
    calculatorType: "cutting",
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "ЧПУ резка",
    description: "Раскрой оргстекла, ПВХ, АКП, фанеры на ЧПУ станке.",
    category: "cutting" as const,
    calculatorType: "cutting",
  },
  {
    icon: <Scissors className="h-10 w-10" />,
    title: "Лазерная резка",
    description: "Точная лазерная резка акрила, дерева, кожи.",
    category: "cutting" as const,
    calculatorType: "cutting",
  },
  {
    icon: <MonitorSmartphone className="h-10 w-10" />,
    title: "Мобильные стенды",
    description: "Roll-up, X-banner, пресс-воллы. Быстрый монтаж.",
    category: "stands" as const,
    calculatorType: "stands",
  },
  {
    icon: <Gift className="h-10 w-10" />,
    title: "Сувенирная продукция",
    description: "Кружки, футболки, ручки, календари с вашим дизайном.",
    category: "souvenirs" as const,
    calculatorType: "stands",
  },
  {
    icon: <Printer className="h-10 w-10" />,
    title: "УФ-печать",
    description: "Прямая УФ-печать на различных материалах.",
    category: "printing" as const,
    calculatorType: "uv",
  },
];

const categories = [
  { id: "all", label: "Все" },
  { id: "printing", label: "Печать" },
  { id: "cutting", label: "Резка" },
  { id: "stands", label: "Стенды" },
  { id: "souvenirs", label: "Сувениры" },
];

export function Showcase() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter(s => s.category === activeCategory);

  const handleCardClick = (calculatorType?: CalculatorType) => {
    if (calculatorType) {
      // Dispatch custom event to open calculator from parent
      window.dispatchEvent(new CustomEvent('open-calculator', { detail: { type: calculatorType } }));
    }
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            Наши услуги
          </Badge>
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
            Полный цикл рекламного производства
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            От широкоформатной печати до сувенирной продукции — всё в одном месте
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                {...service}
                onClick={() => handleCardClick(service.calculatorType)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
