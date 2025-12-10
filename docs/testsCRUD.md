# API Documentation

## 1. Users (clients)

### 1.1. Inscription d’un client

**Requête**
**Method:** POST
**URL:** /users/register

**Body (JSON)**

```json
{
  "lastNameUser": "Doe",
  "firstNameUser": "John",
  "dateOfBirth": "1990-05-15",
  "streetNumberUser": "10",
  "streetNameUser": "Rue des Fleurs",
  "postalCodeUser": "75001",
  "cityUser": "Paris",
  "adressComplementUser": "Appartement 3B",
  "emailUser": "john.doe@example.com",
  "passwordUser": "Password123!",
  "phoneNumberUser": "0612345678"
}
```

**Résultat attendu**
Status 201
JSON avec message de succès + idUser.

---

### 1.2. Connexion client

**Requête**
**Method:** POST
**URL:** /users/login

**Body (JSON)**

```json
{
  "emailUser": "john.doe@example.com",
  "passwordUser": "Password123!"
}
```

**Résultat attendu**
Status 200
JSON contenant message, token JWT et objet user.

---

### 1.3. Récupérer tous les clients

**Requête**
**Method:** GET
**URL:** /users/

**Résultat attendu**
Status 200
Tableau de clients.

---

### 1.4. Récupérer un client par email

**Requête**
**Method:** GET
**URL:** /users/john.[doe@example.com](mailto:doe@example.com)

**Résultat attendu**
Status 200
Objet utilisateur.

---

### 1.5. Mise à jour d’un client

**Requête**
**Method:** PUT
**URL:** /users/update/1

**Body (JSON)**

```json
{
  "lastNameUser": "Doe",
  "firstNameUser": "Johnny",
  "dateOfBirth": "1990-05-15",
  "streetNumberUser": "12",
  "streetNameUser": "Rue des Fleurs",
  "postalCodeUser": "75001",
  "cityUser": "Paris",
  "adressComplementUser": "Appartement 4C",
  "emailUser": "john.doe@example.com",
  "passwordUser": "Password123!",
  "phoneNumberUser": "0612345678"
}
```

**Résultat attendu**
Status 200
Message : "Client mis à jour avec succès".

---

### 1.6. Suppression d’un client

**Requête**
**Method:** DELETE
**URL:** /users/delete/1

**Résultat attendu**
Status 200
Message : "Client supprimé avec succès".

---

## 2. Employees

### 2.1. Création d’un employé

**Requête**
**Method:** POST
**URL:** /employees/addEmployee

**Body (JSON)**

```json
{
  "lastName": "Martin",
  "firstName": "Sophie",
  "dateOfBirth": "1985-03-22",
  "streetNumber": "5",
  "streetName": "Avenue du Parc",
  "postalCode": "44000",
  "city": "Nantes",
  "adressComplement": "",
  "email": "sophie.martin@camping.com",
  "password": "Admin123!",
  "phoneNumber": "0699887766",
  "arrivalDate": "2024-01-10 09:00:00",
  "roleId": 1
}
```

**Résultat attendu**
Status 201
Détails de l’insertion.

---

### 2.2. Connexion employé

**Requête**
**Method:** POST
**URL:** /employees/login

**Body (JSON)**

```json
{
  "email": "sophie.martin@camping.com",
  "password": "Admin123!"
}
```

**Résultat attendu**
Status 200
Message : "vous êtes connectés".

---

### 2.3. Récupérer tous les employés

**Requête**
**Method:** GET
**URL:** /employees/allEmployees

**Résultat attendu**
Status 200
Tableau d’employés.

---

### 2.4. Récupérer un employé par ID

**Requête**
**Method:** GET
**URL:** /employees/employeesById/1

**Résultat attendu**
Status 200
Objet employé.

---

### 2.5. Mettre à jour un employé

**Requête**
**Method:** PUT
**URL:** /employees/updateEmployee/1

**Body (JSON)**

```json
{
  "lastName": "Martin",
  "firstName": "Sophie",
  "dateOfBirth": "1985-03-22",
  "streetNumber": "8",
  "streetName": "Avenue du Parc",
  "postalCode": "44000",
  "city": "Nantes",
  "adressComplement": "Bâtiment B",
  "email": "sophie.martin@camping.com",
  "password": "Admin123!",
  "phoneNumber": "0699887766",
  "arrivalDate": "2024-01-10 09:00:00",
  "roleId": 1
}
```

**Résultat attendu**
Status 200
Message : "Employé mis à jour".

---

### 2.6. Suppprimer un employé

**Requête**
**Method:** DELETE
**URL:** /employees/deleteEmployee/1

**Résultat attendu**
Status 200
Message : "Employé supprimé".

---

## 3. Accommodations

### 3.1. Création d’un hébergement

**Requête**
**Method:** POST
**URL:** /accommodations/addAccommodation

**Body (JSON)**

```json
{
  "typeAccommodation": "Mobil-home Confort",
  "descriptionAccommodation": "Mobil-home 2 chambres avec terrasse",
  "abilityAccommodation": 4,
  "surfaceAccommodation": 32.0,
  "equipementAccommodation": "Climatisation;TV;Cuisine équipée",
  "availableAccommodation": true,
  "basePriceAccommodation": 70.0
}
```

**Résultat attendu**
Status 201
Détails de l’insertion.

---

### 3.2. Récupérer tous les hébergements

**Requête**
**Method:** GET
**URL:** /accommodations/allAccommodations

**Résultat attendu**
Status 200
Tableau des hébergements.

---

### 3.3. Récupérer un hébergement par ID

**Requête**
**Method:** GET
**URL:** /accommodations/accommodationById/1

**Résultat attendu**
Status 200
Objet hébergement.

---

### 3.4. Mise à jour d’un hébergement

**Requête**
**Method:** PUT
**URL:** /accommodations/updateAccommodation/1

**Body (JSON)**

```json
{
  "typeAccommodation": "Mobil-home Confort +",
  "descriptionAccommodation": "Mobil-home 2 chambres avec terrasse couverte",
  "abilityAccommodation": 4,
  "surfaceAccommodation": 32.0,
  "equipementAccommodation": "Climatisation;TV;Cuisine équipée;Terrasse couverte",
  "availableAccommodation": true,
  "basePriceAccommodation": 80.0
}
```

**Résultat attendu**
Status 200
Message de mise à jour.

---

### 3.5. Suppression d’un hébergement

**Requête**
**Method:** DELETE
**URL:** /accommodations/deleteAccommodation/1

**Résultat attendu**
Status 200
Message : "Hébergement supprimé".

---

## 4. Notices (avis)

### 4.1. Création d’un avis

**Requête**
**Method:** POST
**URL:** /notices/add

**Body (JSON)**

```json
{
  "userId": 1,
  "note": 5,
  "comment": "Super séjour, personnel très accueillant !"
}
```

**Résultat attendu**
Status 201
Message "Avis ajouté avec succès !" + id.

---

### 4.2. Récupérer tous les avis

**Requête**
**Method:** GET
**URL:** /notices/

**Résultat attendu**
Status 200
Tableau des avis.

---

### 4.3. Récupérer un avis par ID

**Requête**
**Method:** GET
**URL:** /notices/1

**Résultat attendu**
Status 200
Objet avis.

---

### 4.4. Mise à jour d’un avis

**Requête**
**Method:** PUT
**URL:** /notices/1

**Body (JSON)**

```json
{
  "note": 4,
  "comment": "Très bien, mais un peu de bruit le soir."
}
```

**Résultat attendu**
Status 200
Message "Avis mis à jour avec succès !".

---

### 4.5. Suppression d’un avis

**Requête**
**Method:** DELETE
**URL:** /notices/1

**Résultat attendu**
Status 200
Message "Avis supprimé avec succès !".

---

## 5. Reservations

### 5.1. Création d’une réservation

**Requête**
**Method:** POST
**URL:** /reservations/register

**Body (JSON)**

```json
{
  "arrivalDateReservation": "2025-07-10",
  "departureDateReservation": "2025-07-17",
  "numberAdult": 2,
  "numberChildren": 1,
  "priceHtReservation": 560.00,
  "tvaReservation": 112.00,
  "priceTotal": 672.00,
  "statusReservation": "validée",
  "userId": 1,
  "accommodationId": 1
}

```
**Résultat attendu**
Status 201 
Message “Réservation ajoutée avec succès !” + id de la réservation.

---

### 5.2. Récupérer toutes les réservations
**Requête**
**Method:** GET
**URL:** /reservations/

**Résultat attendu**
Status 200
Tableau de réservations.

---

### 5.3. Récupérer une réservation par ID
**Requête**
**Method:** GET
**URL:** /reservations/1

**Résultat attendu**
Status 200
Objet réservation.

---

### 5.4. Mise à jour d’une réservation
**Requête**
**Method:** PUT
**URL:** /reservations/update/1


**Body (JSON)**

```json
{ 
  "arrivalDateReservation": "2025-07-11", 
  "departureDateReservation": "2025-07-18", 
  "numberAdult": 2, 
  "numberChildren": 2, 
  "priceHtReservation": 630.00, 
  "tvaReservation": 126.00, 
  "priceTotal": 756.00, 
  "statusReservation": "validée", 
  "userId": 1, 
  "accommodationId": 1 
}
```

**Résultat attendu**
Status 200 ou 201
Message “Réservation modifiée avec succès !”.

---

### 5.5. Récupérer une réservation par ID
**Requête**
**Method:** DELETE
**URL:** /reservations/delete/1

**Résultat attendu**
Status 200 ou 201
Message “Réservation supprimée avec succès !”.

---

# Documentation API

## 6. Coupons

### 6.1. Création d'un coupon

**Requête**
- Method: POST
- URL: /coupons/register

**Body (JSON)**
```json
{
  "codeCoupon": "ETE2025",
  "valueReduction": 15.00,
  "expiryDate": "2025-08-31"
}
```

**Résultat attendu**
- Status: 201
- JSON:
```json
{
  "message": "Coupon créé avec succès !",
  "id": 1
}
```

### 6.2. Récupérer tous les coupons

**Requête**
- Method: GET
- URL: /coupons/

**Résultat attendu**
- Status: 200
- Tableau de coupons

### 6.3. Récupérer un coupon par ID

**Requête**
- Method: GET
- URL: /coupons/1

**Résultat attendu**
- Status: 200
- Objet coupon

### 6.4. Mise à jour d'un coupon

**Requête**
- Method: PUT
- URL: /coupons/update/1

**Body (JSON)**
```json
{
  "codeCoupon": "ETE2025PRO",
  "valueReduction": 20.00,
  "expiryDate": "2025-09-15"
}
```

**Résultat attendu**
- Status: 200
- Message: "Coupon mis à jour avec succès !"

### 6.5. Suppression d'un coupon

**Requête**
- Method: DELETE
- URL: /coupons/delete/1

**Résultat attendu**
- Status: 200
- Message: "Coupon supprimé avec succès !"

---

## 7. Payments (Paiements)

### 7.1. Création d'un paiement

**Requête**
- Method: POST
- URL: /payments/register

**Body (JSON)**
```json
{
  "reservationId": 1,
  "amount": 672.00,
  "referenceTransaction": "PAY-20250710-001",
  "paymentStatus": "payé",
  "paymentMethod": "carte"
}
```

**Résultat attendu**
- Status: 201
- JSON:
```json
{
  "message": "Paiement créé avec succès !",
  "id": 1
}
```

### 7.2. Récupérer tous les paiements

**Requête**
- Method: GET
- URL: /payments/

**Résultat attendu**
- Status: 200
- Tableau de paiements

### 7.3. Récupérer un paiement par ID

**Requête**
- Method: GET
- URL: /payments/1

**Résultat attendu**
- Status: 200
- Objet paiement

### 7.4. Mise à jour d'un paiement

**Requête**
- Method: PUT
- URL: /payments/update/1

**Body (JSON)**
```json
{
  "reservationId": 1,
  "amount": 672.00,
  "referenceTransaction": "PAY-20250710-001-UPDATED",
  "paymentStatus": "remboursé",
  "paymentMethod": "virement"
}
```

**Résultat attendu**
- Status: 200
- Message: "Paiement mis à jour avec succès !"

### 7.5. Suppression d'un paiement

**Requête**
- Method: DELETE
- URL: /payments/delete/1

**Résultat attendu**
- Status: 200
- Message: "Paiement supprimé avec succès !"

---

## 8. Roles

### 8.1. Création d'un rôle

**Requête**
- Method: POST
- URL: /roles/register

**Body (JSON)**
```json
{
  "nameRole": "Animateur",
  "descriptionRole": "Gère les animations et activités enfants"
}
```

**Résultat attendu**
- Status: 201
- JSON:
```json
{
  "message": "Rôle créé avec succès !",
  "id": 1
}
```

### 8.2. Récupérer tous les rôles

**Requête**
- Method: GET
- URL: /roles/

**Résultat attendu**
- Status: 200
- Tableau de rôles

### 8.3. Récupérer un rôle par ID

**Requête**
- Method: GET
- URL: /roles/1

**Résultat attendu**
- Status: 200
- Objet rôle

### 8.4. Mise à jour d'un rôle

**Requête**
- Method: PUT
- URL: /roles/update/1

**Body (JSON)**
```json
{
  "nameRole": "Animateur Senior",
  "descriptionRole": "Supervise animations et activités enfants"
}
```

**Résultat attendu**
- Status: 200
- Message: "Rôle mis à jour avec succès !"

### 8.5. Suppression d'un rôle

**Requête**
- Method: DELETE
- URL: /roles/delete/1

**Résultat attendu**
- Status: 200
- Message: "Rôle supprimé avec succès !"