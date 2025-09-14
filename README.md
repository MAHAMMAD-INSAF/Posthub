# PostHub

A simple and responsive social media web application where users can create an account, share posts, and interact with content. The project is built with a Node.js and Express.js backend, uses MongoDB for data storage, and features a clean, responsive frontend styled with Tailwind CSS.

## Features

*   **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens) and password hashing with bcrypt.
*   **Post Management:** Users can create, edit, and delete their own posts.
*   **Post Interaction:** Users can like and unlike posts.
*   **User Profiles:** A dedicated profile page for each user to view and manage their posts.
*   **Responsive Design:** The UI is fully responsive and works seamlessly across desktops, tablets, and mobile devices.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose for object data modeling.
*   **Frontend:** EJS (Embedded JavaScript) for templating and Tailwind CSS for styling.
*   **Authentication:** JSON Web Tokens (JWT) for session management.
*   **Image Uploads:** Multer for handling file uploads.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) installed on your machine.
*   A running instance of [MongoDB](https://www.mongodb.com/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/posthub.git
    cd posthub
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up your environment:**
    You will need to have a MongoDB connection string. You may need to add this to your `app.js` or a configuration file.

4.  **Start the server:**
    ```bash
    node app.js
    ```

    The application will be available at `http://localhost:3000`.

## How to Use

1.  Navigate to `http://localhost:3000`.
2.  Create a new account or log in if you already have one.
3.  From your profile page, you can create new posts.
4.  View your posts on your profile and interact with them by liking, editing, or deleting them.
