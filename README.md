# Experience API

Detta är ett REST API byggt med Node.js, Express och MongoDB som hanterar arbetserfarenheter. Det möjliggör fullständig CRUD-funktionalitet (Create, Read, Update, Delete).

## Tekniker som används

- Node.js
- Express
- MongoDB + Mongoose
- CORS
- dotenv

## Installation

1. Klona detta repo:

   ```bash
   git clone https://github.com/nathalievaster/rest-mongoDB.git
   cd rest_mongodb
   ```

2. Installera beroenden: 

   ```bash
 npm install cors express dotenv mongoose
 npm install nodemon --save-dev
 

3. Skapa en `.env`-fil i root-mappen och lägg till:
```bash
MONGO_URI=mongodb://localhost:27017/experiencesDB PORT=3000
```

4. Starta servern med:
   ```bash
   npm run dev
   ```


## API-endpoints (CRUD)

| Metod | URI                      | Beskrivning                       |
|-------|--------------------------|-----------------------------------|
| GET   | `/experiences`           | Hämta alla erfarenheter           |
| GET   | `/experiences/:id`       | Hämta en specifik erfarenhet      |
| POST  | `/experiences`           | Lägg till en ny erfarenhet        |
| PUT   | `/experiences/:id`       | Uppdatera en befintlig erfarenhet|
| DELETE| `/experiences/:id`       | Radera en erfarenhet              |

## Exempel på POST-request (JSON)

```json
{
"company": "Google",
"position": "Webbutvecklare",
"startDate": "2022-01-15",
"endDate": "2023-04-30",
"description": "Utvecklade webbapplikationer"
}
```
