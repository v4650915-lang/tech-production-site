-- Supabase Schema for "Technology" Production & Sales Hub
-- Run this in your Supabase SQL Editor to create the products table

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  image_url TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('printing', 'cutting', 'mangals', 'stands', 'souvenirs', 'signs')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  customer_vk_id BIGINT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  comment TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create index on order status
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products (optional - can be added manually via Supabase dashboard)
-- Вывески (Signs) - from VKapp/public/images
INSERT INTO products (name, description, price, image_url, category) VALUES
  ('Стоматология', 'Светящаяся вывеска зуба. Лицевая подсветка обеспечивает отличную читаемость ночью.', 35000, '/images/1.png', 'signs'),
  ('Кафе / Бар', 'Классический световой короб с яркой панелью. Идеально для привлечения внимания.', 14800, '/images/2.png', 'signs'),
  ('Торговый павильон', 'Оформление фасада магазина композитными панелями и объемными световыми буквами "МОДА СПОРТ".', 350000, '/images/3.png', 'signs'),
  ('Офис LUMINA', 'Премиальные световые буквы с подсветкой и декоративные световые линии на глухом фасаде.', 350000, '/images/4.jfif', 'signs'),
  ('Салон Q-NAILS', 'Элегантные объемные буквы с лицевым свечением. Стильное решение для индустрии красоты.', 80000, '/images/5.jfif', 'signs'),
  ('Студия КУХНИ', 'Контрастный прямоугольный световой короб внушительных размеров. Строгий вид и максимальная читаемость.', 98000, '/images/6.jfif', 'signs'),
  ('Кронштейн КАФЕ', 'Изящная двусторонняя вывеска на консоли с элементами художественной ковки. Придает заведению шарм.', 10000, '/images/7.jfif', 'signs'),
  ('Пекарня Крендель', 'Фигурные объемные буквы теплого свечения с дополнительными декоративными элементами.', 185000, '/images/8.jfif', 'signs'),
  ('Круглое Cafe', 'Двусторонняя круглая панель-кронштейн в современном стиле. Отлично выделяет заведение на улице.', 35000, '/images/9.jfif', 'signs'),
  ('Вывеска SALON', 'Строгая подвесная табличка с классическим орнаментом на узорном кованом подвесе.', 35000, '/images/10.jfif', 'signs'),
  ('Ваш Дизайн', 'Изготовим любую вывеску по вашим размерам и дизайну.', 0, '/images/11.png', 'signs');

-- Лазерная резка и мангалы (Portfolio) - from VKapp/public/laser_cutting
-- Цена = 0 означает "Цена по запросу"
INSERT INTO products (name, description, price, image_url, category) VALUES
  ('Мангалы с лазерной резкой', 'Художественная лазерная резка металла. Индивидуальный дизайн.', 0, '/laser_cutting/Мангалы..jpg', 'mangals'),
  ('Мангальные беседки', 'Комплексные решения для отдыха на природе.', 0, '/laser_cutting/Мангальные беседки..jpg', 'mangals'),
  ('Журнальный стол', 'Металлический стол с художественной лазерной резкой.', 0, '/laser_cutting/журнальный стол из металла с художественной лазерной резкой.jpg', 'mangals'),
  ('Приставные столики', 'Компактные столики с элементами лазерной резки.', 0, '/laser_cutting/Приставные столики.jpg', 'mangals'),
  ('Табличка лазерная резка', 'Лазерная резка табличек для офиса и улицы.', 0, '/laser_cutting/Лазерная резка таблички..jpg', 'cutting'),
  ('Подставка декоративная', 'Декоративная подставка с лазерной резкой.', 0, '/laser_cutting/Лазерная резка подставки..jpg', 'mangals'),
  ('Ворота с ограждением', 'Металлические ворота с художественной резкой.', 0, '/laser_cutting/Лазерная резка ворота оградки..jpg', 'mangals'),
  ('Полка металлическая', 'Металлическая полка с элементами лазерной резки.', 0, '/laser_cutting/лазерная резка полки.jpg', 'mangals'),
  ('Декоративный элемент', 'Уникальное декоративное изделие из металла.', 0, '/laser_cutting/Лазарная резка полки..jpg', 'mangals'),
  ('Фотозона', 'Декоративный элемент для фотозоны.', 0, '/laser_cutting/photo_2026-02-21_01-49-02.jpg', 'mangals');

-- Create RLS (Row Level Security) policies if needed
-- For public read access to products:
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access to products" ON products FOR SELECT USING (true);

-- For orders: allow insert for anyone, read only for authenticated users
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read orders" ON orders FOR SELECT TO authenticated USING (true);
