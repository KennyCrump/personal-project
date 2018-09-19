DROP TABLE IF EXISTS users;
create table users (
  user_id serial primary key,
  user_name varchar(180),
  email varchar(180),
  picture text,
  auth_id text,
  admin varchar(10)
);
DROP TABLE IF EXISTS time_slot;
create table time_slot (
    slot_id SERIAL PRIMARY KEY,
    date VARCHAR(20),
    time VARCHAR(20),
    blocked VARCHAR(10),
    appt_id VARCHAR(8),
    task_id VARCHAR(8)
);