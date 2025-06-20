📘 Project Subject
Sankey Chart Visualization Using React and SQLite

This project demonstrates how to create a Sankey chart representing data flow between multiple checkpoints. The frontend is built with React and uses Google Charts to render the Sankey diagram. The backend uses Node.js with Express and SQLite to store and serve the data via a REST API. The app fetches seeded dummy data from the backend and visualizes it as a Sankey chart.

💻 Installation Method
🔁 Prerequisites
Node.js (v14 or later recommended)

npm (comes with Node.js)

Git (for cloning the repo)

🧱 Clone the Project
bash
Copy
Edit
git clone https://github.com/yourusername/sankey-chart-app.git
cd sankey-chart-app
⚙️ Execution Steps
🔹 Backend Setup
bash
Copy
Edit
cd backend
npm install                # Install backend dependencies
node db/seed.js           # Seed the SQLite database with dummy data
node server.js            # Start the backend on http://localhost:5050
🟢 If successful, the API will be accessible at:
http://localhost:5050/api/sankey

🔹 Frontend Setup (in a new terminal)
bash
Copy
Edit
cd frontend
npm install                # Install frontend dependencies
npm start                  # Start the React app on http://localhost:3000
🟢 Open in browser:
http://localhost:3000

You should see the Sankey chart loaded from the backend data.
