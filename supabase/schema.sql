-- Create Products Table
create table public.products (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    slug text not null unique,
    description text,
    price numeric not null,
    stock integer default 0 not null,
    image_url text,
    category text,
    is_featured boolean default false,
    tagline text,
    sku text,
    ingredients text,
    brewing_instructions text,
    benefits text,
    warning text
);
-- Enable RLS for Products
alter table public.products enable row level security;
create policy "Products are viewable by everyone" on public.products for
select using (true);
create policy "Products are editable by admins only" on public.products for all using (auth.role() = 'service_role');
-- basic policy
-- Create Orders Table
create table public.orders (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id),
    -- Nullable for guest checkout
    email text not null,
    total numeric not null,
    status text default 'pending' check (
        status in ('pending', 'paid', 'shipped', 'cancelled')
    ),
    payment_method text,
    shipping_address jsonb
);
-- Enable RLS for Orders
alter table public.orders enable row level security;
create policy "Users can view their own orders" on public.orders for
select using (auth.uid() = user_id);
create policy "Anyone can create orders" on public.orders for
insert with check (true);
-- Create Order Items Table
create table public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id uuid references public.products(id) not null,
    quantity integer not null,
    price_at_purchase numeric not null
);
-- Enable RLS for Order Items
alter table public.order_items enable row level security;
create policy "Users can view their own order items" on public.order_items for
select using (
        exists (
            select 1
            from public.orders
            where orders.id = order_items.order_id
                and orders.user_id = auth.uid()
        )
    );
create policy "Anyone can insert order items" on public.order_items for
insert with check (true);