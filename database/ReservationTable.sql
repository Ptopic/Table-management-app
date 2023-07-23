CREATE TABLE IF NOT EXISTS ReservationTable (
    Id INT NOT NULL AUTO_INCREMENT,
    ReservationId INT NOT NULL,
    TableId INT NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY (ReservationId) REFERENCES Reservation(Id),
    FOREIGN KEY (TableId) REFERENCES Tables(Id)
);