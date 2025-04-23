# Health & Fitness Tracker - README

## Technology Stack

### Frontend
- React.js
- Redux with Redux Toolkit
- React Router v6
- Axios
- Chart.js

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- MySQL Database
- JWT Authentication
- Swagger/OpenAPI

---

## Prerequisites

Before you begin, ensure you have the following installed:

- .NET 8 SDK
- Node.js (v14 or later)
- npm
- MySQL
- Visual Studio Code or any preferred IDE

---

## How to Run

### Step 1: Install NuGet Packages

Run the following commands to install the required NuGet packages:

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 8.0.3
dotnet add package Microsoft.AspNetCore.OpenApi --version 8.0.13
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.13
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.13
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.13
dotnet add package Microsoft.IdentityModel.Tokens --version 8.0.0
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.3
dotnet add package Swashbuckle.AspNetCore --version 6.6.2
dotnet add package System.IdentityModel.Tokens.Jwt --version 8.0.0
```

### Step 2: Setup Frontend

Navigate to the client directory and install npm packages:

```bash
cd ../client
npm install
```

Install additional dependencies:

```bash
npm install @reduxjs/toolkit@1.9.5 \
            @testing-library/dom@10.4.0 \
            @testing-library/jest-dom@6.6.3 \
            @testing-library/react@16.2.0 \
            @testing-library/user-event@13.5.0 \
            axios@1.4.0 \
            http-proxy-middleware@2.0.6 \
            lucide-react@0.482.0 \
            react@18.3.1 \
            react-dom@18.3.1 \
            react-icons@5.5.0 \
            react-redux@8.1.1 \
            react-router-dom@6.14.2 \
            recharts@2.15.1 \
            redux@4.2.1 \
            web-vitals@2.1.4
```

### Step 3: Setup Database

Create a MySQL database named `HealthFitnessTracker`:

```sql
CREATE DATABASE HealthFitnessTracker;
USE HealthFitnessTracker;
```

Run the database creation script (`HealthFitnessTracker_DB_Setup.sql`) using MySQL Workbench, MySQL command line, or any other MySQL client.

### Step 4: Configure Backend

Update `appsettings.json` with your database connection and JWT settings:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=HealthFitnessTracker;User Id=sa;Password=yourpassword;TrustServerCertificate=True;"
  },
  "AppSettings": {
    "Token": "your_jwt_token",
    "Issuer": "HealthFitnessTrackerAPI",
    "Audience": "HealthFitnessTrackerAPI"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

### Step 5: Configure Frontend

Update `setupProxy.js` in the client directory:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5009',
      changeOrigin: true,
    })
  );
};
```

### Step 6: Run the Application

#### Start the Backend:

```bash
cd server
dotnet run
```

The API will be available at [http://localhost:5009](http://localhost:5009) with Swagger documentation at [http://localhost:5009/swagger](http://localhost:5009/swagger).

#### Start the Frontend:

```bash
cd client
npm start
```

The React app will be available at [http://localhost:3000](http://localhost:3000).

### Step 7: Swagger Authentication

When using Swagger UI for API testing, authorize with the following format:

```text
Bearer your_jwt_token
```

---

## Configuration

### Backend Configuration

Update `appsettings.json` with your database connection and JWT settings:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=HealthFitnessTracker;User Id=sa;Password=yourpassword;TrustServerCertificate=True;"
  },
  "AppSettings": {
    "Token": "your_jwt_token",
    "Issuer": "HealthFitnessTrackerAPI",
    "Audience": "HealthFitnessTrackerAPI"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

**Important Security Note:**
For production environments, do not commit actual secrets to source control. Use user secrets, environment variables, or a secure vault service instead.

Update the CORS policy in `Program.cs` if needed:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:3000") // Update with your React app URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
```

### Frontend Configuration

Create or update `.env` file in the client directory:

```text
REACT_APP_API_URL=http://localhost:5009/api
```

Update `setupProxy.js` if needed:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5009',
      changeOrigin: true,
    })
  );
};
```

---

## Running the Application

### Backend

```bash
cd server
dotnet run
```

The API will be available at [http://localhost:5009](http://localhost:5009) with Swagger documentation at [http://localhost:5009/swagger](http://localhost:5009/swagger).

### Frontend

```bash
cd client
npm start
```

The React app will be available at [http://localhost:3000](http://localhost:3000).

## API Documentation

API documentation is available via Swagger. When the backend is running, navigate to:

[http://localhost:5009/swagger/index.html](http://localhost:5009/swagger/index.html)

