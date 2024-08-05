# Article Management Backend

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file if not exist in the root directory with the following variables:
MONGO_URI=mongodb+srv://admin:admin@cluster0.2mwxo7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=my_jwt_secret
PORT=5000
4. Start the server: `npm run dev`

## API Endpoints

### Auth

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `POST /api/auth/update-role`: Update user role
- `POST /api/auth/me`: Get user data

### Articles

- `POST /api/articles`: Create a new article (protected route)
- `GET /api/articles`: Get all articles (protected route)
- `GET /api/articles/:id`: Get a single article by ID (protected route)
- `PUT /api/articles/:id`: Update an article by ID (protected route)
- `DELETE /api/articles/:id`: Delete an article by ID (protected route)
