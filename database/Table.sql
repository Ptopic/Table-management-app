CREATE TABLE IF NOT EXISTS Tables (
    Id INT NOT NULL AUTO_INCREMENT,
    TableNumber INT NOT NULL,
    NumberOfSeats INT NOT NULL,
    PRIMARY KEY(Id)
);

-- Create table

INSERT INTO Tables(

-- Show all tables

SELECT * FROM Tables;

-- Show specific tables

SELECT * FROM Tables WHERE Id=1;