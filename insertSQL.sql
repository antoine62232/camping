INSERT INTO roles (nameRole, descriptionRole) VALUES
('ROLE_ADMIN', 'Administrateur du camping'),
('ROLE_EMPLOYEE', 'Employé du camping (réception, ménage, etc.)'),
('ROLE_USER', 'Client du camping');

INSERT INTO accommodations
(typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation,
 equipementAccommodation, availableAccommodation, basePriceAccommodation)
VALUES
('Emplacement tente', 'Emplacement ombragé proche des sanitaires', 6, 80.00,
 'Électricité 10A;Point d''eau à proximité', TRUE, 20.00),
('Mobil-home Confort', 'Mobil-home 2 chambres avec terrasse', 4, 32.00,
 'Climatisation;TV;Cuisine équipée', TRUE, 70.00),
('Chalet Premium', 'Chalet 3 chambres avec vue lac', 6, 45.00,
 'Climatisation;Lave-vaisselle;TV;Terrasse couverte', TRUE, 110.00);

 INSERT INTO options (nameOption, descriptionOption, unitPrice, durationType, quantityOption)
VALUES
('Location draps', 'Jeu de draps pour un lit', 12.00, 'perStay', 100),
('Kit bébé', 'Lit parapluie + chaise haute', 8.00, 'perNight', 20),
('Animal', 'Animal domestique (hors catégories interdites)', 5.00, 'perNight', 10);

INSERT INTO optionsAccommodations (accommodationId, optionId) VALUES
(1, 1), (1, 3),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 2), (3, 3);

INSERT INTO prices
(accommodationId, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren)
VALUES
(1, '2025-04-01', '2025-06-30', 18.00, 3.00, 2.00),
(1, '2025-07-01', '2025-08-31', 25.00, 4.00, 3.00),
(2, '2025-04-01', '2025-06-30', 60.00, 5.00, 3.00),
(2, '2025-07-01', '2025-08-31', 90.00, 7.00, 4.00),
(3, '2025-04-01', '2025-06-30', 95.00, 7.00, 4.00),
(3, '2025-07-01', '2025-08-31', 140.00, 9.00, 6.00);

INSERT INTO coupons (codeCoupon, valueReduction, expiryDate) VALUES
('WELCOME10', 10.00, '2025-12-31'),
('ETE25', 25.00, '2025-08-31'),
('VIP5', 5.00, '2026-01-31');

INSERT INTO users (lastNameUser, firstNameUser, dateOfBirth, emailUser, passwordUser, phoneNumberUser) 
VALUES ('Dupont', 'Jean', '1980-05-15', 'jean@test.com', '$2a$10$hash', '0123456789');