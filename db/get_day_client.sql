select time_slot.slot_id, TO_CHAR(time, 'h12:mi AM') as time_formatted, appt.appt_id from time_slot
LEFT JOIN appointments appt on time_slot.slot_id = appt.slot_id
where date = ${date}
order by time;