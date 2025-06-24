# E-Commerce API

A robust RESTful API for an e-commerce platform built with Node.js, Express, TypeScript, and MongoDB. This API provides endpoints for managing products and categories with CRUD operations.

## 🚀 Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: MongoDB with Mongoose ODM
-   **Development**: Nodemon, Concurrently
-   **Code Quality**: Prettier

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

-   **Node.js** (v20 or higher)
-   **npm**
-   **MongoDB** (local or MongoDB Atlas)

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd e-commerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080

# MongoDB Configuration
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_HOST=your_mongodb_host
MONGODB_DATABASE_NAME=your_database_name
```

### 4. Build the Project

```bash
npm run build
```

## 🏃‍♂️ Running the Project

```bash
# Run in development mode with hot reload
npm run dev
```

The server will start on `http://localhost:8080` (or the port specified in your `.env` file).

## 📁 Project Structure

```
e-commerce/
├── src/
│   ├── components/
│   │   ├── category/
│   │   │   ├── model/
│   │   │   ├── schema/
│   │   │   ├── types/
│   │   │   └── v1/
│   │   └── Products/
│   │       ├── model/
│   │       ├── schema/
│   │       ├── types/
│   │       └── v1/
│   ├── middleware/
│   ├── routes/
│   ├── app.ts
│   └── server.ts
├── build/
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Categories

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | `/api/v1/categories`     | Create a new category |


### Products

| Method | Endpoint                                 | Description              |
| ------ | ---------------------------------------- | ------------------------ |
| POST   | `/api/v1/products`                       | Create a new product     |
| GET    | `/api/v1/products`                       | Get all products         |
| GET    | `/api/v1/products?category=CategoryName` | Get products by category |
| GET    | `/api/v1/products/:id`                   | Get product by ID        |

## 📝 Sample CURL Commands

### Categories

#### 1. Create Categories

```bash
# Create Electronics Category
curl -X POST http://localhost:8080/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "category_name": "Electronics",
    "category_description": "Electronic devices and gadgets for everyday use"
  }'
```

### Products

#### 1. Create Products (Electronics Category)

```bash
# Create iPhone Product
curl -X POST http://localhost:8080/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "iPhone 15 Pro",
    "product_description": "Latest iPhone with advanced camera system and A17 Pro chip",
    "category_id": "685a8d6f1dc80c12cd8e1502",
    "product_price": "99999",
    "product_quantity": 50,
    "product_image": "https://example.com/iphone15pro.jpg"
  }'
```
#### 2. Get All Products

```bash
curl -X GET http://localhost:8080/api/v1/products
```

#### 3. Get Products by Category

```bash
curl -X GET "http://localhost:8080/api/v1/products?category=Electronics"
```

#### 4. Get Product by ID

```bash
curl -X GET http://localhost:8080/api/v1/products/685a8e81d13494f386deaa80
```

**Note**: Replace `CATEGORY_ID_HERE` and `PRODUCT_ID_HERE` in the curl commands with actual IDs from your database after creating the respective records.
