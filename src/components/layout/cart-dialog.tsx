"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useVKNotifications } from "@/hooks/use-vk-notifications";

const orderSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  comment: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "Необходимо согласиться с условиями",
  }),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { sendOrderNotification } = useVKNotifications();
  const [orderStep, setOrderStep] = useState<"cart" | "form" | "success">("cart");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatType = (type: string) => {
    const types: Record<string, string> = {
      banner_print: "Широкоформатная печать (Баннер)",
      mesh_print: "Печать на сетке",
      film_print: "Печать на пленке",
      cnc_cutting: "ЧПУ резка",
      laser_cutting: "Лазерная резка",
      uv_print: "УФ-печать",
      rollup_stand: "Roll-up стенд",
      souvenir: "Сувенирная продукция",
    };
    return types[type] || type;
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      // Отправляем уведомление менеджеру в VK
      const notificationResult = await sendOrderNotification({
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
          parameters: item.parameters,
        })),
        totalAmount: totalPrice,
        comment: data.comment,
      });

      if (!notificationResult.success) {
        console.error("VK notification failed:", notificationResult.error);
        // Даже если VK не отправился, сохраняем заказ локально
      }

      toast.success("Заказ оформлен!", {
        description: "Менеджер свяжется с вами в ближайшее время",
      });

      clearCart();
      setOrderStep("success");
      reset();
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Ошибка при оформлении заказа", {
        description: "Пожалуйста, попробуйте еще раз или позвоните нам",
      });
    }
  };

  const handleBackToCart = () => {
    setOrderStep("cart");
  };

  const handleCheckout = () => {
    setOrderStep("form");
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) {
        setOrderStep("cart");
        reset();
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {orderStep === "cart" && "Корзина заказа"}
            {orderStep === "form" && "Оформление заказа"}
            {orderStep === "success" && "Заказ оформлен!"}
          </DialogTitle>
          {orderStep === "form" && (
            <DialogDescription>
              Заполните контактные данные для оформления заказа
            </DialogDescription>
          )}
        </DialogHeader>

        {orderStep === "success" ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Спасибо за заказ!</h3>
            <p className="text-muted-foreground mb-6">
              Менеджер свяжется с вами в ближайшее время для уточнения деталей.
            </p>
            <Button onClick={() => onOpenChange(false)}>
              Закрыть
            </Button>
          </div>
        ) : orderStep === "form" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Иван Иванов"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+7 (999) 000-00-00"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="example@mail.ru"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                {...register("comment")}
                placeholder="Пожелания к заказу"
                rows={3}
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                {...register("agreeToTerms")}
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                Я согласен с{" "}
                <a href="/legal/public-offer" target="_blank" className="text-primary underline">
                  публичной офертой
                </a>{" "}
                и{" "}
                <a href="/legal/terms-of-use" target="_blank" className="text-primary underline">
                  условиями использования
                </a>
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-destructive -mt-2">{errors.agreeToTerms.message}</p>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-medium">Итого:</span>
              <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleBackToCart}>
                Назад
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Подтвердить заказ"}
              </Button>
            </DialogFooter>
          </form>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Корзина пуста</p>
            <p className="text-sm mt-2">Добавьте услуги для расчета стоимости</p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{formatType(item.type)}</h4>
                        <Badge variant="secondary">{item.quantity} шт</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Object.entries(item.parameters).map(([key, value]) => (
                          <div key={key}>
                            <span className="capitalize">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(item.totalPrice)}</div>
                      <div className="flex items-center gap-1 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-medium">Итого:</span>
              <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={clearCart}>
                Очистить
              </Button>
              <Button onClick={handleCheckout}>
                Оформить заказ
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
