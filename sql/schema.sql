DROP DATABASE IF EXISTS party_db;

CREATE DATABASE party_db;

USE party_db;

CREATE TABLE mainstat (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    stat_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE class (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    class_name VARCHAR(30) NOT NULL,

    gold_salary DECIMAL NOT NULL,

    mainstat_id INT NOT NULL,

    CONSTRAINT fkey_dept FOREIGN KEY (mainstat_id) REFERENCES mainstat(id) ON DELETE CASCADE
);

CREATE TABLE adventurer (

    id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(30) NOT NULL,

    last_name VARCHAR(30) NOT NULL,

    class_id INT(10) NOT NULL,

    CONSTRAINT fkey_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,

    manager_id INT,

    CONSTRAINT fkey_manager FOREIGN KEY (manager_id) REFERENCES adventurer(id) ON DELETE SET NULL
);