insert into users
(user_name, email, picture, auth_id, admin)
values
($1, $2, $3, $4, 'client')
returning *;