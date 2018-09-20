select slot_id, date, TO_CHAR(time, 'hh12:mi AM') as time_formatted, blocked, appt_id, task_id from time_slot
where date = ${date}
order by time;