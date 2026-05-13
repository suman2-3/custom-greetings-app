# Custom Greetings & Wishes App

A React web application that lets users create personalized greeting cards with profile picture and name overlays. The app includes category filters, premium gating, preview, and image sharing.

## Project Structure

- `client/`: React application built with Create React App and Tailwind CSS
- `server/`: placeholder for future backend implementation

## Features

- Login flow with Guest, Email, and mock Google sign-in options
- Profile setup with name and profile photo
- Template browsing by category
- Live preview of user overlay on greeting cards
- Native sharing support with fallback download, WhatsApp, and email actions
- Free/Premium content labels with a premium plan-selection popup
- Route protection and local storage persistence

## Setup

1. Open a terminal in the project root.
2. Change into the client folder:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

## Notes

- The app currently uses a mock Google login flow and demo premium checkout for evaluation purposes.
- The backend folder is currently empty; you can extend it later with a real API or database.
