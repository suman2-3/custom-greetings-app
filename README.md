# Custom Greetings & Wishes App

A React web application that lets users create personalized greeting cards with profile picture and name overlays. The app includes category filters, premium gating, preview, and image sharing.

Live Demo: https://custom-greetings-app.onrender.com/

## Project Structure

- `client/`: React application built with Create React App and Tailwind CSS
- `server/`: Node.js API serving greeting templates

## Features

- Login flow with Guest, Email, and mock Google sign-in options
- Profile setup with name and profile photo
- Template browsing by category
- Live preview of user overlay on greeting cards
- Native sharing support with fallback download, WhatsApp, and email actions
- Free/Premium content labels with a premium plan-selection popup
- Route protection and local storage persistence
- Backend `/api/templates` endpoint with client-side fallback data

## Setup

1. Open a terminal in the project root and start the backend:
   ```bash
   cd server
   npm start
   ```
2. Open another terminal in the project root and start the client:
   ```bash
   cd client
   npm install
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

The client reads templates from `http://localhost:5000/api/templates` by default. To use a different API URL, set `REACT_APP_API_URL`.

## Notes

- The app currently uses a mock Google login flow and demo premium checkout for evaluation purposes.
- The client falls back to local template data if the backend is unavailable.
