-- Maybe call this somethign other than profiles kinda not repreenting whats stored
-- fyi cascade means if you delete a user it will delete all the profiles associated with that user
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  --allow the next values to be null
  canvas_token text,
  ut_netid text,
  --hash the password who cares now though
  ut_password text,

)
alter table public.profiles enable row level security;


--maybe use row level security, dont know much about it rn
--nvm using row level security i guess cause its 'recommended 🤓'
-- https://supabase.com/docs/guides/auth/managing-user-data
