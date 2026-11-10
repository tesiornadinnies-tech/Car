# CarFinder

CarFinder is a responsive, client-side React application for discovering cars, narrowing down a curated collection, viewing vehicle details, and saving favorites. It was built as a Web Systems and Technologies final project.

## Features

- Search by make, model, trim, year, fuel type, or body style.
- Filter by make and body style; sort by price or model year.
- Browse paginated results, open a car's detail page, and save favorites to `localStorage`.
- Navigate between discovery, car details, and saved cars with React Router.
- Load 2025 vehicle models for popular makes from the public NHTSA vPIC API, with loading, error, and retry states. The curated sample listings remain available if the API is offline.
- Responsive layouts for desktop, tablet, and mobile.

Vehicle listings and prices are sample data for demonstration; they are not current offers. NHTSA supplies vehicle make and model names, not photos, prices, or current listings. NHTSA-powered cars use illustrative photos, and their prices and vehicle specifications are shown as unavailable rather than guessed.

## API

- [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/): public vehicle and manufacturer database.
- [Passenger-car makes endpoint](https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json)
- [Vehicle models by make and year](https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/toyota/modelyear/2025/vehicletype/car?format=json): the app loads 2025 model names for popular manufacturers.

The app also loads vehicle photography from [Unsplash](https://unsplash.com/). Both services are accessed directly by the browser.

## Setup

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

Run the linter with `npm run lint`.

## Environment variables

No API key or `.env` file is required. The NHTSA vPIC endpoint is public. Car favorites are stored locally in the browser and are not sent to a server.

## Team contributions

Update the names below to match your project pair before submission:

- **Team member 1:** React app structure, vehicle API integration, and search/filter behavior.
- **Team member 2:** Responsive interface, car detail and favorites views, testing, and project documentation.

## GitHub collaboration

Use feature branches (for example, `feature/search`, `feature/favorites`, or `feature/api`) and merge completed work into the default branch through pull requests. Avoid committing directly to the default branch.
