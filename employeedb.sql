DROP DATABASE IF EXISTS dungeonparty_db;
CREATE DATABASE dungeonparty_db;

USE dungeonparty_db;

CREATE TABLE main_stat (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE archtype (
  id INT NOT NULL AUTO_INCREMENT,
  class VARCHAR(50) NOT NULL,
  gold DECIMAL(10,2) NOT NULL,
  main_stat_id INT, 
  PRIMARY KEY (id)
);

CREATE TABLE adventurer (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  archtype_id INT NOT NULL, 
  manager_id INT, 
  PRIMARY KEY (id)
);

INSERT INTO main_stat (name)
VALUES ("Strength"), ("Dexterity"), ("Consitituion"), ("Intelligence"), ("Wisdom"), ("Charisma");

INSERT INTO archtype (class, gold, main_stat_id)
VALUES ("Name", "Monies", "ID")

INSERT INTO adventurer (first_name, last_name, archtype_id, manager_id)
VALUES (first_name, last_name, archtype_id, manager_id)

SELECT e.id, e.first_name, e.last_name, d.name AS main_stat, r.class, r.gold, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM adventurer e LEFT JOIN adventurer m ON m.id = e.manager_id INNER JOIN archtype r ON e.archtype_id = r.id INNER JOIN main_stat d ON r.main_stat_id = d.id ORDER BY e.id ASC;

SELECT  r.id, r.class, r.gold, d.name as main_stat_Name FROM archtype AS r INNER JOIN main_stat AS d ON r.main_stat_id = d.id;

SELECT id, CONCAT_WS(' ', first_name, last_name) AS adventurer_Name FROM adventurer
--Update Query
UPDATE adventurer SET archtype_id = 3 WHERE id = 8;
UPDATE adventurer SET ? WHERE ?;
--Delete Query
DELETE FROM main_stat WHERE id = 13;