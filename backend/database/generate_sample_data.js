import fs from 'fs';

// Helper function to generate random dates
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate SQL file
let sql = `-- Sample Data Generation\n\n`;

// Genders
sql += `INSERT INTO genders (gender) VALUES\n('Male'),\n('Female'),\n('Other')\nON CONFLICT DO NOTHING;\n\n`;

// School Types
sql += `INSERT INTO school_types (school_type) VALUES\n('High School'),\n('Middle School'),\n('Elementary')\nON CONFLICT DO NOTHING;\n\n`;

// Wait for school types to be inserted
sql += `DO $$
BEGIN
    PERFORM FROM school_types;
END $$;\n\n`;

// Sports (20 sports)
const sports = ['Basketball', 'Soccer', 'Swimming', 'Baseball', 'Volleyball', 'Track', 'Tennis', 'Golf', 'Wrestling', 'Football', 
                'Cross Country', 'Hockey', 'Lacrosse', 'Rugby', 'Softball', 'Field Hockey', 'Water Polo', 'Rowing', 'Gymnastics', 'Diving'];

sql += `INSERT INTO sports (sport_name, sport_description, has_gender_divisions) VALUES\n` +
  sports.map(sport => `('${sport}', '${sport} competitive sport', true)`).join(',\n') + '\nON CONFLICT DO NOTHING;\n\n';

// Schools (100 schools)
const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
const cities = ['San Francisco', 'Los Angeles', 'Houston', 'Dallas', 'New York City', 'Miami', 'Chicago'];
let schoolSql = `INSERT INTO schools (school_name, school_type_id, state, city, address, website)
SELECT 
  s.school_name, 
  st.school_type_id,
  s.state,
  s.city,
  s.address,
  s.website
FROM (
  SELECT *
  FROM (VALUES
`;

for (let i = 1; i <= 100; i++) {
  const state = states[Math.floor(Math.random() * states.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  schoolSql += `    ('${city} School ${i}', '${state}', '${city}', '${i} Main St', 'www.school${i}.edu')`;
  schoolSql += i === 100 ? '\n' : ',\n';
}

schoolSql += `  ) AS t(school_name, state, city, address, website)
) s
CROSS JOIN (
  SELECT school_type_id 
  FROM school_types 
  ORDER BY random() 
  LIMIT 1
) st
ON CONFLICT DO NOTHING;\n\n`;

sql += schoolSql;

// Teams (500 teams)
let teamSql = `INSERT INTO teams (team_name, school_id, sport_id, gender_id, season)
SELECT 
  t.team_name,
  s.school_id,
  t.sport_id,
  t.gender_id,
  t.season
FROM (
  SELECT 
    'Team ' || generate_series AS team_name,
    (SELECT sport_id FROM sports ORDER BY random() LIMIT 1) as sport_id,
    (SELECT gender_id FROM genders ORDER BY random() LIMIT 1) as gender_id,
    (array['Fall 2023', 'Winter 2023', 'Spring 2024', 'Summer 2024'])[floor(random() * 4 + 1)] as season
  FROM generate_series(1, 500)
) t
CROSS JOIN (
  SELECT school_id FROM schools ORDER BY random() LIMIT 1
) s
ON CONFLICT DO NOTHING;\n\n`;
sql += teamSql;

// Players (2000 players)
const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Isabella'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

let playerSql = `INSERT INTO players (first_name, last_name, date_of_birth, gender_id)
SELECT 
  p.first_name,
  p.last_name,
  p.dob,
  g.gender_id
FROM (
  SELECT 
    unnest(ARRAY[${firstNames.map(n => `'${n}'`).join(',')}]) as first_name,
    unnest(ARRAY[${lastNames.map(n => `'${n}'`).join(',')}]) as last_name,
    (TIMESTAMP '2010-01-01' - INTERVAL '5 years' * random())::date as dob
  FROM generate_series(1, 2000)
) p
CROSS JOIN (
  SELECT gender_id FROM genders ORDER BY random() LIMIT 1
) g;\n\n`;
sql += playerSql;

// Player Teams (3000 relationships)
let playerTeamSql = `INSERT INTO player_teams (player_id, team_id, jersey_number, position) \nSELECT \n  p.player_id,\n  t.team_id,\n  floor(random() * 99 + 1)::text as jersey_number,\n  (array['Forward', 'Guard', 'Center', 'Midfielder', 'Striker', 'Goalie', 'Defense'])[floor(random() * 7 + 1)] as position\nFROM \n  (SELECT player_id FROM players ORDER BY random() LIMIT 3000) p\n  CROSS JOIN (SELECT team_id FROM teams ORDER BY random() LIMIT 1) t\nON CONFLICT DO NOTHING;\n\n`;
sql += playerTeamSql;

// Generate 1000 news articles
let newsSql = `INSERT INTO news (headline, author, content, sport_id, featured)
SELECT 
  n.headline,
  n.author,
  n.content,
  s.sport_id,
  n.featured
FROM (
  SELECT 
    'Sports News Headline ' || generate_series as headline,
    (array['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Bob Anderson'])[floor(random() * 5 + 1)] as author,
    'Content for article ' || generate_series as content,
    random() > 0.8 as featured
  FROM generate_series(1, 1000)
) n
CROSS JOIN (
  SELECT sport_id FROM sports ORDER BY random() LIMIT 1
) s
ON CONFLICT DO NOTHING;\n\n`;
sql += newsSql;

// Generate 500 events
let eventSql = `INSERT INTO events (event_name, event_date, location, description, sport_id) VALUES\n`;
const locations = ['Main Stadium', 'Sports Complex', 'City Arena', 'Memorial Field', 'University Stadium'];

for (let i = 1; i <= 500; i++) {
  const sportId = Math.floor(Math.random() * 20) + 1;
  const location = locations[Math.floor(Math.random() * locations.length)];
  const eventDate = randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)).toISOString().split('.')[0];
  
  eventSql += `('Tournament ${i}', '${eventDate}', '${location}', 'Description for event ${i}', ${sportId})`;
  eventSql += i === 500 ? '\nON CONFLICT DO NOTHING;\n\n' : ',\n';
}
sql += eventSql;

fs.writeFileSync('database/sample_data.sql', sql);
console.log('Generated sample data SQL file');
