# 🚀 Step-by-Step Implementation: Technology Web Hub (v2.0)

## Step 1: Environment & Supabase Setup
1. **Working Directory:** All development must happen in `C:\Users\Vladimir\Desktop\my_projects\test_qwencode`.
2. **Local Context Discovery:**
   - Scan `C:\Users\Vladimir\Desktop\Bot-VK-Anna` to find VK API keys (ACCESS_TOKEN, etc.).
   - Scan `C:\Users\Vladimir\Desktop\VKapp` to find "Public Offer" and "Terms of Use" documents.
3. **Environment Variables:** Create/update `.env.local` in the project root with these Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL=https://cnxpprtssdonjoaynqft.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_inwPF8i9MnTD0kmFIxuu7g_Mki_JMkC`
4. **Database:** Initialize Supabase client and prepare the `products` table schema (id, name, description, price, image_url, category).

## Step 2: UI Overhaul & Legal
1. **Theming:** Apply "Soft Stone" palette (`stone-50` background). Avoid pure white to reduce eye strain.
2. **Mobile Optimization:** Ensure all layouts stack correctly on mobile. Disable heavy 3D/hover effects for touch devices.
3. **Legal Integration:** Add "Public Offer" and "Terms of Use" links to the Footer. Add a mandatory "I agree to terms" checkbox in the checkout form using the text found in `C:\Users\Vladimir\Desktop\VKapp`.

## Step 3: Catalog & Showcase
1. **Image Assets:** Import and display images from `C:\Users\Vladimir\Desktop\VKapp\public\laser_cutting`.
2. **Dynamic Vitrina:** Connect the frontend to Supabase to list products (Banners, CNC, Grills/Mangals).

## Step 4: Logic & Notifications
1. **Calculators:** Implement pricing for Banners (m2 area) and CNC cutting (linear meters) using the provided PDF price list logic.
2. **VK Order Bot:** Implement a notification trigger. When an order is placed, send a detailed message to Manager `id5537151` using the VK Token found in the `Bot-VK-Anna` directory.

## Step 5: Admin Panel
1. **Admin Dashboard:** Create a secure `/admin` route.
2. **CRUD Operations:** Allow the manager to add new photos, delete items, and change prices/descriptions in the Supabase database.