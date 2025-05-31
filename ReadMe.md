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
<img width="561" alt="homePage" src="https://github.com/user-attachments/assets/55a9c88a-d12a-4802-84bd-de7d44e0aad0" />

## Sports Related Pages
<img width="561" alt="Screenshot 2025-05-31 at 1 37 25 PM" src="https://github.com/user-attachments/assets/59050b29-00bb-486a-b1e1-7c0a8173dff5" />
<img width="560" alt="basketball" src="https://github.com/user-attachments/assets/cf51ce80-8c44-44ef-ad45-cc36052cc05b" />


## Player Stats Using Recharts
<img width="560" alt="Screenshot 2025-05-31 at 1 33 44 PM" src="https://github.com/user-attachments/assets/b7f3eb37-77b4-4536-a4d6-f89c7675e72d" />

## Footer
<img width="558" alt="footer" src="https://github.com/user-attachments/assets/d37d513e-41a2-4b07-8afb-2f3179e02974" />


