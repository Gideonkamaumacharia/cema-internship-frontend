# Health Info System Documentation

## Project Overview

A Single Page Application (SPA) built with React and Vite for doctors to securely manage clients and health programs. Features:

API key entry & validation

Client registration, searching, and profile viewing

Health program creation

Client enrollment via checkbox list

Role-based Admin Panel for provisioning doctor API keys

# Deployed Application

You can access the deployed Health Information Management System frontend [here](https://cemahealthportal.netlify.app/).

# Directory Structure

    frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx             # Main router & layout
    │   ├── main.jsx            # ReactDOM render entrypoint
    │   ├── components/         # Reusable UI components
    │   │   ├── LandingPage.jsx
    │   │   ├── ApiKeyPrompt.jsx
    │   │   ├── RegisterClient.jsx
    │   │   ├── SearchClients.jsx
    │   │   ├── ViewClientProfile.jsx
    │   │   ├── CreateProgram.jsx
    │   │   ├── EnrollClient.jsx
    │   │   └── AdminPanel.jsx
    ├── vite.config.js          # Dev server proxy configuration
    └── package.json            # Dependencies & scripts

# Setup & Run

## 1.Install dependencies

cd frontend
npm install

## 2.Configure proxy in vite.config.js:

// redirects /api to Flask backend
server: { proxy: { '/api': 'http://localhost:5000' } }

## 3.Start dev server

npm run dev

## 4.Access application at http://localhost:5173

# Workflow

## 1.Landing Page → click Get Started

## 2.API Key Prompt → paste your key and verify

## 3.Doctor Portal (protected) with nav links:

Register Client

Search Clients

View Client Profile

Create Program

Enroll Client (checkbox list)

Admin Panel (if super-admin)

# Key Components

## LandingPage.jsx
Full-screen welcome card with gradient background and Get Started button.

## ApiKeyPrompt.jsx
Input + button + loading/error states; validates key via /api/auth/validate.

## RegisterClient.jsx
Card form for client details; submits to /api/clients/register.

## SearchClients.jsx
Search input + button; fetches /api/clients/search?q= and displays results.

## ViewClientProfile.jsx
Lookup by client ID; displays profile and enrolled programs.

## CreateProgram.jsx
Form to create a new health program via /api/programs/.

## EnrollClient.jsx
Fetches available programs from /api/programs/list; displays checkbox grid; posts selected IDs to /api/enrollments/:client_id.

## AdminPanel.jsx 
Super-admin form to onboard new doctors via /api/admin/doctors and email API keys.

# Scripts

npm run dev — start dev server (HMR)

npm run build — production build

npm run preview — serve production build locally