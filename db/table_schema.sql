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


INSERT INTO users (user_name, email, picture)
VALUES ('Cassie', 'cassie@madeup.com', 'http://www.broadwaverly.com/wp-content/uploads/2018/02/profile-placeholder-female.png'),
('Kristen', 'kristen@madeup.com', 'http://www.thatentertains.com/wp-content/uploads/2018/01/female-place-holder-profile-image.jpg'),
('Lauren', 'lauren@madeup.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWZrJdFds4jBZqmw0EbopdMK5EfIRKMh_c-ceA0DW5LjYM4G0'),
('Tyler', 'tyler@madeup.com', 'https://image.shutterstock.com/image-vector/male-profile-picture-placeholder-vector-260nw-450966898.jpg'),
('Yazuo', 'yazuo@madeup.com', 'https://www.zybra.in/wp-content/themes/zybra/images/ravid.jpg'),
('Paymon', 'paymon@madeup.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ022PG7kBVgZZ4XhAhg7CdEyZJiucwSvVurCK5LY-u8LvS-YW'),
('Nate', 'nate@madeup.com', 'http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png');
-- ('', '@madeup.com', '')
select * from users;