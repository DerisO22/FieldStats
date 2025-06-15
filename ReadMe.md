<h1 align="center">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=500&height=70&duration=4000&lines=Welcome+👋;+Field+Stats+⚾️;+⚽️+🏀+🏈+⚾️+🎾+🏐;" />
</h1>

Sports Information and Analytics Full Stack React Application. 

# Tech Stack
- React
- TypeScript
- PostgreSQL
- Node
- Express
- Vite

# How To Run Locally (Mac)

- Clone / Fork project

### PostgreSQL (Will add an image guide soon)

- Install PostgreSQL
- Set up an account / database in pgAdmin or the CLI (These will be used in a .env file in the backend)

### Backend

- Navigate to the backend folder and install required dependencies using `npm i`
- Copy `.env.example` to a new file  `.env`. Then fill in the values for each variable based on how you set up pgAdmin
- (If you want to generate new sample data): run `node /database/generate_sample_data.js`. Check out `sample_data.sql` to see new changes
- Run `node server.js`
- If you have to run end the server and re-run `node server.js`, make sure to comment out the entire sample_data.sql file to prevent any errors

### Frontend

- Navigate to sports_page folder and install required dependencies using `npm i`
- Run `npm run dev`
- If it doesn't automatically open the page in a browser, open the link vite provides through terminal 

# How To Run Locally (Windows)

- Clone / Fork project

### PostgreSQL (Will add an image guide soon)

- Install PostgreSQL
- Set up an account / database in pgAdmin or the CLI (These will be used in a .env file in the backend)

### Swap Ports
- Use VSCodes' Search tool(top left widget - magnify glass) to find and replace all instances of `localhost:3001` with `localhost:5001`
- Swap port variable in `server.js` to correct port(5001)


### Backend

- Navigate to the backend folder and install required dependencies using `npm i`
- Copy `.env.example` to a new file  `.env`. Then fill in the values for each variable based on how you set up pgAdmin
- (If you want to generate new sample data): run `node /database/generate_sample_data.js`. Check out `sample_data.sql` to see new changes
- Run `node server.js`
- If it doesn't automatically open the page in a browser, open the link vite provides through terminal 

### Frontend

- Navigate to sports_page folder and install required dependencies using `npm i`
- Run `npm run dev`
- If it doesn't automatically open the page in a browser, open the link vite provides through terminal 


### How It Looks
## Home Page
<img width="561" alt="Home Page" src="https://github.com/user-attachments/assets/55a9c88a-d12a-4802-84bd-de7d44e0aad0" />
<img width="561" alt="Home Page Dark Mode" src="https://github.com/user-attachments/assets/77706edf-afdf-4302-8611-b4a4055e834f" />

## Sports Related Pages
<img width="561" alt="Sports Page" src="https://github.com/user-attachments/assets/59050b29-00bb-486a-b1e1-7c0a8173dff5" />
<img width="561" alt="basketball details page" src="https://github.com/user-attachments/assets/cf51ce80-8c44-44ef-ad45-cc36052cc05b" />
<img width="561" alt="basketball details page Dark_Mode" src="https://github.com/user-attachments/assets/cfe21ac5-9ef5-473f-8654-706ed7541da5" />

## Player Stats Using Recharts
<img width="560" alt="Player Stats" src="https://github.com/user-attachments/assets/b7f3eb37-77b4-4536-a4d6-f89c7675e72d" />
<img width="560" alt="Player Stats Dark_Mode" src="https://github.com/user-attachments/assets/db919b12-493c-4b84-8951-5fb0cd4aa77d" />

## Footer
<img width="558" alt="footer" src="https://github.com/user-attachments/assets/d37d513e-41a2-4b07-8afb-2f3179e02974" />

### Dark Mode
<img width="558" alt="Screenshot 2025-06-15 at 5 40 24 PM" src="https://github.com/user-attachments/assets/a37c7d18-1b27-4ee2-a335-0e74c5fa2ed8" />


