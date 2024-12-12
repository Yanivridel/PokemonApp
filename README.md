# [Pokémon App](https://pokemon-app-client-nu.vercel.app/)

This is a full-stack web application built with **React.js**, **Express.js**, **MongoDB**, and **MUI** (Material UI). The app allows users to view a list of Pokémon, access individual Pokémon details, and perform user authentication via login and signup. The backend is built with **Express.js** and interacts with a **MongoDB** database using **Mongoose** for data modeling. **JWT** is used for authentication, and **bcrypt** is used for securely hashing passwords.

## Features

- **User Authentication**: Sign up, log in, and access user-specific settings.
- **Pokémon List**: View a list of Pokémon fetched from an API.
- **Pokémon Details**: View detailed information about individual Pokémon.
- **Responsive Design**: Mobile-friendly layout using **Material UI** (MUI).
- **Error Handling**: 404 error handling for invalid routes.
  
## Tech Stack

- **Frontend**: React.js, MUI, React Router DOM, Axios
- **Backend**: Express.js, Node.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt.js
- **Hosting**: Vercel (Frontend), Render (Backend)

## Live Demo

You can access the live version of the app here:

- **Client (Frontend)**: [pokemon-app-client](https://pokemon-app-client-nu.vercel.app)
- **API (Backend)**: [pokemon-app-server](https://pokemonappserver.onrender.com)

## Installation

### Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (locally or use a cloud service like MongoDB Atlas)
- **npm** or **yarn** for package management

### Setup for Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-app.git
   cd pokemon-app
