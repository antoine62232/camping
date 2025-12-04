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