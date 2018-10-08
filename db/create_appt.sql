INSERT INTO appointments (user_id, slot_id, summary, notes)
VALUES (${user_id}, ${slot_id}, ${summary}, ${notes})
-- JOIN users on appointments.user_id = users.user_id
returning *;