# 🚀 Инструкция по настройке Supabase для админ-панели

## 1. Настройка базы данных

### 1.1. Выполните SQL скрипт
Откройте [Supabase SQL Editor](https://supabase.com/dashboard/project/cnxpprtssdonjoaynqft/sql/new) и выполните содержимое файла `supabase-schema.sql`.

Это создаст:
- Таблицу `products` для каталога товаров
- Таблицу `orders` для заказов клиентов
- RLS политики для безопасности
- Индексы для производительности

## 2. Настройка Supabase Storage для изображений

### 2.1. Создайте бакет
1. Перейдите в **Storage** в панели Supabase
2. Нажмите **New bucket**
3. Название: `products`
4. Public: ✅ Да
5. Нажмите **Create bucket**

### 2.2. Настройте политики доступа
Для бакета `products` добавьте политику:
```sql
-- Public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'products');

-- Authenticated upload
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
```

## 3. Создание пользователя для админ-панели

### 3.1. Через Dashboard
1. Перейдите в **Authentication** → **Users**
2. Нажмите **Add user**
3. Email: `admin@technology-nv.ru` (или другой)
4. Пароль: (придумайте надежный пароль)
5. Auto Confirm User: ✅ Да
6. Нажмите **Create user**

### 3.2. Или через SQL
```sql
-- Создайте пользователя через Dashboard, это предпочтительный способ
```

## 4. Обновление .env.local

Убедитесь, что файл `.env.local` содержит:

```env
# VK Bot API
VK_TOKEN=vk1.a.bsqSt3Tqpk88_fBenJbs6EfmQ5YoEJII8d_wnpprxQQLEvjNTuTitDnkaaf84KrUxihi4NOQyIBm0EI7TADIXzADVAUTuGmiGVPIuhQVehQVffOq41v7lA3AEQdR5AkQSinOfR1B2Sh3YqoqIUfCd7alS7tNnQO9Q8rM72aUvoTKskK1VAnJPRKF2_qri869iR8Ep7NjWrrmm9OVlnaoOlp0yA
VK_ADMIN_ID=5537151

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cnxpprtssdonjoaynqft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_inwPF8i9MnTD0kmFIxuu7g_Mki_JMkC
```

## 5. Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build
npm start
```

## 6. Вход в админ-панель

1. Откройте `http://localhost:3000/admin/login`
2. Введите email и пароль, созданные в шаге 3
3. Вы попадете в дашборд

## 7. Добавление продуктов

### 7.1. Через админ-панель
1. Перейдите в **Продукты** → **Добавить продукт**
2. Заполните поля:
   - Название
   - Описание
   - Цена
   - Категория
   - Изображение (загрузится в Supabase Storage)
3. Нажмите **Создать продукт**

### 7.2. Или через SQL (для 11 вывесок)
Выполните INSERT из файла `supabase-schema.sql` для добавления начальных продуктов.

## 8. Проверка VK уведомлений

1. Оформите тестовый заказ на сайте
2. Проверьте сообщения у менеджера `id5537151` в VK
3. Сообщение должно содержать:
   - Имя клиента
   - Телефон
   - Список товаров
   - Итоговую сумму
   - Комментарий (если есть)

## 9. Мобильная версия

Админ-панель полностью адаптивна. Проверьте:
- Открытие на смартфоне
- Работу форм
- Читаемость таблиц (горизонтальный скролл)

## 10. Безопасность

### 10.1. RLS политики
Убедитесь, что политики настроены:
```sql
-- Products: public read, auth write
-- Orders: anyone insert, auth read
```

### 10.2. Смена пароля
Рекомендуется сменить пароль администратора после первого входа.

---

## 📞 Контакты для поддержки

При возникновении проблем обращайтесь:
- Email: uv-nv@mail.ru
- Телефон: 8 (3466) 31-22-04
