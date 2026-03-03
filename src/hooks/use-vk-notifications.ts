"use client";

import { useCallback } from "react";

const VK_TOKEN = process.env.VK_TOKEN;
const ADMIN_ID = process.env.VK_ADMIN_ID || "5537151";

export function useVKNotifications() {
  const sendOrderNotification = useCallback(async (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    items: any[];
    totalAmount: number;
    comment?: string;
  }) => {
    try {
      // Формируем сообщение для менеджера
      const message = buildOrderMessage(orderData);
      
      // Отправляем через VK API
      const response = await fetch("https://api.vk.com/method/messages.send", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          user_id: ADMIN_ID,
          message: message,
          random_id: Math.floor(Math.random() * 1000000).toString(),
          access_token: VK_TOKEN || "",
          v: "5.215",
        }),
      });

      const result = await response.json();
      
      if (result.error) {
        console.error("VK API Error:", result.error);
        return { success: false, error: result.error.error_msg };
      }
      
      return { success: true, response: result.response };
    } catch (error) {
      console.error("Failed to send VK notification:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }, []);

  return { sendOrderNotification };
}

function buildOrderMessage(orderData: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: any[];
  totalAmount: number;
  comment?: string;
}): string {
  let message = `🔔 *НОВЫЙ ЗАКАЗ НА САЙТЕ*\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `👤 *Клиент:* ${orderData.customerName}\n`;
  message += `📞 *Телефон:* ${orderData.customerPhone}\n`;
  if (orderData.customerEmail) {
    message += `📧 *Email:* ${orderData.customerEmail}\n`;
  }
  
  message += `\n📦 *ЗАКАЗ:* \n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  orderData.items.forEach((item, index) => {
    const itemDetails = formatItemParameters(item.parameters);
    message += `\n${index + 1}. *${item.name}*\n`;
    message += `   • Кол-во: ${item.quantity} шт.\n`;
    message += `   • Цена: ${formatPrice(item.price)}\n`;
    message += `   • Сумма: ${formatPrice(item.totalPrice)}\n`;
    if (itemDetails) {
      message += `   • Параметры: ${itemDetails}\n`;
    }
  });
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *ИТОГО: ${formatPrice(orderData.totalAmount)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  if (orderData.comment) {
    message += `\n💬 *Комментарий клиента:* ${orderData.comment}\n`;
  }
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 *Адрес:* г. Нижневартовск, ул. Мира, ЗП, стр. 1\n`;
  message += `⏰ *Режим работы:* Пн-Пт 9:00-18:00\n`;
  
  return message;
}

function formatItemParameters(parameters: Record<string, string | number | boolean>): string {
  const details: string[] = [];
  
  for (const [key, value] of Object.entries(parameters)) {
    if (key.toLowerCase() !== 'количество' && key.toLowerCase() !== 'цена за шт') {
      details.push(`${key}: ${value}`);
    }
  }
  
  return details.join(', ') || 'Без дополнительных параметров';
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}
