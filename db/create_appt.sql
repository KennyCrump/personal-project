INSERT INTO appointments (user_id, slot_id, summary, notes)
VALUES (${user_id}, ${slot_id}, ${summary}, '')
returning *;