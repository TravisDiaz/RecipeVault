#  Recipe Vault - Full Stack Technical Assessment

A full-stack application to manage recipes, built with **NestJS** (Backend) and **Next.js** (Frontend).

## Tech Stack

### Backend
* **Framework:** NestJS (Node.js)
* **Language:** TypeScript
* **Database:** MongoDB (via Mongoose)
* **Architecture:** Modular (Controller-Service-Repository pattern)

### Frontend
* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS (Responsive Design)
* **HTTP Client:** Axios
* **Language:** TypeScript

---

##  Project Structure

This is a monorepo-style structure:
* `src/`: Contains the **NestJS Backend** source code.
* `client/`: Contains the **Next.js Frontend** source code.

---

##  Getting Started

Follow these steps to run the application locally.

### 1. Prerequisites
* Node.js (v18 or later)
* npm
* A MongoDB instance (Atlas URI or Local Docker)

### 2. Backend Setup (Port 3000)

1.  Install root dependencies:
    ```bash
    npm install
    ```

2.  **Environment Configuration:**
    Create a `.env` file in the **root directory**. You can use `.env.template` as a reference:
    ```env
    PORT=3000
    MONGO_URI=mongodb+srv://admin:password@cluster... (Your Atlas URI)
    ```

3.  Run the Backend Server:
    ```bash
    npm run start:dev
    ```
     Server will start at: `http://localhost:3000`

### 3. Frontend Setup (Port 3001)

1.  Open a **new terminal** and navigate to the client folder:
    ```bash
    cd client
    ```

2.  Install frontend dependencies:
    ```bash
    npm install
    ```

3.  Run the Frontend Development Server:
    ```bash
    npm run dev
    ```
     Client will start at: `http://localhost:3001`

---

## Usage

Once both servers are running:
1.  Open your browser at **[http://localhost:3001](http://localhost:3001)**.
2.  **View Recipes:** The homepage displays a responsive grid of recipes (1 column on mobile, 4 column grid for ingredients on desktop).
3.  **Create Recipe:** Click "+ New Recipe" to add a title, difficulty, and dynamic ingredients.
4.  **Edit/Delete:** Use the buttons on each recipe card.

---

## Design Decisions

### Backend
* **Mongoose for ODM:** Chosen for its strict schema validation to ensure consistent data structure (e.g., enforcing `difficulty` ENUMS).
* **DTOs (Data Transfer Objects):** Used to validate incoming data before it reaches the business logic layer, preventing "bad requests" early.
* **Clean Architecture:** Strict separation between Controllers (HTTP handling) and Services (Business Logic).

### Frontend
* **Next.js App Router:** Utilized for modern routing and server-side optimization capabilities.
* **Component Reusability:** Created a separate `RecipeCard` component to keep the main page clean and maintainable.
* **Responsive UI:** Tailored with Tailwind CSS to offer different layouts for Mobile (stacked) vs Desktop (expanded view).

---

**Author:** Travis Díaz
