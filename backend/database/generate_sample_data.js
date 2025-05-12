import fs from 'fs';

// Helper function to generate random dates
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to generate random integer
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random decimal
const randomDecimal = (min, max, precision) => {
  const randomNum = Math.random() * (max - min) + min;
  return parseFloat(randomNum.toFixed(precision));
}

// Helper function to select random element from array
const randomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
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
const sports = ['Basketball', 'Baseball', 'Football', 'Soccer', 'Volleyball', 'Tennis', 'Track', 'Swimming', 'Wrestling', 'Golf',
                'Softball', 'Lacrosse', 'Field Hockey', 'Cross Country', 'Hockey', 'Ultimate Frisbee', 'Gymnastics', 'Rugby', 'Water Polo', 'Cheerleading'];

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
    (CASE floor(random() * 4 + 1)
      WHEN 1 THEN 'Fall 2023'
      WHEN 2 THEN 'Winter 2023'
      WHEN 3 THEN 'Spring 2024'
      WHEN 4 THEN 'Summer 2024'
     END) as season
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
let playerTeamSql = `INSERT INTO player_teams (player_id, team_id, jersey_number, position) \nSELECT \n  p.player_id,\n  t.team_id,\n  floor(random() * 99 + 1)::text as jersey_number,\n  CASE floor(random() * 7 + 1)
    WHEN 1 THEN 'Forward'
    WHEN 2 THEN 'Guard'
    WHEN 3 THEN 'Center'
    WHEN 4 THEN 'Midfielder'
    WHEN 5 THEN 'Striker'
    WHEN 6 THEN 'Goalie'
    WHEN 7 THEN 'Defense'
  END as position\nFROM \n  (SELECT player_id FROM players ORDER BY random() LIMIT 3000) p\n  CROSS JOIN (SELECT team_id FROM teams ORDER BY random() LIMIT 1) t\nON CONFLICT DO NOTHING;\n\n`;
sql += playerTeamSql;

// Player Stats
let playerStatsSql = `INSERT INTO player_stats (player_id, sport_id, season)
SELECT 
  p.player_id,
  s.sport_id,
  CASE floor(random() * 4 + 1)
    WHEN 1 THEN 'Fall 2023'
    WHEN 2 THEN 'Winter 2023'
    WHEN 3 THEN 'Spring 2024'
    WHEN 4 THEN 'Summer 2024'
  END as season
FROM (SELECT player_id FROM players ORDER BY random() LIMIT 3000) p
CROSS JOIN (SELECT sport_id FROM sports ORDER BY random() LIMIT 1) s
ON CONFLICT DO NOTHING;\n\n`;
sql += playerStatsSql;

// Generate Sport-Specific Stats
const sportStats = {
  'Basketball': () => `
    INSERT INTO basketball_stats (stat_id, points, rebounds, assists, steals, blocks, three_pointers, field_goal_percentage)
    SELECT stat_id, ${randomInt(0, 40)}, ${randomInt(0, 20)}, ${randomInt(0, 15)}, ${randomInt(0, 10)}, ${randomInt(0, 8)}, ${randomInt(0, 10)}, ${randomDecimal(0, 100, 2)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Basketball') ON CONFLICT DO NOTHING;`,

  'Baseball': () => `
    INSERT INTO baseball_stats (stat_id, at_bats, hits, runs, rbi, stolen_bases, home_runs, batting_average)
    SELECT stat_id, ${randomInt(0, 500)}, ${randomInt(0, 200)}, ${randomInt(0, 100)}, ${randomInt(0, 100)}, ${randomInt(0, 50)}, ${randomInt(0, 40)}, ${randomDecimal(0, 1, 3)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Baseball') ON CONFLICT DO NOTHING;`,

  'Football': () => `
    INSERT INTO football_stats (stat_id, touchdowns, rushing_yards, passing_yards, tackles, sacks, interceptions, field_goals)
    SELECT stat_id, ${randomInt(0, 10)}, ${randomInt(0, 200)}, ${randomInt(0, 400)}, ${randomInt(0, 20)}, ${randomInt(0, 5)}, ${randomInt(0, 3)}, ${randomInt(0, 5)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Football') ON CONFLICT DO NOTHING;`,

  'Soccer': () => `
    INSERT INTO soccer_stats (stat_id, goals, assists, shots_on_goal, saves, yellow_cards, red_cards, clean_sheets)
    SELECT stat_id, ${randomInt(0, 30)}, ${randomInt(0, 20)}, ${randomInt(0, 100)}, ${randomInt(0, 50)}, ${randomInt(0, 10)}, ${randomInt(0, 3)}, ${randomInt(0, 15)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Soccer') ON CONFLICT DO NOTHING;`,

  'Volleyball': () => `
    INSERT INTO volleyball_stats (stat_id, kills, blocks, digs, aces, assists, service_errors, hitting_percentage)
    SELECT stat_id, ${randomInt(0, 30)}, ${randomInt(0, 20)}, ${randomInt(0, 50)}, ${randomInt(0, 10)}, ${randomInt(0, 40)}, ${randomInt(0, 10)}, ${randomDecimal(0, 1, 3)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Volleyball') ON CONFLICT DO NOTHING;`,

  'Tennis': () => `
    INSERT INTO tennis_stats (stat_id, aces, double_faults, first_serve_percentage, break_points_saved, winners, unforced_errors)
    SELECT stat_id, ${randomInt(0, 20)}, ${randomInt(0, 10)}, ${randomDecimal(40, 80, 2)}, ${randomInt(0, 15)}, ${randomInt(0, 50)}, ${randomInt(0, 40)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Tennis') ON CONFLICT DO NOTHING;`,

  'Wrestling': () => `
    INSERT INTO wrestling_stats (stat_id, weight_class, wins, losses, pins, technical_falls, major_decisions)
    SELECT stat_id, concat(${randomInt(106, 285)}, ' lbs'), ${randomInt(0, 40)}, ${randomInt(0, 20)}, ${randomInt(0, 15)}, ${randomInt(0, 10)}, ${randomInt(0, 15)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Wrestling') ON CONFLICT DO NOTHING;`,

  'Golf': () => `
    INSERT INTO golf_stats (stat_id, score, par, fairways_hit, greens_in_regulation, putts, eagles, birdies)
    SELECT stat_id, ${randomInt(65, 85)}, 72, ${randomInt(7, 14)}, ${randomInt(8, 16)}, ${randomInt(25, 35)}, ${randomInt(0, 2)}, ${randomInt(2, 6)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Golf') ON CONFLICT DO NOTHING;`,

  'Swimming': () => `
    INSERT INTO swimming_stats (stat_id, event_name, finish_time, distance, stroke_type, place, personal_best)
    SELECT stat_id, 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'Freestyle'
        WHEN 2 THEN 'Butterfly'
        WHEN 3 THEN 'Backstroke'
        WHEN 4 THEN 'Breaststroke'
      END,
      ${randomDecimal(20, 120, 2)}, 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 50
        WHEN 2 THEN 100
        WHEN 3 THEN 200
        WHEN 4 THEN 400
      END,
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'Freestyle'
        WHEN 2 THEN 'Butterfly'
        WHEN 3 THEN 'Backstroke'
        WHEN 4 THEN 'Breaststroke'
      END,
      ${randomInt(1, 8)}, 
      (random() > 0.8)
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Swimming') ON CONFLICT DO NOTHING;`,

  'Track': () => `
    INSERT INTO track_stats (stat_id, event_name, finish_time, place, personal_best, points_earned)
    SELECT stat_id, 
      CASE floor(random() * 6 + 1)
        WHEN 1 THEN '100m'
        WHEN 2 THEN '200m'
        WHEN 3 THEN '400m'
        WHEN 4 THEN '800m'
        WHEN 5 THEN '1500m'
        WHEN 6 THEN '5000m'
      END,
      ${randomDecimal(10, 1200, 2)}, 
      ${randomInt(1, 8)}, 
      (random() > 0.8), 
      ${randomInt(0, 10)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Track') ON CONFLICT DO NOTHING;`,

  'Cross Country': () => `
    INSERT INTO cross_country_stats (stat_id, distance, finish_time, place, personal_best, course_name)
    SELECT stat_id, 
      CASE floor(random() * 3 + 1)
        WHEN 1 THEN 5000
        WHEN 2 THEN 8000
        WHEN 3 THEN 10000
      END,
      ${randomDecimal(900, 2400, 2)}, 
      ${randomInt(1, 50)}, 
      (random() > 0.8), 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'City Park'
        WHEN 2 THEN 'Forest Trail'
        WHEN 3 THEN 'Highland Course'
        WHEN 4 THEN 'Valley Route'
      END
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Cross Country') ON CONFLICT DO NOTHING;`,

  'Lacrosse': () => `
    INSERT INTO lacrosse_stats (stat_id, goals, assists, ground_balls, saves, face_offs_won, shots_on_goal)
    SELECT stat_id, ${randomInt(0, 50)}, ${randomInt(0, 30)}, ${randomInt(0, 100)}, ${randomInt(0, 200)}, ${randomInt(0, 150)}, ${randomInt(0, 100)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Lacrosse') ON CONFLICT DO NOTHING;`,

  'Field Hockey': () => `
    INSERT INTO field_hockey_stats (stat_id, goals, assists, shots_on_goal, saves, defensive_saves, penalty_corners)
    SELECT stat_id, ${randomInt(0, 30)}, ${randomInt(0, 20)}, ${randomInt(0, 80)}, ${randomInt(0, 100)}, ${randomInt(0, 30)}, ${randomInt(0, 50)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Field Hockey') ON CONFLICT DO NOTHING;`,

  'Hockey': () => `
    INSERT INTO hockey_stats (stat_id, goals, assists, shots_on_goal, saves, penalties_in_minutes, plus_minus)
    SELECT stat_id, ${randomInt(0, 50)}, ${randomInt(0, 60)}, ${randomInt(0, 200)}, ${randomInt(0, 1000)}, ${randomInt(0, 100)}, ${randomInt(-30, 30)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Hockey') ON CONFLICT DO NOTHING;`,

  'Ultimate Frisbee': () => `
    INSERT INTO ultimate_frisbee_stats (stat_id, goals, assists, completions, drops, defensive_plays, turnovers)
    SELECT stat_id, ${randomInt(0, 40)}, ${randomInt(0, 35)}, ${randomInt(0, 200)}, ${randomInt(0, 20)}, ${randomInt(0, 50)}, ${randomInt(0, 30)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Ultimate Frisbee') ON CONFLICT DO NOTHING;`,

  'Gymnastics': () => `
    INSERT INTO gymnastics_stats (stat_id, event_name, difficulty_score, execution_score, final_score, place)
    SELECT stat_id, 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'Floor Exercise'
        WHEN 2 THEN 'Balance Beam'
        WHEN 3 THEN 'Uneven Bars'
        WHEN 4 THEN 'Vault'
      END,
      ${randomDecimal(4.5, 6.5, 2)}, 
      ${randomDecimal(7.0, 9.8, 2)}, 
      ${randomDecimal(12.0, 16.0, 2)}, 
      ${randomInt(1, 8)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Gymnastics') ON CONFLICT DO NOTHING;`,

  'Water Polo': () => `
    INSERT INTO water_polo_stats (stat_id, goals, assists, steals, blocks, saves, turnovers)
    SELECT stat_id, ${randomInt(0, 30)}, ${randomInt(0, 25)}, ${randomInt(0, 40)}, ${randomInt(0, 20)}, ${randomInt(0, 100)}, ${randomInt(0, 30)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Water Polo') ON CONFLICT DO NOTHING;`,

  'Softball': () => `
    INSERT INTO softball_stats (stat_id, at_bats, hits, runs, rbi, stolen_bases, batting_average, fielding_percentage)
    SELECT stat_id, ${randomInt(0, 300)}, ${randomInt(0, 150)}, ${randomInt(0, 80)}, ${randomInt(0, 80)}, ${randomInt(0, 40)}, ${randomDecimal(0, 1, 3)}, ${randomDecimal(0.9, 1, 3)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Softball') ON CONFLICT DO NOTHING;`,

  'Rugby': () => `
    INSERT INTO rugby_stats (stat_id, tries, conversions, penalty_goals, tackles, meters_gained, lineouts_won)
    SELECT stat_id, ${randomInt(0, 20)}, ${randomInt(0, 15)}, ${randomInt(0, 10)}, ${randomInt(0, 50)}, ${randomInt(0, 500)}, ${randomInt(0, 30)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Rugby') ON CONFLICT DO NOTHING;`,

  'Cheerleading': () => `
    INSERT INTO cheerleading_stats (stat_id, routine_difficulty, execution_score, total_score, deductions, place)
    SELECT stat_id, ${randomDecimal(3.0, 5.0, 2)}, ${randomDecimal(7.0, 9.8, 2)}, ${randomDecimal(10.0, 14.0, 2)}, ${randomInt(0, 5)}, ${randomInt(1, 10)}
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Cheerleading') ON CONFLICT DO NOTHING;`
};

// Loop through the sports and generate stats
for (const sport of sports) {
  if (sportStats[sport]) {
    sql += sportStats[sport]() + '\n\n';
  } else {
    console.log(`No stats function defined for ${sport}`);
  }
}

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
    CASE floor(random() * 5 + 1)
      WHEN 1 THEN 'John Doe'
      WHEN 2 THEN 'Jane Smith'
      WHEN 3 THEN 'Mike Johnson'
      WHEN 4 THEN 'Sarah Williams'
      WHEN 5 THEN 'Bob Anderson'
    END as author,
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