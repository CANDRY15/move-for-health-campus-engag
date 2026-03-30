
-- Create sellers table
CREATE TABLE public.sellers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('standard', 'vip')),
  price INTEGER NOT NULL,
  seller_id UUID REFERENCES public.sellers(id),
  verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Sellers: allow anonymous read for login check
CREATE POLICY "Anyone can read sellers" ON public.sellers FOR SELECT USING (true);

-- Tickets: allow anonymous insert (sellers create tickets without auth)
CREATE POLICY "Anyone can insert tickets" ON public.tickets FOR INSERT WITH CHECK (true);

-- Tickets: allow anonymous read (for admin/verify pages)
CREATE POLICY "Anyone can read tickets" ON public.tickets FOR SELECT USING (true);

-- Insert default sellers
INSERT INTO public.sellers (name, password) VALUES
  ('Admin', '2026Campus2026'),
  ('Vendeur 1', 'vendeur1pass'),
  ('Vendeur 2', 'vendeur2pass'),
  ('Vendeur 3', 'vendeur3pass');
