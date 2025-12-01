CREATE DATABASE camping;
USE camping;
CREATE TABLE coupons (
idCoupon INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
codeCoupon VARCHAR(10) NOT NULL,
valueReduction DECIMAL(10,2) NOT NULL,
expiryDate DATE NOT NULL);

CREATE TABLE reservations (
idReservation INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dateReservation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
arrivalDateReservation DATE NOT NULL,
departureDateReservation DATE NOT NULL,
numberAdult INT NOT NULL,
numberChildren INT NOT NULL,
priceHtReservation DECIMAL(10,2) NOT NULL,
tvaReservation DECIMAL(10,2) NOT NULL,
priceTotal DECIMAL(10,2) NOT NULL,
statusReservation VARCHAR(20) NOT NULL,
userId INT NOT NULL,
couponId INT,
accommodationId INT NOT NULL);

CREATE TABLE payments (
idPayment INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
reservationId INT NOT NULL,
datePayment DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
amount DECIMAL(10,2) NOT NULL,
referenceTransaction VARCHAR(255) NOT NULL,
paymentStatus VARCHAR(20) NOT NULL,
paymentMethod VARCHAR(20) NOT NULL);

CREATE TABLE notices (
idNotice INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
userId INT NOT NULL,
note INT NOT NULL,
comment TEXT,
dateNotice DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE medias (
idMedia INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
accommodationId INT,
titleMedia VARCHAR(100) NOT NULL,
urlFile VARCHAR(255) NOT NULL,
typeMedia VARCHAR(50) NOT NULL,
downloadDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE accommodations (
idAccommodation INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
typeAccommodation VARCHAR(255) NOT NULL,
descriptionAccommodation VARCHAR(255),
abilityAccommodation INT NOT NULL,
surfaceAccommodation DECIMAL(10,2),
equipementAccommodation TEXT,
availableAccommodation BOOLEAN NOT NULL,
basePriceAccommodation DECIMAL(10,2) NOT NULL);

CREATE TABLE users(
idUser INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
lastNameUser VARCHAR(255) NOT NULL,
firstNameUser VARCHAR(255) NOT NULL,
dateOfBirth DATE NOT NULL,
streetNumberUser CHAR(10),
streetNameUser VARCHAR(255),
postalCodeUser CHAR(5),
cityUser VARCHAR(255),
adressComplementUser VARCHAR(255),
emailUser VARCHAR(255) UNIQUE NOT NULL,
passwordUser VARCHAR(255) NOT NULL,
phoneNumberUser CHAR(10) UNIQUE NOT NULL,
registrationDateUser DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE roles(
idRole INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nameRole VARCHAR(100) NOT NULL,
descriptionRole VARCHAR(255) NOT NULL
);

CREATE TABLE prices(
idPrice INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
accommodationId INT NOT NULL,
startDateSaison DATE NOT NULL,
endDateSaison DATE NOT NULL,
priceNight DECIMAL(10,2) NOT NULL,
priceAdditionalAdult DECIMAL(10,2),
priceAdditionalChildren DECIMAL(10,2)
);

CREATE TABLE options(
idOption INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nameOption VARCHAR(255) NOT NULL,
descriptionOption TEXT,
unitPrice DECIMAL(10,2) NOT NULL,
durationType VARCHAR(50) NOT NULL,
quantityOption INT NOT NULL
);

CREATE TABLE optionsAccommodations(
accommodationId INT,optionId INT,PRIMARY KEY(accommodationId, optionId)
);

CREATE TABLE reservationsOptions(
    reservationId INT NOT NULL,
    optionId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    pricePaid DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(reservationId, optionId)
);

CREATE TABLE employees(
idEmployee INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
lastName VARCHAR(255) NOT NULL,
firstName VARCHAR(255) NOT NULL,
dateOfBirth DATE NOT NULL,
streetNumber CHAR(10),
streetName VARCHAR(255),
postalCode CHAR(5),
city VARCHAR(255),
adressComplement VARCHAR(255),
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phoneNumber CHAR(10) UNIQUE NOT NULL,
arrivalDate DATETIME NOT NULL,
roleId INT NOT NULL
);
       
ALTER TABLE medias ADD CONSTRAINT FOREIGN KEY (accommodationId) REFERENCES accommodations(idAccommodation);
ALTER TABLE prices ADD CONSTRAINT FOREIGN KEY (accommodationId) REFERENCES accommodations(idAccommodation);
ALTER TABLE reservations ADD CONSTRAINT FOREIGN KEY (couponId) REFERENCES coupons(idCoupon);
ALTER TABLE payments ADD CONSTRAINT FOREIGN KEY (reservationId) REFERENCES reservations(idReservation);
ALTER TABLE optionsAccommodations ADD CONSTRAINT FOREIGN KEY (optionId) REFERENCES options(idOption);
ALTER TABLE optionsAccommodations ADD CONSTRAINT FOREIGN KEY (accommodationId) REFERENCES accommodations(idAccommodation);
ALTER TABLE reservations ADD CONSTRAINT FOREIGN KEY (accommodationId) REFERENCES accommodations(idAccommodation);
ALTER TABLE reservations ADD CONSTRAINT FOREIGN KEY (userId) REFERENCES users(idUser);
ALTER TABLE employees ADD CONSTRAINT FOREIGN KEY (roleId) REFERENCES roles(idRole);
ALTER TABLE notices ADD CONSTRAINT FOREIGN KEY (userId) REFERENCES users(idUser);
ALTER TABLE reservationsOptions ADD CONSTRAINT FOREIGN KEY (reservationId) REFERENCES reservations(idReservation);
ALTER TABLE reservationsOptions ADD CONSTRAINT FOREIGN KEY (optionId) REFERENCES options(idOption);