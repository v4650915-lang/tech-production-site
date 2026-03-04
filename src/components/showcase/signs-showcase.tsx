"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProducts } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, X, ZoomIn } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export function SignsShowcase() {
  const { products, loading } = useProducts("signs");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    if (price === 0) return "По запросу";
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      type: "product",
      product,
      name: product.name,
      parameters: {
        "Категория": "Вывески",
        "Описание": product.description,
      },
      quantity: 1,
      price: product.price || 0,
    });

    toast.success("Добавлено в корзину", {
      description: `${product.name}: ${formatPrice(product.price || 0)}`,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
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
            НАШИ РАБОТЫ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Вывески, которые говорят о вас больше, чем слова
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="overflow-hidden cursor-pointer group h-full flex flex-col">
                    <div
                      className="relative overflow-hidden aspect-[4/3] cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setImageDialogOpen(true);
                      }}
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-montserrat font-semibold text-lg">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg font-bold font-montserrat">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.price === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Заказать
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name || "Просмотр изображения"}</DialogTitle>
            <DialogDescription>
              {selectedProduct?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <img
              src={selectedProduct?.image_url || ""}
              alt={selectedProduct?.name || ""}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
          {selectedProduct && (
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">
                {formatPrice(selectedProduct.price)}
              </span>
              <Button onClick={() => {
                handleAddToCart(selectedProduct);
                setImageDialogOpen(false);
              }}>
                Добавить в корзину
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
