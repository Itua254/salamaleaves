-- Currency Conversion Migration: USD to KES
-- Run this script in your Supabase SQL Editor to update your product prices.
-- Assumes a conversion rate of roughly 1 USD = 130 KES.
-- You can adjust the multiplier (130) as needed.
UPDATE public.products
SET price = price * 130
WHERE price < 100;
-- Safety check: Only update if price is "small" (likely USD) to avoid double-multiplying.
-- Optional: Round to nearest 10 for cleaner pricing
UPDATE public.products
SET price = ROUND(price / 10) * 10;