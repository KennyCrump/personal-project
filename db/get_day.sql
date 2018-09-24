select time_slot.slot_id, date, TO_CHAR(time, 'hh12:mi AM') as time_formatted, blocked, appt.appt_id, appt.user_id from time_slot
LEFT JOIN appointments appt on time_slot.slot_id = appt.slot_id
where date = ${date}
order by time;