CREATE TABLE IF NOT EXISTS Reservation (
    Id INT NOT NULL AUTO_INCREMENT,
    Firstname TEXT NOT NULL,
    Lastname TEXT NOT NULL,
    NumberOfPeople INT NOT NULL,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    ContactPhone TEXT,
    PRIMARY KEY(Id)
);