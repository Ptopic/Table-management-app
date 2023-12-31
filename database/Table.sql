CREATE TABLE IF NOT EXISTS Tables (
    Id INT NOT NULL UNIQUE,
    TableNumber INT NOT NULL UNIQUE,
    NumberOfSeats INT NOT NULL,
    PRIMARY KEY(Id)
);

-- Create table

INSERT INTO Tables
(TableNumber, NumberOfSeats)
VALUES
(1,4)

-- Delete table

DELETE FROM Tables
WHERE TableNumber=1;

-- Show all tables

SELECT * FROM Tables;

-- Show specific tables

SELECT * FROM Tables WHERE TableNumber=1;