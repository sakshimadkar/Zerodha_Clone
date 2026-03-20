## Zerodha Clone
A full-stack clone of Zerodha, one of India's leading stock trading platforms. This project demonstrates a real-time stock trading dashboard with user authentication, portfolio management, and interactive stock charts. Built as a learning and demo project for full-stack development and financial tech applications.

## Features
1. User Authentication: Sign Up / Login / Logout with secure password storage.
2. Dashboard: View portfolio summary, track holdings, investments, and balances.
3. Stock Market Simulation: Real-time stock prices (mock or API integration), Buy & Sell functionality.
4. Interactive Charts: Candlestick and line charts for stock trends.
5. Responsive Design: Works on desktop and mobile.

## Tech Stack
-Frontend: ReactJS, BootStrap
-Backend: Node.js, Express.js
-Database: MongoDB 
-Authentication: JWT

## Installation
1. Clone the repository

git clone https://github.com/sakshimadkar/Zerodha_Clone.git
cd Zerodha_Clone

2. Install dependencies

npm install

3. Set environment variables
Create a .env file:
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>

4. Run the application
npm start
