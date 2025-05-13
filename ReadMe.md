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
