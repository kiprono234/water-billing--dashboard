# Water Usage Dashboard

A React-based dashboard for tracking water meter readings, billing, and usage statistics.  
Supports multi-user login, persistent data storage in browser localStorage, and live charts for monthly water consumption.

## Features

- **Multi-User Support**: Users can log in to input meter readings and view their billing records.
- **Data Persistence**: All readings, billings, and usage statistics are saved in browser localStorage and survive page refreshes.
- **Live Charts**: Water usage is visualized with a live-updating graph.
- **Invoice Tracking**: Dashboard shows paid/unpaid invoices, total consumption, and amount billed.
- **User-Friendly UI**: Modern, responsive interface with login/logout and easy data entry.

## Technologies

- React
- Recharts (for charts)
- SCSS (for styling)
- LocalStorage API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Login:** Enter your name in the Meter Reading section to log in.
- **Input Reading:** Select month, enter meter reading, choose payment option, and submit.
- **View Dashboard:** See summary cards, usage chart, invoice status, and billing table.
- **Logout:** Click 'Logout' in the Meter Reading section to switch user.

## Project Structure

```
src/
  components/
    Sidebar.jsx
    DashboardHeader.jsx
    SummaryCards.jsx
    WaterUsageChart.jsx
    InvoiceStatusChart.jsx
    CustomerBillingTable.jsx
    MeterReadingCalculator.jsx
    MeterReadingCalculator.scss
  utils/
    persistence.js
  App.jsx
  App.scss
```

## Customization

- To use a database/backend instead of localStorage, replace the persistence logic in `src/utils/persistence.js`.
- Charts can be styled or configured further via `WaterUsageChart.jsx`.

## License

MIT

## Author

[Your Name or Organization]

---