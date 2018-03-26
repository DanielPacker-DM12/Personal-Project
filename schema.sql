CREATE TABLE users
(
    id serial PRIMARY key,
    authid varchar(50),
    user_name varchar (50)
)

CREATE TABLE products
(
    id serial PRIMARY key,
    item_name varchar(50),
    item_type VARCHAR(30),
    price money
);

CREATE TABLE cart
(
    id serial PRIMARY key,
    product_id INTEGER REFERENCES products(id),
    user_id INTEGER REFERENCES users(id)
)