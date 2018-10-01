select distinct on (user_id) users.user_id, users.user_name, email, picture from users
join appointments appt on appt.user_id = users.user_id
join time_slot ts on appt.slot_id = ts.slot_id
where date=${date}