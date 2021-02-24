-- this is where the valupes/inputs will go
USE party_db;

-- department seeds

INSERT INTO mainstat (mainstat_name)
VALUES ('STR');

INSERT INTO mainstat (mainstat_name)
VALUES ('DEX');

INSERT INTO mainstat (mainstat_name)
VALUES ('CON');

INSERT INTO mainstat (mainstat_name)
VALUES ('INT');

INSERT INTO mainstat (mainstat_name)
VALUES ('WIS');

INSERT INTO mainstat (mainstat_name)
VALUES ('CHA');

-- class seeds


-- STR
INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Barbarian', 100.00, 1);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Fighter', 150.00, 1);

-- DEX
INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Rogue', 400.00, 2);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Ranger', 50.00, 2);


-- CON
INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Sorcerer', 600.00, 3);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Paladin', 700.00, 3);


-- INT
INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Wizard', 1000.00, 4);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Artificer', 900.00, 4);


-- WIS
INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Cleric', 100.00, 5);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Monk', 10.00, 5);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Druid', 150.00, 5);


-- CHA
INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Bard', 800.00, 6);

INSERT INTO class (class_name, gold_salary, mainstat_id)
VALUES ('Warlock', 200.00, 6);


--adventurer seeds


--Barbarian 1
--Fighter 2
INSERT INTO employees (first_name, last_name, class_id, manager_id)
VALUES ('Jimmy', 'Blaze', 1, NULL);
--Rogue 3
--Ranger 4
--Sorcerer 5
INSERT INTO employees (first_name, last_name, class_id, manager_id)
VALUES ('Amy', 'Arazana', 5, 1);
--Paladin 6
INSERT INTO employees (first_name, last_name, class_id, manager_id)
VALUES ('Reginald', 'Justice', 6, 2);
--Wizard 7
--Artificer 8
INSERT INTO employees (first_name, last_name, class_id, manager_id)
VALUES ('Vander', 'Princeton', 8, NULL);

--Cleric 9
--Monk 10
INSERT INTO employees (first_name, last_name, class_id, manager_id)
VALUES ('Jellybean', 'Chaos', 10, 2);
--Druid 11
--Bard 12
INSERT INTO employees (first_name, last_name, class_id, manager_id)
VALUES ('Kili', 'MaunaWili', 12, 2);
--Warlock 13
