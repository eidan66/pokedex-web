
# **Pokedex Web Application**

This repository contains the codebase for the Pokedex Web Application. The application uses a React frontend, a NestJS backend, Redis for caching, and PostgreSQL for the database.

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/eidan66/pokedex-web.git
cd pokedex-web
```

---

### **2. Create the `.env` File**

Navigate to the `backend` directory and create a `.env` file with the following content:

(You can create JWT_SECRET when running this command inside the terminal)
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```


```plaintext
# JWT Secret
JWT_SECRET=your-super-duper-secret-jwt

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_TTL=300
```

---

### **3. Start the Application**

Run the following command to start the application using Docker Compose:

```bash
docker-compose up --build
```

---

### **4. Access the Application**

- **Frontend**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
- **Backend**: The API is available at [http://localhost:8000](http://localhost:8000).

---

## **Stopping the Application**

To stop the Docker containers, run:
```bash
docker-compose down
```

---

## **Contributing**

Feel free to open issues or submit pull requests to improve this project.

