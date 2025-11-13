# Movie Explorer
Using Node.js 18+, React 18, TypeScript, Express, MongoDB.
## Development server

### Backend
cd server
npm install

Create `.env` in `server/`:
PORT=4000
MONGO_URI=<your-mongodb-uri>
TMDB_API_KEY=<your-tmdb-api-key>

Run backend:
npm run dev
Server runs at http://localhost:4000

### Frontend
cd frontend
npm install

Create `.env` in `client/`:
REACT_APP_SERVER_URL=http://localhost:4000/api

Run frontend:
npm run start

App runs at http://localhost:3000
