CREATE TABLE IF NOT EXISTS Reservation (
    Id INT NOT NULL AUTO_INCREMENT,
    Firstname TEXT NOT NULL,
    Lastname TEXT NOT NULL,
    NumberOfPeople INT NOT NULL,
    ReservationDate DATE NOT NULL,
    ReservationTime TIME NOT NULL,
    ContactPhone TEXT,
    PRIMARY KEY(Id)
);

-- Create reservation
-- Date format 2023-07-23
-- Time format 19:25:22
INSERT INTO Reservation
(Firstname, Lastname, NumberOfPeople, ReservationDate, ReservationTime, ContactPhone) 
VALUES
("Petar", "Topic", 4, curdate(), curtime(), "test")

INSERT INTO Reservation
(Firstname, Lastname, NumberOfPeople, ReservationDate, ReservationTime, ContactPhone) 
VALUES
("Petar", "Topic", 4, '2022-10-10', '11:00', "test")

-- Show all reservations

SELECT * FROM Reservation;

-- Show all reservations by specific date

SELECT * FROM Reservation WHERE ReservationDate='2022-10-10';

-- Show all reservations by specific time

SELECT * FROM Reservation WHERE ReservationTime='11:00';

-- Show all reservations by specific date and time

SELECT * FROM Reservation WHERE ReservationDate='2022-10-10' AND ReservationTime='11:00';

-- Show all reservations by month

SELECT * FROM Reservation WHERE MONTH(ReservationDate) = 10;

-- Show all reservations by year

SELECT * FROM Reservation WHERE YEAR(ReservationDate) = 2022;