INSERT INTO users
    (authid, user_name)
VALUES
    ($1, $2);
SELECT *
FROM users
WHERE authid = $1