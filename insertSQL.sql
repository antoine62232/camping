USE camping;

-- 1. ROLES
INSERT INTO roles (idRole, nameRole, descriptionRole) VALUES
(1, 'Admin', 'Super administrateur'),
(2, 'Manager', 'Gestionnaire du camping'),
(3, 'Réceptionniste', 'Accueil et gestion des arrivées');

ALTER TABLE roles AUTO_INCREMENT = 4;

-- 2. EMPLOYÉS (mot de passe = "password")
INSERT INTO employees (
  idEmployee, lastName, firstName, dateOfBirth, streetNumber, streetName,
  postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId
) VALUES
(1, 'Martin', 'Sophie', '1985-03-22', '5', 'Avenue du Parc',
 '44000', 'Nantes', '', 'sophie.martin@camping.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- "password"
 '0699887766', '2024-01-10 09:00:00', 1),
(2, 'Dupont', 'Lucas', '1990-06-15', '10', 'Rue des Pins',
 '17000', 'La Rochelle', NULL, 'lucas.dupont@camping.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 '0611223344', '2024-03-01 08:30:00', 2),
(3, 'Bernard', 'Claire', '1995-09-05', '2', 'Place de la Gare',
 '33000', 'Bordeaux', 'Bâtiment B', 'claire.bernard@camping.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 '0677889900', '2024-05-20 10:00:00', 3);

ALTER TABLE employees AUTO_INCREMENT = 4;

-- 3. PLANNINGS EMPLOYÉS
INSERT INTO employeeSchedules (
  employeeId, scheduleDate, startTime, endTime, hoursWorked, status
) VALUES
(1, '2025-07-10', '09:00:00', '17:00:00', 8.00, 'scheduled'),
(1, '2025-07-11', '09:00:00', '17:00:00', 8.00, 'scheduled'),
(2, '2025-07-10', '08:00:00', '16:00:00', 8.00, 'scheduled'),
(3, '2025-07-10', '14:00:00', '22:00:00', 8.00, 'scheduled');

-- 4. USERS (clients) (mot de passe = "password")
INSERT INTO users (
  idUser, lastNameUser, firstNameUser, dateOfBirth,
  streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser,
  emailUser, passwordUser, phoneNumberUser, registrationDateUser
) VALUES
(1, 'Doe', 'John', '1990-05-15',
 '10', 'Rue des Fleurs', '75001', 'Paris', 'Appartement 3B',
 'john.doe@example.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 '0612345678', NOW()),
(2, 'Durand', 'Marie', '1988-11-02',
 '25', 'Boulevard des Océans', '13000', 'Marseille', NULL,
 'marie.durand@example.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 '0622334455', NOW()),
(3, 'Leroy', 'Paul', '1995-01-20',
 '3', 'Impasse des Peupliers', '44000', 'Nantes', 'Maison',
 'paul.leroy@example.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 '0633445566', NOW());

ALTER TABLE users AUTO_INCREMENT = 4;

-- 5. ACCOMMODATIONS
INSERT INTO accommodations (
  idAccommodation, typeAccommodation, descriptionAccommodation,
  abilityAccommodation, surfaceAccommodation, equipementAccommodation,
  availableAccommodation, basePriceAccommodation
) VALUES
(1, 'Mobil-home Confort', 'Mobil-home 4 personnes avec terrasse',
 4, 32.00, 'Climatisation;TV;Cuisine équipée;Terrasse', TRUE, 80.00),
(2, 'Tente Lodge', 'Tente équipée 2 personnes',
 2, 20.00, 'Lits;Electricité;Petite terrasse', TRUE, 50.00),
(3, 'Chalet Premium', 'Chalet 6 personnes, vue lac',
 6, 45.00, 'Climatisation;TV;Cuisine équipée;Lave-vaisselle;Terrasse couverte', TRUE, 120.00);

ALTER TABLE accommodations AUTO_INCREMENT = 4;

-- 6. MEDIAS
INSERT INTO medias (accommodationId, titleMedia, urlFile, typeMedia) VALUES
(1, 'Photo principale mobil-home', '/images/mobilhome1.jpg', 'image'),
(2, 'Photo tente lodge', '/images/tentelodge1.jpg', 'image'),
(3, 'Photo chalet premium', '/images/chalet1.jpg', 'image');

-- 7. PRICES (saisons)
INSERT INTO prices (
  accommodationId, startDateSaison, endDateSaison,
  priceNight, priceAdditionalAdult, priceAdditionalChildren
) VALUES
(1, '2025-06-01', '2025-06-30', 70.00, 10.00, 5.00),
(1, '2025-07-01', '2025-08-31', 90.00, 12.00, 6.00),
(2, '2025-07-01', '2025-08-31', 60.00, 8.00, 4.00),
(3, '2025-07-01', '2025-08-31', 130.00, 15.00, 7.00);

-- 8. OPTIONS
INSERT INTO options (
  idOption, nameOption, descriptionOption, unitPrice, durationType, quantityOption
) VALUES
(1, 'Petit-déjeuner', 'Buffet petit-déjeuner', 7.50, 'per_night', 100),
(2, 'Location draps', 'Draps pour le séjour', 15.00, 'per_stay', 200),
(3, 'Ménage fin de séjour', 'Ménage complet à la fin du séjour', 40.00, 'per_stay', 50);

ALTER TABLE options AUTO_INCREMENT = 4;

-- 9. OPTIONS-ACCOMMODATIONS (association)
INSERT INTO optionsAccommodations (accommodationId, optionId) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(3, 1),
(3, 3);

-- 10. COUPONS
INSERT INTO coupons (idCoupon, codeCoupon, valueReduction, expiryDate) VALUES
(1, 'ETE2025', 10.00, '2025-08-31'),
(2, 'WEEKEND', 5.00, '2025-12-31');

ALTER TABLE coupons AUTO_INCREMENT = 3;

-- 11. RESERVATIONS
INSERT INTO reservations (
  idReservation, dateReservation, arrivalDateReservation, departureDateReservation,
  numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal,
  statusReservation, userId, couponId, accommodationId
) VALUES
(1, NOW(), '2025-07-10', '2025-07-17',
 2, 1, 560.00, 112.00, 672.00, 'validée', 1, 1, 1),
(2, NOW(), '2025-08-01', '2025-08-08',
 2, 0, 630.00, 126.00, 756.00, 'en attente', 2, NULL, 2),
(3, NOW(), '2025-09-05', '2025-09-12',
 4, 2, 900.00, 180.00, 1080.00, 'validée', 3, 2, 3);

ALTER TABLE reservations AUTO_INCREMENT = 4;

-- 12. RESERVATIONS-OPTIONS
INSERT INTO reservationsOptions (
  reservationId, optionId, quantity, pricePaid
) VALUES
(1, 1, 3, 22.50),
(1, 2, 1, 15.00),
(2, 1, 2, 15.00),
(3, 3, 1, 40.00);

-- 13. PAYMENTS
INSERT INTO payments (
  reservationId, amount, referenceTransaction,
  paymentStatus, paymentMethod
) VALUES
(1, 672.00, 'PAY-20250710-001', 'payé', 'carte'),
(2, 0.00, 'PAY-20250801-001', 'en attente', 'carte'),
(3, 1080.00, 'PAY-20250905-001', 'payé', 'virement');

-- 14. NOTICES
INSERT INTO notices (userId, note, comment) VALUES
(1, 5, 'Super séjour, personnel très accueillant !'),
(2, 4, 'Très bien, un peu de bruit le soir.'),
(3, 5, 'Excellent chalet, vue magnifique sur le lac.');
