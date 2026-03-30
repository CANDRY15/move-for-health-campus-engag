
-- Allow managing sellers from admin dashboard
CREATE POLICY "Anyone can insert sellers" ON public.sellers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sellers" ON public.sellers FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete sellers" ON public.sellers FOR DELETE USING (true);

-- Gallery photos table
CREATE TABLE public.gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  storage_path text NOT NULL,
  caption text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gallery" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Anyone can insert gallery" ON public.gallery_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete gallery" ON public.gallery_photos FOR DELETE USING (true);

-- Storage bucket for gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Storage RLS
CREATE POLICY "Public gallery upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');
CREATE POLICY "Public gallery read" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Public gallery delete" ON storage.objects FOR DELETE USING (bucket_id = 'gallery');
