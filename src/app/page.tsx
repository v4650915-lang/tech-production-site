"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Showcase } from "@/components/showcase/showcase";
import { SignsShowcase } from "@/components/showcase/signs-showcase";
import { LaserCuttingPortfolio } from "@/components/showcase/laser-portfolio";
import { CalculatorDialog, CalculatorType } from "@/components/calculators/calculator-dialog";
import { BannerCalculator } from "@/components/calculators/banner-calculator";
import { CuttingCalculator } from "@/components/calculators/cutting-calculator";
import { UVPrintCalculator } from "@/components/calculators/uv-print-calculator";
import { StandsAndSouvenirsCalculator } from "@/components/calculators/stands-souvenirs-calculator";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";

export default function Home() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);

  const openCalculator = (type: CalculatorType) => {
    setActiveCalculator(type);
    setCalculatorOpen(true);
  };

  // Listen for custom events from Showcase
  React.useEffect(() => {
    const handleOpenCalculator = (event: CustomEvent<{ type: CalculatorType }>) => {
      openCalculator(event.detail.type);
    };

    window.addEventListener('open-calculator', handleOpenCalculator as EventListener);
    return () => window.removeEventListener('open-calculator', handleOpenCalculator as EventListener);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-800" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Рекламно-производственная компания{" "}
              <span className="text-primary">Технология</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Широкоформатная и интерьерная печать, плоттерная и лазерная резка, 
              мобильные стенды и сувенирная продукция в Нижневартовске
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}>
                Контакты
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* Showcase */}
      <Showcase />

      {/* Signs Showcase - Portfolio */}
      <SignsShowcase />

      {/* Laser Cutting & Mangals Portfolio */}
      <LaserCuttingPortfolio />

      {/* Calculators Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              Калькуляторы услуг
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Рассчитайте стоимость онлайн за несколько кликов
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            <BannerCalculator />
            <CuttingCalculator />
            <UVPrintCalculator />
            <StandsAndSouvenirsCalculator />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              Почему выбирают нас
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Собственное производство",
                description: "Полный цикл работ без посредников — от дизайна до монтажа",
              },
              {
                title: "Современное оборудование",
                description: "Японские принтеры Epson, ЧПУ и лазерные станки",
              },
              {
                title: "Оперативные сроки",
                description: "Изготовление от 1 дня. Срочная печать в день обращения",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg border bg-card"
              >
                <h3 className="font-montserrat font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              Готовы сделать заказ?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для консультации и расчета стоимости вашего проекта
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+73466312204">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Phone className="h-5 w-5" />
                  8 (3466) 31-22-04
                </Button>
              </a>
              <a href="mailto:uv-nv@mail.ru">
                <Button size="lg" variant="outline" className="gap-2 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                  <Mail className="h-5 w-5" />
                  uv-nv@mail.ru
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Dialog */}
      <CalculatorDialog 
        open={calculatorOpen} 
        onOpenChange={setCalculatorOpen}
        calculatorType={activeCalculator}
      />
    </div>
  );
}
