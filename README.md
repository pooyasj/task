# Device Dashboard

A Next.js dashboard for viewing and managing network devices. The current data source is a local mock JSON file, with TanStack Query used to simulate an API request.

## Requirements

- Node.js 20 or newer
- npm

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard). If port 3000 is already in use, Next.js will select another available port and print the URL in the terminal.

## Available Scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Start the production server
```

For a production run:

```bash
npm run build
npm run start
```

## Dashboard Features

- Search devices by name or IP address with a 300ms debounce.
- Filter devices by `All`, `Online`, `Offline`, or `Warning`.
- Keep search and status filters synchronized with URL parameters:
  `?search=192.168&status=Online`.
- Show Skeleton Loading while mock data is fetched with a short simulated delay.
- Add a device through a validated modal form using Zod and React Hook Form.
- Validate required device names and IPv4 addresses.
- Delete a device after user confirmation.
- Display status-specific badges and an active Dashboard sidebar item.

Added and deleted devices are kept in the current client session. The mock JSON file is not modified.

## Project Structure

```text
src/
	app/
		dashboard/       Dashboard route and loading UI
	features/dashboard/
		components/      Table, forms, dialogs, and Skeleton UI
		data/             Mock device data
		hooks/            TanStack Query and debounce hooks
		schemas/          Zod validation schemas
		types/            Device TypeScript types
	shared/components/ Shared layout, sidebar, and UI primitives
```

The main mock data file is [src/features/dashboard/data/devices.json](src/features/dashboard/data/devices.json).
