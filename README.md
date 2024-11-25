
# **Pokedex Web Application**

This repository contains the codebase for the Pokedex Web Application. The application uses a React frontend, a NestJS backend, Redis for caching, and PostgreSQL for the database.

---

## **Previews**

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1ff69347-44a2-479f-ac2b-9d92cd54b323" alt="homepage" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/67144e6e-b7ea-43e2-8f6e-581b8f7dfed6" alt="pokemon list" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/5b6f2ae8-cc3b-4383-8c33-874ef5a0e795" alt="pokemon details" width="300"/></td>
  </tr>
  <tr>
    <td align="center"><b>Homepage</b></td>
    <td align="center"><b>Pokemon List</b></td>
    <td align="center"><b>Pokemon Details</b></td>
  </tr>
</table>

---

## **Tech Stack**

This project uses the following technologies:

<table>
  <tr>
    <td align="center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="50"/>
      <br><b>React</b>
    </td>
    <td align="center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="50"/>
      <br><b>TypeScript</b>
    </td>
    <td align="center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" alt="Nest.js" width="50"/>
      <br><b>Nest.Js</b>
    </td>
    <td align="center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="50"/>
      <br><b>PostgreSQL</b>
    </td>
    <td align="center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" width="50"/>
      <br><b>Redis</b>
    </td>
    <td align="center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width="50"/>
      <br><b>Docker</b>
    </td>
  </tr>
</table>

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
