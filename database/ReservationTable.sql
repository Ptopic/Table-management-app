CREATE TABLE IF NOT EXISTS ReservationTable (
    Id INT NOT NULL AUTO_INCREMENT,
    ReservationId INT NOT NULL,
    TableId INT NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY (ReservationId) REFERENCES Reservation(Id) ON DELETE CASCADE,
    FOREIGN KEY (TableId) REFERENCES Tables(Id) ON DELETE CASCADE
);

-- Link reservation to certain table

INSERT INTO ReservationTable
(ReservationId, TableId)
VALUES
(1,1)

-- Show all tables for certain reservation

SELECT * FROM Tables WHERE Id IN (SELECT TableId FROM ReservationTable WHERE ReservationId=1);

-- Show all

SELECT * FROM ReservationTable;