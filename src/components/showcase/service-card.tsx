"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "printing" | "cutting" | "stands" | "souvenirs" | "signs";
  calculatorType?: "banner" | "cutting" | "uv" | "stands" | null;
  onClick?: () => void;
}

export function ServiceCard({ icon, title, description, category, calculatorType, onClick }: ServiceCardProps) {
  const categoryColors: Record<string, string> = {
    printing: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    cutting: "from-orange-500/20 to-red-500/20 border-orange-500/30",
    stands: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    souvenirs: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    signs: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Card 
        className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-gradient-to-br ${categoryColors[category]} backdrop-blur-sm`}
        onClick={onClick}
      >
        <CardHeader>
          <div className="mb-2 text-primary">{icon}</div>
          <CardTitle className="font-montserrat">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" className="group">
            Рассчитать
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
