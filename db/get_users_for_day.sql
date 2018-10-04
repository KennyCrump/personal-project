SELECT * FROM (
    SELECT DISTINCT ON (user_id) users.user_id, users.user_name, email, picture, time FROM users
    JOIN appointments appt ON appt.user_id = users.user_id
    JOIN time_slot ts ON appt.slot_id = ts.slot_id
    WHERE date=${date}
) AS subquery
ORDER BY time