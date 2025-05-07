<h1 align="center">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=500&height=70&duration=4000&lines=Welcome+👋;+Field+Stats+⚾️;" />
</h1>

Sports Information and Analytics Full Stack React Application. 

# Tech Stack
- React
- TypeScript
- PostgreSQL
- Node
- Express
- Vite

# How To Run (Mac)

- Clone / Fork project

### Backend

- Navigate to the backend folder and install required dependencies using `npm i`
- Copy `.env.example` to a new file  `.env`. Then fill in the values for each variable
- (If you want to generate new sample data): run `node /database/generate_sample_data.js`. Check out `sample_data.sql` to see new changes
- Run `node server.js`

### Frontend

- Navigate to sports_page folder and install required dependencies using `npm i`
- Run `npm run dev`
- If it doesn't automatically open the page in a browser, open the link vite provides through terminal 

# How To Run (Windows)

- Clone / Fork project

### Swap Ports
- Use VSCodes' Search tool(top left widget - magnify glass) to find and replace all instances of `localhost:3001` with `localhost:5001`
- Swap port variable in `server.js` to correct port(5001)


### Backend

- Navigate to the backend folder and install required dependencies using `npm i`
- Copy `.env.example` to a new file  `.env`. Then fill in the values for each variable
- (If you want to generate new sample data): run `node /database/generate_sample_data.js`. Check out `sample_data.sql` to see new changes
- Run `node server.js`

### Frontend

- Navigate to sports_page folder and install required dependencies using `npm i`
- Run `npm run dev`
- If it doesn't automatically open the page in a browser, open the link vite provides through terminal 