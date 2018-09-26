select appt.*, date, TO_CHAR(time, 'hh12:mi AM') as time_formatted, blocked, user_name, email, picture  from users
LEFT JOIN appointments appt on appt.user_id = users.user_id
LEFT JOIN time_slot on time_slot.slot_id = appt.slot_id
where users.user_id = ${user_id}