-- Active: 1707527606712@@127.0.0.1@3306@board


CREATE USER 'dev'@'%' IDENTIFIED BY 'dev';

GRANT SELECT, UPDATE, DELETE, INSERT on board.* TO 'dev'@'%';

drop user 'dev'@'*';

select * from user;

flush PRIVILEGES;

select * from user;