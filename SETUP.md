# Project Setup

This document provides instructions on how to set up and run this project locally.

## Prerequisites

*   Node.js (v18 or later)
*   npm

## 1. Installation

First, clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

## 2. Environment Variables

Create a `.env` file in the root of your project and add the following environment variables. This file will store sensitive information and should not be committed to version control.

```
# Database
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"

# Authentication
NEXTAUTH_SECRET="<your-nextauth-secret>"
GOOGLE_CLIENT_ID="<your-google-client-id>"
GOOGLE_CLIENT_SECRET="<your-google-client-secret>"

# Google Generative AI
GEMINI_API_KEY="<your-gemini-api-key>"
```

### Obtaining the values:

*   **`DATABASE_URL`**: This is the connection string for your PostgreSQL database. You can get this from your database provider.
*   **`NEXTAUTH_SECRET`**: You can generate a secure secret by running the following command in your terminal:
    ```bash
    openssl rand -hex 32
    ```
*   **`GOOGLE_CLIENT_ID`** and **`GOOGLE_CLIENT_SECRET`**:
    1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
    2.  Create a new project or select an existing one.
    3.  Navigate to **APIs & Services > Credentials**.
    4.  Click **Create Credentials > OAuth client ID**.
    5.  Select **Web application** as the application type.
    6.  Add `http://localhost:3000` to the **Authorized JavaScript origins**.
    7.  Add `http://localhost:3000/api/auth/callback/google` to the **Authorized redirect URIs**.
    8.  Click **Create** and copy the **Client ID** and **Client Secret**.
*   **`GEMINI_API_KEY`**:
    1.  Go to [Google AI Studio](https://makersuite.google.com/).
    2.  Click **Get API key**.
    3.  Create a new API key and copy it.

## 3. Database Migration

Before starting the server, you need to apply the database schema. Run the following command:

```bash
npx prisma db push
```

## 4. Running the Application

Once you have completed the setup, you can run the development server with the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.
