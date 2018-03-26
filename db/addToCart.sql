INSERT INTO cart
    (user_id, product_id)
VALUES
    ($1, $2);
SELECT pr.*
FROM products pr
    JOIN cart ca ON pr.id = ca.product_id
WHERE user_id = $1;