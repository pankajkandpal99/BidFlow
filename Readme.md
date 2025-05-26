# Procurement Management System

A full-stack application for managing bids and contracts with automated email processing capabilities. Built with React (Vite), TypeScript, and Nest.js.

## Features

- **Role-based Access Control**
  - ADMIN and PROCURE_MANAGER can view/manage bids
  - Secure JWT authentication
- **Bid Management**
  - Automated bid email identification and classification
  - Bid tracking with status updates
  - Document attachment handling
- **Contract Management**
  - Contract creation from approved bids
  - Status tracking (Draft, Active, Completed, Terminated)
- **Dashboard**
  - Real-time statistics and analytics
  - Search and filtering capabilities
- **Email Integration**
  - Automatic bid email processing (IMAP)
  - Email-to-bid linking

## Technologies

### Client
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: Redux Toolkit
- **Authentication**: JWT (Browser localStorage)
- **Build Tool**: Vite

### Server
- **Framework**: Nest.js
- **Language**: TypeScript
- **CRONJOB**: Every 5 min check
- **ORM**: Prisma
- **Database**: PostgreSQL (NeonDB)
- **Email Processing**: IMAP (with TLS)

## Project Structure
