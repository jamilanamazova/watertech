# WaterTech Prototype 2025

A smart water quality monitoring platform for farmers in Azerbaijan. This prototype demonstrates real-time water quality monitoring, analytics, and recommendations for optimal irrigation management.

## Environment Setup

This project doesn't require any special environment variables to run. Simply follow the "Getting Started" section below.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Real-time Water Quality Monitoring**: View water quality parameters like pH, EC, temperature, and nitrate levels
- **Data Analytics**: Analyze trends and patterns in water quality over time
- **Recommendations**: Get AI-powered recommendations for irrigation management
- **Alerts and Notifications**: Receive alerts when water quality parameters exceed thresholds

## Tech Stack

- Next.js 14.0.4 with App Router
- React 18.2.0
- Tailwind CSS for styling
- Recharts for data visualization

## Project Structure

```plaintext
src/
├── app/                   # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, register, etc.)
│   ├── (dashboard)/       # Dashboard pages
│   │   ├── dashboard/     # Main dashboard page
│   │   ├── analytics/     # Data analytics pages
│   │   ├── sensors/       # Sensor management
│   │   ├── reports/       # Reports and data exports
│   │   └── settings/      # User and system settings
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── layout/            # Layout components
│   └── ui/                # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Library functions and utilities
└── utils/                 # Utility functions
```

## Deployment

This is a prototype application intended for demonstration purposes. For production deployment, additional security measures and optimizations should be implemented.
