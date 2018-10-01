SELECT appt.*, date, TO_CHAR(time, 'hh12:mi AM') as time_formatted, user_name, picture  FROM users
LEFT JOIN appointments appt ON appt.user_id = users.user_id
LEFT JOIN time_slot ON time_slot.slot_id = appt.slot_id
WHERE date = ${date}
ORDER BY time