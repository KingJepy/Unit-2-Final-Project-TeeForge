# TeeForge: Custom T-Shirt Designer (Full-Stack Web Application)

<div align="center">
  <h2>A custom T-shirt design platform built to streamline my personal T-shirt business.</h2>
  <br />
  <img src="https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=20232A" />
  <img src="https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=323330" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge" />
</div>

<div align="center">
  <a href="#about">About</a> • 
  <a href="#features">Features</a> • 
  <a href="#visuals">Key Visuals</a> • 
  <a href="#tech">Tech Stack</a> • 
  <a href="#installation">Installation</a> • 
  <a href="#database">Database</a> • 
  <a href="#api">API</a> • 
  <a href="#future">Future Features</a> • 
  <a href="#author">Author</a>
</div>

---

## 💡 About the Project <a name="about"></a>

TeeForge is a full-stack T-shirt customization platform built to support and modernize my personal T-shirt business.

- Customers can upload images, position them on a shirt preview, choose colors, save their designs, and submit orders.
- Streamlines the process of capturing custom design requests.
- Reduces back-and-forth communication with customers.
- Automatically stores user designs and image metadata.
- Provides a foundation for a future admin dashboard to track orders and manage designs.

Built with a **React + Vite frontend**, a **Spring Boot backend**, and a **MySQL database**, TeeForge reflects real production workflows for small business automation.

---

## 🎨 Features <a name="features"></a>

### 👕 T-Shirt Designer
- Upload PNG/JPG images.
- Drag, drop, reposition, and scale images on a shirt preview.
- Choose shirt color.
- Save and load designs at any time.

### 💾 Saved Designs
- Logged-in users can view all previously created designs.
- Designs store each image and its placement coordinates.
- Easy for customers to resubmit or adjust earlier creations.

### 📝 Ordering System
- Built-in order form that attaches the selected design..

---

## 🖼️ Key Visuals <a name="visuals"></a>

<details>
<summary>Click to expand key visuals</summary>

### Homepage
![TeeForge Homepage](./preview/TeeForge%20homepage.PNG)

### T-Shirt Designer
![T-Shirt Designer](./preview/tshirt%20designer.PNG)

### Design Saved Notification
![Design Saved Successfully](./preview/design%20saved%20successfully.PNG)

### Saved Designs Page
![Saved Designs](./preview/saved%20Designs.PNG)

### Order Form
![Order Form](./preview/order%20form.PNG)

</details>

---

## 🛠️ Tech Stack <a name="tech"></a>

### Frontend
| Technology | Description |
|------------|-------------|
| React      | Component-based UI library for building the interface |
| React-RND     | Tool tht powers the resize, drag and drop functionality |
| JavaScript | Main scripting language for client logic |
| Vite       | Lightning-fast development server and bundler |
| CSS        | Layout, styling, and responsiveness |

### Backend & Database
| Technology   | Description |
|--------------|-------------|
| Java         | Primary backend language |
| Spring Boot  | REST API, dependency injection, data layer management |
| MySQL        | Relational database to store users, designs, and images |
| Hibernate/JPA| ORM for interacting with database models |
| Maven        | Dependency & build management |

---

## 🚀 Installation & Setup

To run **TeeForge** locally, you need:

* **Node.js** (LTS)
* **Java 21+**
* **MySQL 8+**
* **Maven**

---

### Backend Setup

1.  **Clone the project:**
    ```bash
    git clone [https://github.com/KingJepy/Unit-2-Final-Project-TeeForge.git](https://github.com/KingJepy/Unit-2-Final-Project-TeeForge.git)
    cd TeeForge/backend
    ```

2.  **Create a MySQL database:**
    ```sql
    CREATE DATABASE teeforge_db;
    ```

3.  **Add your environment variables** in `application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/teeforge_db
    spring.datasource.username=YOUR_USERNAME
    spring.datasource.password=YOUR_PASSWORD
    
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    ```

4.  **Run the Spring Boot app:**
    ```bash
    mvn spring-boot:run
    ```

The **Backend** now runs at:
 **http://localhost:8080**

---

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```

The **Frontend** runs at:
 **http://localhost:5173**

---
## 🗄️ Database Structure (ERD) <a name="database"></a>

### USERS
| Field        | Type   | Description                 |
|--------------|--------|-----------------------------|
| user_id      | int    | Primary Key                 |
| username     | String | User’s chosen display name  |
| email        | String | User email                  |
| passwordHash | String | Encrypted password          |

### DESIGNS
| Field      | Type          | Description                 |
|------------|---------------|-----------------------------|
| design_id  | int           | Primary Key                 |
| user_id    | int           | FK → USERS                  |
| shirtColor | String        | Selected color              |
| createdAt  | LocalDateTime | When the design was created |
| updatedAt  | LocalDateTime | Last updated                |

### IMAGES
| Field      | Type   | Description                 |
|------------|--------|-----------------------------|
| image_id   | int    | Primary Key                 |
| design_id  | int    | FK → DESIGNS                |
| imageUrl   | String | Location of uploaded image  |
| fileName   | String | Original filename           |
| placementX | int    | X position in designer      |
| placementY | int    | Y position in designer      |
| width | int    | stores width of image      |
| height | int    | stores height in designer      |

---

## ⚙️ API Endpoints <a name="api"></a>

<details>
<summary>Click to expand API endpoints</summary>

### 👤 Users
| Method | Endpoint       | Description        |
|--------|----------------|------------------|
| GET    | /api/users     | Get all users     |
| GET    | /api/users/{id}| Get a user by ID  |
| POST   | /api/users     | Create a new user |
| PUT    | /api/users/{id}| Update a user     |
| DELETE | /api/users/{id}| Delete a user     |

### 🎨 Designs
| Method | Endpoint                     | Description            |
|--------|-------------------------------|------------------------|
| GET    | /api/designs                 | Get all designs        |
| GET    | /api/designs/{id}            | Get design by ID       |
| GET    | /api/designs/user/{userId}   | Get designs by user    |
| POST   | /api/designs                 | Create a new design    |
| PUT    | /api/designs/{id}            | Update a design        |
| DELETE | /api/designs/{id}            | Delete a design        |

### 🖼️ Images
| Method | Endpoint                   | Description             |
|--------|-----------------------------|-------------------------|
| GET    | /api/images                 | Get all images          |
| GET    | /api/images/{id}            | Get image by ID         |
| GET    | /api/images/design/{designId}| Get images for a design |
| POST   | /api/images                 | Create image record     |
| PUT    | /api/images/{id}            | Update image            |
| DELETE | /api/images/{id}            | Delete image            |

</details>

---

## 🔮 Future Features <a name="future"></a>
- Admin dashboard for viewing orders with admin privileges
- Convert image data from base64 for efficient data storage
- Store data in cloud storage system
- Sort/filter by date, shirt color, customer, status
- Enhanced designer tools (rotate images, add text overlays)
- Built-in checkout system
- Automatic email notifications
- Password reset
- Profile settings

---

## 🧑 Designer & Author <a name="author"></a>
Joseph Moslander – Creator of TeeForge  

- GitHub: [@KingJepy](https://github.com/KingJepy)  
- LinkedIn: [Joseph Moslander](https://www.linkedin.com/in/joseph-moslander-7566a0354/)  

TeeForge was built to streamline my custom T-shirt business and modernize the way customers submit designs.
