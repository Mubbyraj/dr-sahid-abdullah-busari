create policy "Admins can view all lectures"
on public.lectures
for select
to authenticated
using ((select private.is_admin()));

create policy "Admins can view lecture videos"
on storage.objects
for select
to authenticated
using (bucket_id = 'lecture-videos' and (select private.is_admin()));

create policy "Admins can view lecture thumbnails"
on storage.objects
for select
to authenticated
using (bucket_id = 'lecture-thumbnails' and (select private.is_admin()));
