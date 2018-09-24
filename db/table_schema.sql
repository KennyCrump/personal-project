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
    time TIME,
    blocked VARCHAR(10),
    appt_id INTEGER,
    task_id INTEGER
);

-- DROP TABLE IF EXISTS slot_junction;
-- CREATE TABLE slot_junction (
--   id SERIAL PRIMARY KEY,
--   slot_id INTEGER REFERENCES time_slot(slot_id),
--   appt_id INTEGER,
--   task_id INTEGER
-- );

DROP TABLE IF EXISTS appointments;
CREATE TABLE appointments (
  appt_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  slot_id INTEGER REFERENCES time_slot(slot_id),
  summary VARCHAR(600),
  notes VARCHAR(1000),
  total DECIMAL
);