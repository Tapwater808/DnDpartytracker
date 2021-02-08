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
  leader_id INT, 
  PRIMARY KEY (id)
);

INSERT INTO main_stat (name)
VALUES ("Strength"), ("Dexterity"), ("Consitituion"), ("Intelligence"), ("Wisdom"), ("Charisma");

INSERT INTO archtype (class, gold, main_stat_id)
VALUES ("Fighter", "5000", "1"), ("Rogue", "4000", "2"), ("Barbarian", "1200", "1"), ("Monk", "500", "2"), ("Ranger", "3000", "5"), ("Paladin", "6000", "3"), ("Wizard", "9000", "4"), ("Cleric", "2500", "5"),  ("Sorcerer", "2600", "6"), ("Druid", "7000", "5"), ("Bard", "8500", "6"), ("Warlock", "4600", "6");

INSERT INTO adventurer (first_name, last_name, archtype_id, leader_id)
VALUES ("Vander", "Princeton", "2"),  ("Drake", "Argetsaba", "8", "1"), ("Lukas", "Capriatti", "12", "1"), ("Reginald", "J Lightbringer", "6", "1"), ("Divina", "George", "7", "1"), ("Anastasia", "Chernyshevsky", "9", "1");

SELECT e.id, e.first_name, e.last_name, d.name AS main_stat, r.class, r.gold, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM adventurer e LEFT JOIN adventurer m ON m.id = e.leader_id INNER JOIN archtype r ON e.archtype_id = r.id INNER JOIN main_stat d ON r.main_stat_id = d.id ORDER BY e.id ASC;

SELECT  r.id, r.class, r.gold, d.name as main_stat_Name FROM archtype AS r INNER JOIN main_stat AS d ON r.main_stat_id = d.id;

SELECT id, CONCAT_WS(' ', first_name, last_name) AS adventurer_Name FROM adventurer
--Update Query
UPDATE adventurer SET archtype_id = 3 WHERE id = 8;
UPDATE adventurer SET ? WHERE ?;
--Delete Query
DELETE FROM main_stat WHERE id = 13;