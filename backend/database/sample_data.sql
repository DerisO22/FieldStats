-- Sample Data Generation

INSERT INTO genders (gender) VALUES
('Male'),
('Female'),
('Other')
ON CONFLICT DO NOTHING;

INSERT INTO school_types (school_type) VALUES
('High School'),
('Middle School'),
('Elementary')
ON CONFLICT DO NOTHING;

DO $$
BEGIN
    PERFORM FROM school_types;
END $$;

INSERT INTO sports (sport_name, sport_description, has_gender_divisions) VALUES
('Basketball', 'Basketball competitive sport', true),
('Baseball', 'Baseball competitive sport', true),
('Football', 'Football competitive sport', true),
('Soccer', 'Soccer competitive sport', true),
('Volleyball', 'Volleyball competitive sport', true),
('Tennis', 'Tennis competitive sport', true),
('Track', 'Track competitive sport', true),
('Swimming', 'Swimming competitive sport', true),
('Wrestling', 'Wrestling competitive sport', true),
('Golf', 'Golf competitive sport', true),
('Softball', 'Softball competitive sport', true),
('Lacrosse', 'Lacrosse competitive sport', true),
('Field Hockey', 'Field Hockey competitive sport', true),
('Cross Country', 'Cross Country competitive sport', true),
('Hockey', 'Hockey competitive sport', true),
('Ultimate Frisbee', 'Ultimate Frisbee competitive sport', true),
('Gymnastics', 'Gymnastics competitive sport', true),
('Rugby', 'Rugby competitive sport', true),
('Water Polo', 'Water Polo competitive sport', true),
('Cheerleading', 'Cheerleading competitive sport', true)
ON CONFLICT DO NOTHING;

INSERT INTO schools (school_name, school_type_id, state, city, address, website)
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
    ('Houston School 1', 'California', 'Houston', '1 Main St', 'www.school1.edu'),
    ('Miami School 2', 'Illinois', 'Miami', '2 Main St', 'www.school2.edu'),
    ('New York City School 3', 'New York', 'New York City', '3 Main St', 'www.school3.edu'),
    ('Miami School 4', 'California', 'Miami', '4 Main St', 'www.school4.edu'),
    ('Dallas School 5', 'Florida', 'Dallas', '5 Main St', 'www.school5.edu'),
    ('Miami School 6', 'Florida', 'Miami', '6 Main St', 'www.school6.edu'),
    ('Dallas School 7', 'Florida', 'Dallas', '7 Main St', 'www.school7.edu'),
    ('Chicago School 8', 'Illinois', 'Chicago', '8 Main St', 'www.school8.edu'),
    ('Dallas School 9', 'Florida', 'Dallas', '9 Main St', 'www.school9.edu'),
    ('Miami School 10', 'Florida', 'Miami', '10 Main St', 'www.school10.edu'),
    ('Dallas School 11', 'Texas', 'Dallas', '11 Main St', 'www.school11.edu'),
    ('New York City School 12', 'New York', 'New York City', '12 Main St', 'www.school12.edu'),
    ('New York City School 13', 'California', 'New York City', '13 Main St', 'www.school13.edu'),
    ('Chicago School 14', 'Texas', 'Chicago', '14 Main St', 'www.school14.edu'),
    ('San Francisco School 15', 'Texas', 'San Francisco', '15 Main St', 'www.school15.edu'),
    ('Houston School 16', 'Texas', 'Houston', '16 Main St', 'www.school16.edu'),
    ('Chicago School 17', 'Florida', 'Chicago', '17 Main St', 'www.school17.edu'),
    ('New York City School 18', 'California', 'New York City', '18 Main St', 'www.school18.edu'),
    ('San Francisco School 19', 'Illinois', 'San Francisco', '19 Main St', 'www.school19.edu'),
    ('San Francisco School 20', 'Texas', 'San Francisco', '20 Main St', 'www.school20.edu'),
    ('San Francisco School 21', 'Texas', 'San Francisco', '21 Main St', 'www.school21.edu'),
    ('Chicago School 22', 'California', 'Chicago', '22 Main St', 'www.school22.edu'),
    ('Los Angeles School 23', 'Illinois', 'Los Angeles', '23 Main St', 'www.school23.edu'),
    ('Miami School 24', 'Illinois', 'Miami', '24 Main St', 'www.school24.edu'),
    ('San Francisco School 25', 'Illinois', 'San Francisco', '25 Main St', 'www.school25.edu'),
    ('Miami School 26', 'Florida', 'Miami', '26 Main St', 'www.school26.edu'),
    ('New York City School 27', 'Illinois', 'New York City', '27 Main St', 'www.school27.edu'),
    ('San Francisco School 28', 'California', 'San Francisco', '28 Main St', 'www.school28.edu'),
    ('San Francisco School 29', 'Florida', 'San Francisco', '29 Main St', 'www.school29.edu'),
    ('Houston School 30', 'Texas', 'Houston', '30 Main St', 'www.school30.edu'),
    ('Los Angeles School 31', 'Florida', 'Los Angeles', '31 Main St', 'www.school31.edu'),
    ('San Francisco School 32', 'California', 'San Francisco', '32 Main St', 'www.school32.edu'),
    ('Miami School 33', 'California', 'Miami', '33 Main St', 'www.school33.edu'),
    ('New York City School 34', 'Illinois', 'New York City', '34 Main St', 'www.school34.edu'),
    ('Chicago School 35', 'California', 'Chicago', '35 Main St', 'www.school35.edu'),
    ('Miami School 36', 'Illinois', 'Miami', '36 Main St', 'www.school36.edu'),
    ('Houston School 37', 'New York', 'Houston', '37 Main St', 'www.school37.edu'),
    ('San Francisco School 38', 'Illinois', 'San Francisco', '38 Main St', 'www.school38.edu'),
    ('Los Angeles School 39', 'California', 'Los Angeles', '39 Main St', 'www.school39.edu'),
    ('Los Angeles School 40', 'Texas', 'Los Angeles', '40 Main St', 'www.school40.edu'),
    ('Dallas School 41', 'Florida', 'Dallas', '41 Main St', 'www.school41.edu'),
    ('Dallas School 42', 'New York', 'Dallas', '42 Main St', 'www.school42.edu'),
    ('San Francisco School 43', 'New York', 'San Francisco', '43 Main St', 'www.school43.edu'),
    ('Los Angeles School 44', 'New York', 'Los Angeles', '44 Main St', 'www.school44.edu'),
    ('Houston School 45', 'New York', 'Houston', '45 Main St', 'www.school45.edu'),
    ('San Francisco School 46', 'California', 'San Francisco', '46 Main St', 'www.school46.edu'),
    ('Miami School 47', 'New York', 'Miami', '47 Main St', 'www.school47.edu'),
    ('San Francisco School 48', 'Florida', 'San Francisco', '48 Main St', 'www.school48.edu'),
    ('Chicago School 49', 'Texas', 'Chicago', '49 Main St', 'www.school49.edu'),
    ('Los Angeles School 50', 'Texas', 'Los Angeles', '50 Main St', 'www.school50.edu'),
    ('Chicago School 51', 'Illinois', 'Chicago', '51 Main St', 'www.school51.edu'),
    ('Houston School 52', 'Texas', 'Houston', '52 Main St', 'www.school52.edu'),
    ('New York City School 53', 'Florida', 'New York City', '53 Main St', 'www.school53.edu'),
    ('San Francisco School 54', 'Florida', 'San Francisco', '54 Main St', 'www.school54.edu'),
    ('Miami School 55', 'Illinois', 'Miami', '55 Main St', 'www.school55.edu'),
    ('Dallas School 56', 'Texas', 'Dallas', '56 Main St', 'www.school56.edu'),
    ('Dallas School 57', 'Texas', 'Dallas', '57 Main St', 'www.school57.edu'),
    ('Miami School 58', 'Texas', 'Miami', '58 Main St', 'www.school58.edu'),
    ('Houston School 59', 'California', 'Houston', '59 Main St', 'www.school59.edu'),
    ('Los Angeles School 60', 'Texas', 'Los Angeles', '60 Main St', 'www.school60.edu'),
    ('New York City School 61', 'California', 'New York City', '61 Main St', 'www.school61.edu'),
    ('New York City School 62', 'Texas', 'New York City', '62 Main St', 'www.school62.edu'),
    ('San Francisco School 63', 'Florida', 'San Francisco', '63 Main St', 'www.school63.edu'),
    ('Miami School 64', 'New York', 'Miami', '64 Main St', 'www.school64.edu'),
    ('Miami School 65', 'New York', 'Miami', '65 Main St', 'www.school65.edu'),
    ('San Francisco School 66', 'Illinois', 'San Francisco', '66 Main St', 'www.school66.edu'),
    ('Houston School 67', 'Texas', 'Houston', '67 Main St', 'www.school67.edu'),
    ('Houston School 68', 'California', 'Houston', '68 Main St', 'www.school68.edu'),
    ('Dallas School 69', 'New York', 'Dallas', '69 Main St', 'www.school69.edu'),
    ('Los Angeles School 70', 'Florida', 'Los Angeles', '70 Main St', 'www.school70.edu'),
    ('New York City School 71', 'Texas', 'New York City', '71 Main St', 'www.school71.edu'),
    ('Dallas School 72', 'Texas', 'Dallas', '72 Main St', 'www.school72.edu'),
    ('New York City School 73', 'Illinois', 'New York City', '73 Main St', 'www.school73.edu'),
    ('Chicago School 74', 'California', 'Chicago', '74 Main St', 'www.school74.edu'),
    ('Houston School 75', 'Texas', 'Houston', '75 Main St', 'www.school75.edu'),
    ('San Francisco School 76', 'Florida', 'San Francisco', '76 Main St', 'www.school76.edu'),
    ('Miami School 77', 'Illinois', 'Miami', '77 Main St', 'www.school77.edu'),
    ('Houston School 78', 'Texas', 'Houston', '78 Main St', 'www.school78.edu'),
    ('San Francisco School 79', 'Texas', 'San Francisco', '79 Main St', 'www.school79.edu'),
    ('San Francisco School 80', 'Texas', 'San Francisco', '80 Main St', 'www.school80.edu'),
    ('New York City School 81', 'Florida', 'New York City', '81 Main St', 'www.school81.edu'),
    ('Dallas School 82', 'Florida', 'Dallas', '82 Main St', 'www.school82.edu'),
    ('Los Angeles School 83', 'Florida', 'Los Angeles', '83 Main St', 'www.school83.edu'),
    ('New York City School 84', 'New York', 'New York City', '84 Main St', 'www.school84.edu'),
    ('Chicago School 85', 'Illinois', 'Chicago', '85 Main St', 'www.school85.edu'),
    ('Los Angeles School 86', 'Illinois', 'Los Angeles', '86 Main St', 'www.school86.edu'),
    ('Miami School 87', 'California', 'Miami', '87 Main St', 'www.school87.edu'),
    ('Miami School 88', 'Illinois', 'Miami', '88 Main St', 'www.school88.edu'),
    ('Chicago School 89', 'Florida', 'Chicago', '89 Main St', 'www.school89.edu'),
    ('Los Angeles School 90', 'New York', 'Los Angeles', '90 Main St', 'www.school90.edu'),
    ('Dallas School 91', 'New York', 'Dallas', '91 Main St', 'www.school91.edu'),
    ('Los Angeles School 92', 'New York', 'Los Angeles', '92 Main St', 'www.school92.edu'),
    ('Dallas School 93', 'California', 'Dallas', '93 Main St', 'www.school93.edu'),
    ('Houston School 94', 'New York', 'Houston', '94 Main St', 'www.school94.edu'),
    ('Chicago School 95', 'Illinois', 'Chicago', '95 Main St', 'www.school95.edu'),
    ('Miami School 96', 'Illinois', 'Miami', '96 Main St', 'www.school96.edu'),
    ('Houston School 97', 'New York', 'Houston', '97 Main St', 'www.school97.edu'),
    ('Los Angeles School 98', 'New York', 'Los Angeles', '98 Main St', 'www.school98.edu'),
    ('Houston School 99', 'California', 'Houston', '99 Main St', 'www.school99.edu'),
    ('Dallas School 100', 'Illinois', 'Dallas', '100 Main St', 'www.school100.edu')
  ) AS t(school_name, state, city, address, website)
) s
CROSS JOIN (
  SELECT school_type_id 
  FROM school_types 
  ORDER BY random() 
  LIMIT 1
) st
ON CONFLICT DO NOTHING;

INSERT INTO teams (team_name, school_id, sport_id, gender_id, season)
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
ON CONFLICT DO NOTHING;

INSERT INTO players (first_name, last_name, date_of_birth, gender_id)
SELECT 
  p.first_name,
  p.last_name,
  p.dob,
  g.gender_id
FROM (
  SELECT 
    unnest(ARRAY['John','Emma','Michael','Sophia','William','Olivia','James','Ava','Alexander','Isabella']) as first_name,
    unnest(ARRAY['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez']) as last_name,
    (TIMESTAMP '2010-01-01' - INTERVAL '5 years' * random())::date as dob
  FROM generate_series(1, 2000)
) p
CROSS JOIN (
  SELECT gender_id FROM genders ORDER BY random() LIMIT 1
) g;

INSERT INTO player_teams (player_id, team_id, jersey_number, position) 
SELECT 
  p.player_id,
  t.team_id,
  floor(random() * 99 + 1)::text as jersey_number,
  CASE floor(random() * 7 + 1)
    WHEN 1 THEN 'Forward'
    WHEN 2 THEN 'Guard'
    WHEN 3 THEN 'Center'
    WHEN 4 THEN 'Midfielder'
    WHEN 5 THEN 'Striker'
    WHEN 6 THEN 'Goalie'
    WHEN 7 THEN 'Defense'
  END as position
FROM 
  (SELECT player_id FROM players ORDER BY random() LIMIT 3000) p
  CROSS JOIN (SELECT team_id FROM teams ORDER BY random() LIMIT 1) t
ON CONFLICT DO NOTHING;

INSERT INTO player_stats (player_id, sport_id, season)
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
ON CONFLICT DO NOTHING;


    INSERT INTO basketball_stats (stat_id, points, rebounds, assists, steals, blocks, three_pointers, field_goal_percentage)
    SELECT stat_id, 17, 13, 4, 8, 2, 9, 84.86
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Basketball') ON CONFLICT DO NOTHING;


    INSERT INTO baseball_stats (stat_id, at_bats, hits, runs, rbi, stolen_bases, home_runs, batting_average)
    SELECT stat_id, 225, 146, 81, 35, 1, 23, 0.348
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Baseball') ON CONFLICT DO NOTHING;


    INSERT INTO football_stats (stat_id, touchdowns, rushing_yards, passing_yards, tackles, sacks, interceptions, field_goals)
    SELECT stat_id, 3, 72, 376, 14, 5, 0, 5
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Football') ON CONFLICT DO NOTHING;


    INSERT INTO soccer_stats (stat_id, goals, assists, shots_on_goal, saves, yellow_cards, red_cards, clean_sheets)
    SELECT stat_id, 21, 10, 1, 3, 9, 1, 6
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Soccer') ON CONFLICT DO NOTHING;


    INSERT INTO volleyball_stats (stat_id, kills, blocks, digs, aces, assists, service_errors, hitting_percentage)
    SELECT stat_id, 16, 1, 26, 4, 12, 8, 0.499
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Volleyball') ON CONFLICT DO NOTHING;


    INSERT INTO tennis_stats (stat_id, aces, double_faults, first_serve_percentage, break_points_saved, winners, unforced_errors)
    SELECT stat_id, 7, 2, 42.24, 10, 24, 12
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Tennis') ON CONFLICT DO NOTHING;


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
      866.12, 
      8, 
      (random() > 0.8), 
      6
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Track') ON CONFLICT DO NOTHING;


    INSERT INTO swimming_stats (stat_id, event_name, finish_time, distance, stroke_type, place, personal_best)
    SELECT stat_id, 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'Freestyle'
        WHEN 2 THEN 'Butterfly'
        WHEN 3 THEN 'Backstroke'
        WHEN 4 THEN 'Breaststroke'
      END,
      44.31, 
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
      6, 
      (random() > 0.8)
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Swimming') ON CONFLICT DO NOTHING;


    INSERT INTO wrestling_stats (stat_id, weight_class, wins, losses, pins, technical_falls, major_decisions)
    SELECT stat_id, concat(236, ' lbs'), 26, 11, 1, 4, 5
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Wrestling') ON CONFLICT DO NOTHING;


    INSERT INTO golf_stats (stat_id, score, par, fairways_hit, greens_in_regulation, putts, eagles, birdies)
    SELECT stat_id, 77, 72, 12, 16, 30, 0, 6
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Golf') ON CONFLICT DO NOTHING;


    INSERT INTO softball_stats (stat_id, at_bats, hits, runs, rbi, stolen_bases, batting_average, fielding_percentage)
    SELECT stat_id, 147, 124, 10, 53, 2, 0.637, 0.982
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Softball') ON CONFLICT DO NOTHING;


    INSERT INTO lacrosse_stats (stat_id, goals, assists, ground_balls, saves, face_offs_won, shots_on_goal)
    SELECT stat_id, 26, 6, 4, 114, 112, 73
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Lacrosse') ON CONFLICT DO NOTHING;


    INSERT INTO field_hockey_stats (stat_id, goals, assists, shots_on_goal, saves, defensive_saves, penalty_corners)
    SELECT stat_id, 30, 5, 70, 45, 25, 12
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Field Hockey') ON CONFLICT DO NOTHING;


    INSERT INTO cross_country_stats (stat_id, distance, finish_time, place, personal_best, course_name)
    SELECT stat_id, 
      CASE floor(random() * 3 + 1)
        WHEN 1 THEN 5000
        WHEN 2 THEN 8000
        WHEN 3 THEN 10000
      END,
      2282.17, 
      17, 
      (random() > 0.8), 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'City Park'
        WHEN 2 THEN 'Forest Trail'
        WHEN 3 THEN 'Highland Course'
        WHEN 4 THEN 'Valley Route'
      END
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Cross Country') ON CONFLICT DO NOTHING;


    INSERT INTO hockey_stats (stat_id, goals, assists, shots_on_goal, saves, penalties_in_minutes, plus_minus)
    SELECT stat_id, 33, 6, 9, 121, 24, -27
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Hockey') ON CONFLICT DO NOTHING;


    INSERT INTO ultimate_frisbee_stats (stat_id, goals, assists, completions, drops, defensive_plays, turnovers)
    SELECT stat_id, 10, 24, 194, 12, 0, 12
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Ultimate Frisbee') ON CONFLICT DO NOTHING;


    INSERT INTO gymnastics_stats (stat_id, event_name, difficulty_score, execution_score, final_score, place)
    SELECT stat_id, 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'Floor Exercise'
        WHEN 2 THEN 'Balance Beam'
        WHEN 3 THEN 'Uneven Bars'
        WHEN 4 THEN 'Vault'
      END,
      5.93, 
      7.01, 
      15.46, 
      5
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Gymnastics') ON CONFLICT DO NOTHING;


    INSERT INTO rugby_stats (stat_id, tries, conversions, penalty_goals, tackles, meters_gained, lineouts_won)
    SELECT stat_id, 17, 1, 0, 45, 216, 20
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Rugby') ON CONFLICT DO NOTHING;


    INSERT INTO water_polo_stats (stat_id, goals, assists, steals, blocks, saves, turnovers)
    SELECT stat_id, 28, 0, 29, 8, 22, 20
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Water Polo') ON CONFLICT DO NOTHING;


    INSERT INTO cheerleading_stats (stat_id, routine_difficulty, execution_score, total_score, deductions, place)
    SELECT stat_id, 3.49, 7.92, 10.77, 3, 9
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Cheerleading') ON CONFLICT DO NOTHING;

INSERT INTO news (headline, author, content, sport_id, featured)
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
ON CONFLICT DO NOTHING;

DO $$
BEGIN
    PERFORM FROM sports;
END $$;

INSERT INTO events (event_name, event_date, location, description, sport_id)
SELECT 
  e.event_name,
  e.event_date,
  e.location,
  e.description,
  s.sport_id
FROM (
  VALUES
    ('Tournament 1', TIMESTAMP '2023-05-15T04:14:04', 'University Stadium', 'Description for event 1'),
    ('Tournament 2', TIMESTAMP '2023-11-11T12:41:46', 'Sports Complex', 'Description for event 2'),
    ('Tournament 3', TIMESTAMP '2024-08-15T14:18:11', 'Main Stadium', 'Description for event 3'),
    ('Tournament 4', TIMESTAMP '2023-12-19T04:25:16', 'City Arena', 'Description for event 4'),
    ('Tournament 5', TIMESTAMP '2024-03-01T18:12:40', 'Memorial Field', 'Description for event 5'),
    ('Tournament 6', TIMESTAMP '2024-06-05T13:51:21', 'City Arena', 'Description for event 6'),
    ('Tournament 7', TIMESTAMP '2024-05-16T18:20:50', 'University Stadium', 'Description for event 7'),
    ('Tournament 8', TIMESTAMP '2024-08-18T19:43:40', 'Memorial Field', 'Description for event 8'),
    ('Tournament 9', TIMESTAMP '2024-03-27T21:46:43', 'University Stadium', 'Description for event 9'),
    ('Tournament 10', TIMESTAMP '2024-01-08T18:23:00', 'University Stadium', 'Description for event 10'),
    ('Tournament 11', TIMESTAMP '2023-12-16T09:01:33', 'Sports Complex', 'Description for event 11'),
    ('Tournament 12', TIMESTAMP '2023-05-01T05:28:00', 'City Arena', 'Description for event 12'),
    ('Tournament 13', TIMESTAMP '2024-03-17T12:23:37', 'Main Stadium', 'Description for event 13'),
    ('Tournament 14', TIMESTAMP '2023-12-08T00:04:58', 'Main Stadium', 'Description for event 14'),
    ('Tournament 15', TIMESTAMP '2024-09-29T12:43:14', 'Sports Complex', 'Description for event 15'),
    ('Tournament 16', TIMESTAMP '2024-06-01T03:44:08', 'University Stadium', 'Description for event 16'),
    ('Tournament 17', TIMESTAMP '2024-08-21T18:26:40', 'City Arena', 'Description for event 17'),
    ('Tournament 18', TIMESTAMP '2023-07-07T19:00:58', 'Main Stadium', 'Description for event 18'),
    ('Tournament 19', TIMESTAMP '2023-04-02T18:40:05', 'University Stadium', 'Description for event 19'),
    ('Tournament 20', TIMESTAMP '2023-12-10T07:20:23', 'Sports Complex', 'Description for event 20'),
    ('Tournament 21', TIMESTAMP '2024-06-26T02:54:15', 'Main Stadium', 'Description for event 21'),
    ('Tournament 22', TIMESTAMP '2023-12-06T12:21:30', 'Main Stadium', 'Description for event 22'),
    ('Tournament 23', TIMESTAMP '2023-10-09T15:12:06', 'Main Stadium', 'Description for event 23'),
    ('Tournament 24', TIMESTAMP '2023-07-31T17:33:34', 'Main Stadium', 'Description for event 24'),
    ('Tournament 25', TIMESTAMP '2023-08-02T20:49:56', 'City Arena', 'Description for event 25'),
    ('Tournament 26', TIMESTAMP '2024-10-21T10:56:02', 'Sports Complex', 'Description for event 26'),
    ('Tournament 27', TIMESTAMP '2024-06-22T09:43:49', 'Sports Complex', 'Description for event 27'),
    ('Tournament 28', TIMESTAMP '2023-05-18T07:00:53', 'Memorial Field', 'Description for event 28'),
    ('Tournament 29', TIMESTAMP '2023-08-01T09:43:27', 'Memorial Field', 'Description for event 29'),
    ('Tournament 30', TIMESTAMP '2024-08-09T05:52:23', 'City Arena', 'Description for event 30'),
    ('Tournament 31', TIMESTAMP '2024-12-25T17:07:26', 'Sports Complex', 'Description for event 31'),
    ('Tournament 32', TIMESTAMP '2024-08-06T12:55:08', 'University Stadium', 'Description for event 32'),
    ('Tournament 33', TIMESTAMP '2023-01-07T09:52:00', 'City Arena', 'Description for event 33'),
    ('Tournament 34', TIMESTAMP '2024-11-30T06:32:05', 'Memorial Field', 'Description for event 34'),
    ('Tournament 35', TIMESTAMP '2023-12-24T02:42:41', 'University Stadium', 'Description for event 35'),
    ('Tournament 36', TIMESTAMP '2023-02-01T23:08:47', 'Sports Complex', 'Description for event 36'),
    ('Tournament 37', TIMESTAMP '2023-02-05T06:40:05', 'University Stadium', 'Description for event 37'),
    ('Tournament 38', TIMESTAMP '2023-11-21T00:12:31', 'City Arena', 'Description for event 38'),
    ('Tournament 39', TIMESTAMP '2023-07-21T13:48:13', 'City Arena', 'Description for event 39'),
    ('Tournament 40', TIMESTAMP '2024-04-24T11:48:52', 'City Arena', 'Description for event 40'),
    ('Tournament 41', TIMESTAMP '2023-06-15T11:24:39', 'Sports Complex', 'Description for event 41'),
    ('Tournament 42', TIMESTAMP '2024-03-08T03:14:22', 'University Stadium', 'Description for event 42'),
    ('Tournament 43', TIMESTAMP '2024-12-27T21:55:58', 'University Stadium', 'Description for event 43'),
    ('Tournament 44', TIMESTAMP '2024-04-14T16:15:32', 'City Arena', 'Description for event 44'),
    ('Tournament 45', TIMESTAMP '2023-06-13T21:39:46', 'Memorial Field', 'Description for event 45'),
    ('Tournament 46', TIMESTAMP '2023-03-02T16:28:40', 'City Arena', 'Description for event 46'),
    ('Tournament 47', TIMESTAMP '2023-10-05T22:21:04', 'Main Stadium', 'Description for event 47'),
    ('Tournament 48', TIMESTAMP '2024-06-24T17:16:11', 'Memorial Field', 'Description for event 48'),
    ('Tournament 49', TIMESTAMP '2023-09-22T20:27:08', 'Main Stadium', 'Description for event 49'),
    ('Tournament 50', TIMESTAMP '2024-09-05T06:27:38', 'City Arena', 'Description for event 50'),
    ('Tournament 51', TIMESTAMP '2023-11-03T05:41:33', 'University Stadium', 'Description for event 51'),
    ('Tournament 52', TIMESTAMP '2023-09-15T11:59:16', 'Sports Complex', 'Description for event 52'),
    ('Tournament 53', TIMESTAMP '2023-08-06T07:51:35', 'Sports Complex', 'Description for event 53'),
    ('Tournament 54', TIMESTAMP '2024-02-16T07:43:55', 'City Arena', 'Description for event 54'),
    ('Tournament 55', TIMESTAMP '2024-03-12T18:41:17', 'Sports Complex', 'Description for event 55'),
    ('Tournament 56', TIMESTAMP '2023-10-20T09:02:41', 'Main Stadium', 'Description for event 56'),
    ('Tournament 57', TIMESTAMP '2023-04-19T22:13:31', 'Memorial Field', 'Description for event 57'),
    ('Tournament 58', TIMESTAMP '2024-04-20T13:50:13', 'City Arena', 'Description for event 58'),
    ('Tournament 59', TIMESTAMP '2023-12-16T23:17:25', 'Sports Complex', 'Description for event 59'),
    ('Tournament 60', TIMESTAMP '2023-12-28T08:13:50', 'University Stadium', 'Description for event 60'),
    ('Tournament 61', TIMESTAMP '2023-12-21T01:14:22', 'University Stadium', 'Description for event 61'),
    ('Tournament 62', TIMESTAMP '2024-10-06T12:00:18', 'Memorial Field', 'Description for event 62'),
    ('Tournament 63', TIMESTAMP '2024-11-01T12:18:48', 'Main Stadium', 'Description for event 63'),
    ('Tournament 64', TIMESTAMP '2023-10-01T20:52:45', 'Main Stadium', 'Description for event 64'),
    ('Tournament 65', TIMESTAMP '2024-10-17T20:45:24', 'Memorial Field', 'Description for event 65'),
    ('Tournament 66', TIMESTAMP '2023-05-07T20:19:33', 'Main Stadium', 'Description for event 66'),
    ('Tournament 67', TIMESTAMP '2024-12-23T00:25:43', 'Memorial Field', 'Description for event 67'),
    ('Tournament 68', TIMESTAMP '2023-03-20T07:57:41', 'Main Stadium', 'Description for event 68'),
    ('Tournament 69', TIMESTAMP '2023-01-21T13:32:29', 'Sports Complex', 'Description for event 69'),
    ('Tournament 70', TIMESTAMP '2023-09-06T09:02:18', 'Sports Complex', 'Description for event 70'),
    ('Tournament 71', TIMESTAMP '2023-08-24T00:13:40', 'City Arena', 'Description for event 71'),
    ('Tournament 72', TIMESTAMP '2023-03-24T20:58:46', 'Sports Complex', 'Description for event 72'),
    ('Tournament 73', TIMESTAMP '2023-09-13T19:51:53', 'Memorial Field', 'Description for event 73'),
    ('Tournament 74', TIMESTAMP '2023-04-29T07:17:39', 'Main Stadium', 'Description for event 74'),
    ('Tournament 75', TIMESTAMP '2023-08-19T22:26:02', 'Main Stadium', 'Description for event 75'),
    ('Tournament 76', TIMESTAMP '2024-07-27T10:55:43', 'University Stadium', 'Description for event 76'),
    ('Tournament 77', TIMESTAMP '2023-05-31T00:58:51', 'Memorial Field', 'Description for event 77'),
    ('Tournament 78', TIMESTAMP '2023-06-19T03:29:12', 'Memorial Field', 'Description for event 78'),
    ('Tournament 79', TIMESTAMP '2024-07-13T12:52:17', 'Memorial Field', 'Description for event 79'),
    ('Tournament 80', TIMESTAMP '2024-08-29T15:32:13', 'University Stadium', 'Description for event 80'),
    ('Tournament 81', TIMESTAMP '2023-10-11T00:36:57', 'Sports Complex', 'Description for event 81'),
    ('Tournament 82', TIMESTAMP '2023-12-04T00:53:33', 'City Arena', 'Description for event 82'),
    ('Tournament 83', TIMESTAMP '2024-12-08T07:29:20', 'Memorial Field', 'Description for event 83'),
    ('Tournament 84', TIMESTAMP '2024-08-12T09:15:01', 'City Arena', 'Description for event 84'),
    ('Tournament 85', TIMESTAMP '2024-08-08T01:30:59', 'University Stadium', 'Description for event 85'),
    ('Tournament 86', TIMESTAMP '2024-02-01T06:19:06', 'Memorial Field', 'Description for event 86'),
    ('Tournament 87', TIMESTAMP '2024-07-18T10:20:32', 'Sports Complex', 'Description for event 87'),
    ('Tournament 88', TIMESTAMP '2023-05-21T00:02:50', 'Sports Complex', 'Description for event 88'),
    ('Tournament 89', TIMESTAMP '2023-06-24T20:00:34', 'Main Stadium', 'Description for event 89'),
    ('Tournament 90', TIMESTAMP '2023-11-20T03:37:25', 'City Arena', 'Description for event 90'),
    ('Tournament 91', TIMESTAMP '2024-12-15T05:00:13', 'Sports Complex', 'Description for event 91'),
    ('Tournament 92', TIMESTAMP '2023-05-23T03:42:30', 'University Stadium', 'Description for event 92'),
    ('Tournament 93', TIMESTAMP '2023-08-30T19:04:38', 'City Arena', 'Description for event 93'),
    ('Tournament 94', TIMESTAMP '2024-05-29T14:24:05', 'Main Stadium', 'Description for event 94'),
    ('Tournament 95', TIMESTAMP '2023-09-18T16:08:08', 'Memorial Field', 'Description for event 95'),
    ('Tournament 96', TIMESTAMP '2024-03-27T19:22:19', 'City Arena', 'Description for event 96'),
    ('Tournament 97', TIMESTAMP '2023-11-27T04:05:07', 'Sports Complex', 'Description for event 97'),
    ('Tournament 98', TIMESTAMP '2024-08-18T22:44:25', 'Memorial Field', 'Description for event 98'),
    ('Tournament 99', TIMESTAMP '2024-12-16T01:19:34', 'City Arena', 'Description for event 99'),
    ('Tournament 100', TIMESTAMP '2024-07-19T12:32:02', 'Main Stadium', 'Description for event 100'),
    ('Tournament 101', TIMESTAMP '2024-01-04T05:40:07', 'Main Stadium', 'Description for event 101'),
    ('Tournament 102', TIMESTAMP '2023-03-30T07:00:06', 'Sports Complex', 'Description for event 102'),
    ('Tournament 103', TIMESTAMP '2023-01-08T14:08:03', 'Sports Complex', 'Description for event 103'),
    ('Tournament 104', TIMESTAMP '2024-06-15T02:58:16', 'Memorial Field', 'Description for event 104'),
    ('Tournament 105', TIMESTAMP '2024-09-27T13:18:06', 'Memorial Field', 'Description for event 105'),
    ('Tournament 106', TIMESTAMP '2023-07-08T23:34:02', 'Sports Complex', 'Description for event 106'),
    ('Tournament 107', TIMESTAMP '2023-02-09T05:07:10', 'City Arena', 'Description for event 107'),
    ('Tournament 108', TIMESTAMP '2023-11-09T16:33:35', 'City Arena', 'Description for event 108'),
    ('Tournament 109', TIMESTAMP '2023-07-24T04:40:01', 'Sports Complex', 'Description for event 109'),
    ('Tournament 110', TIMESTAMP '2023-08-07T12:05:29', 'Memorial Field', 'Description for event 110'),
    ('Tournament 111', TIMESTAMP '2023-12-17T12:37:42', 'University Stadium', 'Description for event 111'),
    ('Tournament 112', TIMESTAMP '2023-10-21T21:53:12', 'Memorial Field', 'Description for event 112'),
    ('Tournament 113', TIMESTAMP '2023-04-18T14:14:16', 'Main Stadium', 'Description for event 113'),
    ('Tournament 114', TIMESTAMP '2024-03-13T15:13:32', 'Main Stadium', 'Description for event 114'),
    ('Tournament 115', TIMESTAMP '2024-08-03T01:10:14', 'Memorial Field', 'Description for event 115'),
    ('Tournament 116', TIMESTAMP '2024-07-05T07:46:47', 'Sports Complex', 'Description for event 116'),
    ('Tournament 117', TIMESTAMP '2024-01-16T18:19:37', 'University Stadium', 'Description for event 117'),
    ('Tournament 118', TIMESTAMP '2024-08-25T13:36:52', 'Main Stadium', 'Description for event 118'),
    ('Tournament 119', TIMESTAMP '2023-04-21T13:12:35', 'Sports Complex', 'Description for event 119'),
    ('Tournament 120', TIMESTAMP '2024-09-20T17:54:55', 'University Stadium', 'Description for event 120'),
    ('Tournament 121', TIMESTAMP '2024-08-29T16:25:35', 'University Stadium', 'Description for event 121'),
    ('Tournament 122', TIMESTAMP '2023-08-10T02:42:33', 'City Arena', 'Description for event 122'),
    ('Tournament 123', TIMESTAMP '2023-07-12T09:58:23', 'University Stadium', 'Description for event 123'),
    ('Tournament 124', TIMESTAMP '2024-07-07T10:15:19', 'City Arena', 'Description for event 124'),
    ('Tournament 125', TIMESTAMP '2024-04-29T10:57:15', 'City Arena', 'Description for event 125'),
    ('Tournament 126', TIMESTAMP '2023-06-13T01:45:24', 'City Arena', 'Description for event 126'),
    ('Tournament 127', TIMESTAMP '2023-07-28T21:22:21', 'Memorial Field', 'Description for event 127'),
    ('Tournament 128', TIMESTAMP '2023-10-28T21:36:42', 'Memorial Field', 'Description for event 128'),
    ('Tournament 129', TIMESTAMP '2024-05-18T01:38:14', 'Sports Complex', 'Description for event 129'),
    ('Tournament 130', TIMESTAMP '2023-03-04T03:33:32', 'City Arena', 'Description for event 130'),
    ('Tournament 131', TIMESTAMP '2023-11-01T08:25:31', 'Sports Complex', 'Description for event 131'),
    ('Tournament 132', TIMESTAMP '2024-06-14T23:13:38', 'Sports Complex', 'Description for event 132'),
    ('Tournament 133', TIMESTAMP '2023-10-09T12:51:04', 'University Stadium', 'Description for event 133'),
    ('Tournament 134', TIMESTAMP '2024-02-04T07:36:00', 'Memorial Field', 'Description for event 134'),
    ('Tournament 135', TIMESTAMP '2024-12-24T18:03:21', 'University Stadium', 'Description for event 135'),
    ('Tournament 136', TIMESTAMP '2024-01-02T15:30:46', 'Memorial Field', 'Description for event 136'),
    ('Tournament 137', TIMESTAMP '2024-02-02T00:15:55', 'University Stadium', 'Description for event 137'),
    ('Tournament 138', TIMESTAMP '2023-11-08T21:40:45', 'Main Stadium', 'Description for event 138'),
    ('Tournament 139', TIMESTAMP '2023-06-19T17:31:20', 'Memorial Field', 'Description for event 139'),
    ('Tournament 140', TIMESTAMP '2023-09-07T08:10:21', 'University Stadium', 'Description for event 140'),
    ('Tournament 141', TIMESTAMP '2024-07-18T15:46:46', 'Main Stadium', 'Description for event 141'),
    ('Tournament 142', TIMESTAMP '2024-02-22T03:40:52', 'Main Stadium', 'Description for event 142'),
    ('Tournament 143', TIMESTAMP '2023-10-29T20:06:55', 'Sports Complex', 'Description for event 143'),
    ('Tournament 144', TIMESTAMP '2024-07-25T21:44:35', 'City Arena', 'Description for event 144'),
    ('Tournament 145', TIMESTAMP '2023-09-23T12:16:26', 'University Stadium', 'Description for event 145'),
    ('Tournament 146', TIMESTAMP '2023-12-05T19:40:52', 'University Stadium', 'Description for event 146'),
    ('Tournament 147', TIMESTAMP '2024-07-23T10:54:21', 'Memorial Field', 'Description for event 147'),
    ('Tournament 148', TIMESTAMP '2023-05-11T22:40:44', 'City Arena', 'Description for event 148'),
    ('Tournament 149', TIMESTAMP '2024-12-20T15:24:12', 'Sports Complex', 'Description for event 149'),
    ('Tournament 150', TIMESTAMP '2024-12-07T22:59:52', 'Memorial Field', 'Description for event 150'),
    ('Tournament 151', TIMESTAMP '2024-06-24T03:22:19', 'Main Stadium', 'Description for event 151'),
    ('Tournament 152', TIMESTAMP '2023-12-24T19:40:20', 'University Stadium', 'Description for event 152'),
    ('Tournament 153', TIMESTAMP '2023-01-26T11:20:25', 'City Arena', 'Description for event 153'),
    ('Tournament 154', TIMESTAMP '2023-07-06T10:25:43', 'University Stadium', 'Description for event 154'),
    ('Tournament 155', TIMESTAMP '2024-02-29T01:51:17', 'Memorial Field', 'Description for event 155'),
    ('Tournament 156', TIMESTAMP '2024-02-02T06:43:10', 'Main Stadium', 'Description for event 156'),
    ('Tournament 157', TIMESTAMP '2024-01-01T10:19:36', 'City Arena', 'Description for event 157'),
    ('Tournament 158', TIMESTAMP '2024-10-25T02:19:13', 'Memorial Field', 'Description for event 158'),
    ('Tournament 159', TIMESTAMP '2024-11-29T07:58:14', 'City Arena', 'Description for event 159'),
    ('Tournament 160', TIMESTAMP '2024-06-26T14:06:02', 'Memorial Field', 'Description for event 160'),
    ('Tournament 161', TIMESTAMP '2024-04-06T05:48:43', 'Sports Complex', 'Description for event 161'),
    ('Tournament 162', TIMESTAMP '2024-12-14T03:31:24', 'Memorial Field', 'Description for event 162'),
    ('Tournament 163', TIMESTAMP '2024-08-04T12:53:49', 'University Stadium', 'Description for event 163'),
    ('Tournament 164', TIMESTAMP '2023-11-30T05:23:12', 'University Stadium', 'Description for event 164'),
    ('Tournament 165', TIMESTAMP '2024-01-16T02:59:35', 'Main Stadium', 'Description for event 165'),
    ('Tournament 166', TIMESTAMP '2023-08-19T23:57:20', 'University Stadium', 'Description for event 166'),
    ('Tournament 167', TIMESTAMP '2023-01-27T16:17:42', 'Main Stadium', 'Description for event 167'),
    ('Tournament 168', TIMESTAMP '2023-02-03T19:28:05', 'City Arena', 'Description for event 168'),
    ('Tournament 169', TIMESTAMP '2023-02-20T00:39:26', 'University Stadium', 'Description for event 169'),
    ('Tournament 170', TIMESTAMP '2024-09-09T06:34:01', 'City Arena', 'Description for event 170'),
    ('Tournament 171', TIMESTAMP '2024-10-03T05:08:05', 'University Stadium', 'Description for event 171'),
    ('Tournament 172', TIMESTAMP '2024-09-01T15:53:13', 'Main Stadium', 'Description for event 172'),
    ('Tournament 173', TIMESTAMP '2023-10-19T12:14:42', 'Sports Complex', 'Description for event 173'),
    ('Tournament 174', TIMESTAMP '2023-11-21T10:09:04', 'City Arena', 'Description for event 174'),
    ('Tournament 175', TIMESTAMP '2024-01-23T03:34:22', 'University Stadium', 'Description for event 175'),
    ('Tournament 176', TIMESTAMP '2024-09-05T00:59:37', 'Main Stadium', 'Description for event 176'),
    ('Tournament 177', TIMESTAMP '2024-02-03T23:52:16', 'Memorial Field', 'Description for event 177'),
    ('Tournament 178', TIMESTAMP '2023-09-26T15:33:43', 'Sports Complex', 'Description for event 178'),
    ('Tournament 179', TIMESTAMP '2024-03-04T07:18:25', 'Main Stadium', 'Description for event 179'),
    ('Tournament 180', TIMESTAMP '2024-02-11T11:20:02', 'Memorial Field', 'Description for event 180'),
    ('Tournament 181', TIMESTAMP '2024-08-27T18:56:29', 'University Stadium', 'Description for event 181'),
    ('Tournament 182', TIMESTAMP '2024-11-09T20:57:31', 'Sports Complex', 'Description for event 182'),
    ('Tournament 183', TIMESTAMP '2024-09-28T02:47:00', 'University Stadium', 'Description for event 183'),
    ('Tournament 184', TIMESTAMP '2024-07-11T22:40:13', 'City Arena', 'Description for event 184'),
    ('Tournament 185', TIMESTAMP '2023-06-26T18:51:04', 'Main Stadium', 'Description for event 185'),
    ('Tournament 186', TIMESTAMP '2023-09-23T21:46:07', 'Main Stadium', 'Description for event 186'),
    ('Tournament 187', TIMESTAMP '2024-07-15T13:30:12', 'University Stadium', 'Description for event 187'),
    ('Tournament 188', TIMESTAMP '2024-07-08T09:57:14', 'Main Stadium', 'Description for event 188'),
    ('Tournament 189', TIMESTAMP '2023-06-07T09:50:15', 'Sports Complex', 'Description for event 189'),
    ('Tournament 190', TIMESTAMP '2024-03-03T14:42:26', 'Sports Complex', 'Description for event 190'),
    ('Tournament 191', TIMESTAMP '2024-09-23T22:08:41', 'Memorial Field', 'Description for event 191'),
    ('Tournament 192', TIMESTAMP '2023-10-31T22:26:20', 'Main Stadium', 'Description for event 192'),
    ('Tournament 193', TIMESTAMP '2024-12-17T02:58:22', 'City Arena', 'Description for event 193'),
    ('Tournament 194', TIMESTAMP '2023-07-10T21:03:51', 'Sports Complex', 'Description for event 194'),
    ('Tournament 195', TIMESTAMP '2023-02-18T03:01:26', 'Memorial Field', 'Description for event 195'),
    ('Tournament 196', TIMESTAMP '2023-03-01T07:03:17', 'Sports Complex', 'Description for event 196'),
    ('Tournament 197', TIMESTAMP '2024-05-08T18:00:01', 'University Stadium', 'Description for event 197'),
    ('Tournament 198', TIMESTAMP '2023-06-08T06:57:20', 'Sports Complex', 'Description for event 198'),
    ('Tournament 199', TIMESTAMP '2023-04-19T08:51:27', 'Sports Complex', 'Description for event 199'),
    ('Tournament 200', TIMESTAMP '2024-05-08T04:19:31', 'Memorial Field', 'Description for event 200'),
    ('Tournament 201', TIMESTAMP '2024-11-06T06:37:10', 'Sports Complex', 'Description for event 201'),
    ('Tournament 202', TIMESTAMP '2024-11-10T16:42:34', 'Main Stadium', 'Description for event 202'),
    ('Tournament 203', TIMESTAMP '2023-10-05T23:33:02', 'Sports Complex', 'Description for event 203'),
    ('Tournament 204', TIMESTAMP '2024-01-30T21:31:10', 'Sports Complex', 'Description for event 204'),
    ('Tournament 205', TIMESTAMP '2024-11-16T09:59:18', 'University Stadium', 'Description for event 205'),
    ('Tournament 206', TIMESTAMP '2024-08-16T13:08:40', 'Main Stadium', 'Description for event 206'),
    ('Tournament 207', TIMESTAMP '2024-08-21T18:14:46', 'Main Stadium', 'Description for event 207'),
    ('Tournament 208', TIMESTAMP '2024-09-12T16:31:12', 'University Stadium', 'Description for event 208'),
    ('Tournament 209', TIMESTAMP '2024-10-16T15:41:14', 'Memorial Field', 'Description for event 209'),
    ('Tournament 210', TIMESTAMP '2024-03-08T05:44:26', 'City Arena', 'Description for event 210'),
    ('Tournament 211', TIMESTAMP '2024-02-23T15:08:00', 'University Stadium', 'Description for event 211'),
    ('Tournament 212', TIMESTAMP '2023-01-05T13:43:18', 'City Arena', 'Description for event 212'),
    ('Tournament 213', TIMESTAMP '2023-12-28T22:32:16', 'Sports Complex', 'Description for event 213'),
    ('Tournament 214', TIMESTAMP '2023-04-08T17:51:30', 'Main Stadium', 'Description for event 214'),
    ('Tournament 215', TIMESTAMP '2023-04-05T14:11:54', 'Main Stadium', 'Description for event 215'),
    ('Tournament 216', TIMESTAMP '2024-09-06T14:04:26', 'Memorial Field', 'Description for event 216'),
    ('Tournament 217', TIMESTAMP '2023-02-18T16:03:49', 'Memorial Field', 'Description for event 217'),
    ('Tournament 218', TIMESTAMP '2024-04-26T02:19:03', 'Sports Complex', 'Description for event 218'),
    ('Tournament 219', TIMESTAMP '2023-08-06T10:58:27', 'Memorial Field', 'Description for event 219'),
    ('Tournament 220', TIMESTAMP '2024-06-24T20:22:48', 'Sports Complex', 'Description for event 220'),
    ('Tournament 221', TIMESTAMP '2024-06-20T00:49:13', 'City Arena', 'Description for event 221'),
    ('Tournament 222', TIMESTAMP '2024-01-30T04:12:48', 'Sports Complex', 'Description for event 222'),
    ('Tournament 223', TIMESTAMP '2023-07-12T20:46:27', 'Sports Complex', 'Description for event 223'),
    ('Tournament 224', TIMESTAMP '2023-09-28T21:26:11', 'Memorial Field', 'Description for event 224'),
    ('Tournament 225', TIMESTAMP '2024-07-10T20:21:35', 'Sports Complex', 'Description for event 225'),
    ('Tournament 226', TIMESTAMP '2023-12-10T15:30:59', 'Sports Complex', 'Description for event 226'),
    ('Tournament 227', TIMESTAMP '2024-01-28T08:16:48', 'University Stadium', 'Description for event 227'),
    ('Tournament 228', TIMESTAMP '2023-07-03T18:30:03', 'Main Stadium', 'Description for event 228'),
    ('Tournament 229', TIMESTAMP '2024-10-02T03:47:20', 'Main Stadium', 'Description for event 229'),
    ('Tournament 230', TIMESTAMP '2023-12-29T04:43:47', 'Sports Complex', 'Description for event 230'),
    ('Tournament 231', TIMESTAMP '2024-06-17T00:01:10', 'City Arena', 'Description for event 231'),
    ('Tournament 232', TIMESTAMP '2023-06-22T03:03:35', 'City Arena', 'Description for event 232'),
    ('Tournament 233', TIMESTAMP '2023-01-14T17:36:38', 'Main Stadium', 'Description for event 233'),
    ('Tournament 234', TIMESTAMP '2023-05-30T18:18:54', 'City Arena', 'Description for event 234'),
    ('Tournament 235', TIMESTAMP '2024-11-11T08:19:29', 'City Arena', 'Description for event 235'),
    ('Tournament 236', TIMESTAMP '2023-07-18T03:31:14', 'Sports Complex', 'Description for event 236'),
    ('Tournament 237', TIMESTAMP '2024-10-30T11:13:05', 'City Arena', 'Description for event 237'),
    ('Tournament 238', TIMESTAMP '2023-08-27T01:32:34', 'City Arena', 'Description for event 238'),
    ('Tournament 239', TIMESTAMP '2024-09-05T03:13:18', 'City Arena', 'Description for event 239'),
    ('Tournament 240', TIMESTAMP '2023-08-05T22:13:30', 'City Arena', 'Description for event 240'),
    ('Tournament 241', TIMESTAMP '2024-11-10T14:03:04', 'University Stadium', 'Description for event 241'),
    ('Tournament 242', TIMESTAMP '2023-01-23T03:54:18', 'Memorial Field', 'Description for event 242'),
    ('Tournament 243', TIMESTAMP '2023-06-07T18:03:02', 'University Stadium', 'Description for event 243'),
    ('Tournament 244', TIMESTAMP '2023-03-22T21:52:25', 'City Arena', 'Description for event 244'),
    ('Tournament 245', TIMESTAMP '2023-02-19T19:58:10', 'City Arena', 'Description for event 245'),
    ('Tournament 246', TIMESTAMP '2023-01-02T01:51:31', 'Main Stadium', 'Description for event 246'),
    ('Tournament 247', TIMESTAMP '2024-02-19T18:22:52', 'Sports Complex', 'Description for event 247'),
    ('Tournament 248', TIMESTAMP '2023-06-22T04:53:58', 'City Arena', 'Description for event 248'),
    ('Tournament 249', TIMESTAMP '2024-08-13T22:32:41', 'City Arena', 'Description for event 249'),
    ('Tournament 250', TIMESTAMP '2024-09-13T19:32:44', 'University Stadium', 'Description for event 250'),
    ('Tournament 251', TIMESTAMP '2023-02-26T04:18:55', 'Main Stadium', 'Description for event 251'),
    ('Tournament 252', TIMESTAMP '2023-10-18T03:57:00', 'Sports Complex', 'Description for event 252'),
    ('Tournament 253', TIMESTAMP '2024-02-01T09:08:08', 'Main Stadium', 'Description for event 253'),
    ('Tournament 254', TIMESTAMP '2024-03-06T13:22:23', 'University Stadium', 'Description for event 254'),
    ('Tournament 255', TIMESTAMP '2023-01-21T18:25:55', 'Memorial Field', 'Description for event 255'),
    ('Tournament 256', TIMESTAMP '2024-02-10T04:40:36', 'City Arena', 'Description for event 256'),
    ('Tournament 257', TIMESTAMP '2024-07-04T20:39:48', 'City Arena', 'Description for event 257'),
    ('Tournament 258', TIMESTAMP '2024-01-17T13:46:11', 'Memorial Field', 'Description for event 258'),
    ('Tournament 259', TIMESTAMP '2023-09-29T08:21:38', 'University Stadium', 'Description for event 259'),
    ('Tournament 260', TIMESTAMP '2024-02-07T21:16:34', 'Memorial Field', 'Description for event 260'),
    ('Tournament 261', TIMESTAMP '2024-07-23T10:48:17', 'Main Stadium', 'Description for event 261'),
    ('Tournament 262', TIMESTAMP '2024-01-27T17:05:02', 'City Arena', 'Description for event 262'),
    ('Tournament 263', TIMESTAMP '2023-12-24T22:42:05', 'City Arena', 'Description for event 263'),
    ('Tournament 264', TIMESTAMP '2024-04-06T04:01:38', 'City Arena', 'Description for event 264'),
    ('Tournament 265', TIMESTAMP '2024-05-24T20:26:14', 'Memorial Field', 'Description for event 265'),
    ('Tournament 266', TIMESTAMP '2023-02-21T21:18:41', 'Memorial Field', 'Description for event 266'),
    ('Tournament 267', TIMESTAMP '2023-04-04T04:27:59', 'Main Stadium', 'Description for event 267'),
    ('Tournament 268', TIMESTAMP '2023-12-10T04:24:05', 'Sports Complex', 'Description for event 268'),
    ('Tournament 269', TIMESTAMP '2024-11-25T11:16:33', 'Memorial Field', 'Description for event 269'),
    ('Tournament 270', TIMESTAMP '2024-01-02T01:14:17', 'Sports Complex', 'Description for event 270'),
    ('Tournament 271', TIMESTAMP '2024-07-09T16:48:23', 'Main Stadium', 'Description for event 271'),
    ('Tournament 272', TIMESTAMP '2023-12-23T03:02:17', 'Memorial Field', 'Description for event 272'),
    ('Tournament 273', TIMESTAMP '2023-09-20T04:36:50', 'Main Stadium', 'Description for event 273'),
    ('Tournament 274', TIMESTAMP '2023-10-02T11:06:54', 'City Arena', 'Description for event 274'),
    ('Tournament 275', TIMESTAMP '2023-08-22T06:33:38', 'Main Stadium', 'Description for event 275'),
    ('Tournament 276', TIMESTAMP '2024-06-04T08:05:19', 'Main Stadium', 'Description for event 276'),
    ('Tournament 277', TIMESTAMP '2023-07-18T18:34:59', 'Main Stadium', 'Description for event 277'),
    ('Tournament 278', TIMESTAMP '2023-09-03T00:55:40', 'Main Stadium', 'Description for event 278'),
    ('Tournament 279', TIMESTAMP '2023-08-12T14:37:03', 'Sports Complex', 'Description for event 279'),
    ('Tournament 280', TIMESTAMP '2023-02-12T12:52:52', 'City Arena', 'Description for event 280'),
    ('Tournament 281', TIMESTAMP '2024-07-08T12:13:48', 'Main Stadium', 'Description for event 281'),
    ('Tournament 282', TIMESTAMP '2024-08-30T12:25:05', 'University Stadium', 'Description for event 282'),
    ('Tournament 283', TIMESTAMP '2024-11-04T14:02:44', 'Main Stadium', 'Description for event 283'),
    ('Tournament 284', TIMESTAMP '2024-07-20T18:52:40', 'University Stadium', 'Description for event 284'),
    ('Tournament 285', TIMESTAMP '2023-05-23T17:42:45', 'City Arena', 'Description for event 285'),
    ('Tournament 286', TIMESTAMP '2023-12-20T03:53:46', 'Memorial Field', 'Description for event 286'),
    ('Tournament 287', TIMESTAMP '2024-01-14T13:03:41', 'University Stadium', 'Description for event 287'),
    ('Tournament 288', TIMESTAMP '2024-06-27T21:33:52', 'Memorial Field', 'Description for event 288'),
    ('Tournament 289', TIMESTAMP '2023-08-19T17:22:57', 'Main Stadium', 'Description for event 289'),
    ('Tournament 290', TIMESTAMP '2023-05-01T12:42:15', 'Sports Complex', 'Description for event 290'),
    ('Tournament 291', TIMESTAMP '2023-10-01T03:32:48', 'Memorial Field', 'Description for event 291'),
    ('Tournament 292', TIMESTAMP '2024-01-08T00:30:04', 'City Arena', 'Description for event 292'),
    ('Tournament 293', TIMESTAMP '2023-06-17T17:43:53', 'City Arena', 'Description for event 293'),
    ('Tournament 294', TIMESTAMP '2024-04-06T11:10:04', 'Main Stadium', 'Description for event 294'),
    ('Tournament 295', TIMESTAMP '2023-06-13T03:43:04', 'City Arena', 'Description for event 295'),
    ('Tournament 296', TIMESTAMP '2023-01-21T18:12:23', 'Main Stadium', 'Description for event 296'),
    ('Tournament 297', TIMESTAMP '2023-01-03T17:20:35', 'City Arena', 'Description for event 297'),
    ('Tournament 298', TIMESTAMP '2024-10-13T18:36:31', 'Sports Complex', 'Description for event 298'),
    ('Tournament 299', TIMESTAMP '2023-09-11T22:58:59', 'Memorial Field', 'Description for event 299'),
    ('Tournament 300', TIMESTAMP '2024-08-15T13:37:40', 'University Stadium', 'Description for event 300'),
    ('Tournament 301', TIMESTAMP '2023-09-24T00:24:04', 'City Arena', 'Description for event 301'),
    ('Tournament 302', TIMESTAMP '2023-08-18T07:22:24', 'Sports Complex', 'Description for event 302'),
    ('Tournament 303', TIMESTAMP '2024-06-15T22:34:51', 'University Stadium', 'Description for event 303'),
    ('Tournament 304', TIMESTAMP '2023-03-19T13:57:15', 'Memorial Field', 'Description for event 304'),
    ('Tournament 305', TIMESTAMP '2023-08-18T01:06:58', 'Main Stadium', 'Description for event 305'),
    ('Tournament 306', TIMESTAMP '2024-05-16T04:07:57', 'Main Stadium', 'Description for event 306'),
    ('Tournament 307', TIMESTAMP '2024-03-02T19:32:08', 'Memorial Field', 'Description for event 307'),
    ('Tournament 308', TIMESTAMP '2024-05-26T21:47:21', 'Sports Complex', 'Description for event 308'),
    ('Tournament 309', TIMESTAMP '2023-04-19T03:01:19', 'Memorial Field', 'Description for event 309'),
    ('Tournament 310', TIMESTAMP '2023-09-02T11:12:42', 'Memorial Field', 'Description for event 310'),
    ('Tournament 311', TIMESTAMP '2024-06-27T05:46:43', 'Memorial Field', 'Description for event 311'),
    ('Tournament 312', TIMESTAMP '2024-07-22T17:41:41', 'Memorial Field', 'Description for event 312'),
    ('Tournament 313', TIMESTAMP '2024-10-13T15:22:42', 'University Stadium', 'Description for event 313'),
    ('Tournament 314', TIMESTAMP '2023-04-25T21:44:34', 'City Arena', 'Description for event 314'),
    ('Tournament 315', TIMESTAMP '2023-11-02T01:22:00', 'City Arena', 'Description for event 315'),
    ('Tournament 316', TIMESTAMP '2023-06-24T16:30:02', 'Memorial Field', 'Description for event 316'),
    ('Tournament 317', TIMESTAMP '2024-06-12T03:38:09', 'Main Stadium', 'Description for event 317'),
    ('Tournament 318', TIMESTAMP '2024-03-28T05:31:19', 'Main Stadium', 'Description for event 318'),
    ('Tournament 319', TIMESTAMP '2023-10-30T00:25:27', 'Main Stadium', 'Description for event 319'),
    ('Tournament 320', TIMESTAMP '2024-10-15T11:56:54', 'Memorial Field', 'Description for event 320'),
    ('Tournament 321', TIMESTAMP '2023-07-07T15:15:34', 'Sports Complex', 'Description for event 321'),
    ('Tournament 322', TIMESTAMP '2023-08-16T02:23:20', 'Sports Complex', 'Description for event 322'),
    ('Tournament 323', TIMESTAMP '2024-11-27T21:44:56', 'City Arena', 'Description for event 323'),
    ('Tournament 324', TIMESTAMP '2024-09-28T13:35:19', 'Sports Complex', 'Description for event 324'),
    ('Tournament 325', TIMESTAMP '2024-01-22T15:06:16', 'Memorial Field', 'Description for event 325'),
    ('Tournament 326', TIMESTAMP '2024-12-12T14:41:41', 'Main Stadium', 'Description for event 326'),
    ('Tournament 327', TIMESTAMP '2024-11-11T14:26:59', 'Sports Complex', 'Description for event 327'),
    ('Tournament 328', TIMESTAMP '2023-02-26T05:49:03', 'University Stadium', 'Description for event 328'),
    ('Tournament 329', TIMESTAMP '2023-11-07T01:33:53', 'Memorial Field', 'Description for event 329'),
    ('Tournament 330', TIMESTAMP '2024-03-01T08:59:40', 'University Stadium', 'Description for event 330'),
    ('Tournament 331', TIMESTAMP '2023-09-17T13:48:05', 'City Arena', 'Description for event 331'),
    ('Tournament 332', TIMESTAMP '2024-07-20T09:30:18', 'City Arena', 'Description for event 332'),
    ('Tournament 333', TIMESTAMP '2023-05-05T20:57:51', 'Main Stadium', 'Description for event 333'),
    ('Tournament 334', TIMESTAMP '2024-05-21T00:31:42', 'University Stadium', 'Description for event 334'),
    ('Tournament 335', TIMESTAMP '2024-12-14T02:52:23', 'University Stadium', 'Description for event 335'),
    ('Tournament 336', TIMESTAMP '2024-09-30T14:45:57', 'Memorial Field', 'Description for event 336'),
    ('Tournament 337', TIMESTAMP '2023-07-25T20:48:13', 'Sports Complex', 'Description for event 337'),
    ('Tournament 338', TIMESTAMP '2023-10-14T03:38:48', 'University Stadium', 'Description for event 338'),
    ('Tournament 339', TIMESTAMP '2024-03-27T20:12:16', 'Main Stadium', 'Description for event 339'),
    ('Tournament 340', TIMESTAMP '2023-09-14T17:41:59', 'University Stadium', 'Description for event 340'),
    ('Tournament 341', TIMESTAMP '2024-10-18T04:16:55', 'University Stadium', 'Description for event 341'),
    ('Tournament 342', TIMESTAMP '2023-08-20T15:55:17', 'Main Stadium', 'Description for event 342'),
    ('Tournament 343', TIMESTAMP '2024-06-16T00:32:51', 'Main Stadium', 'Description for event 343'),
    ('Tournament 344', TIMESTAMP '2024-11-06T02:46:49', 'Memorial Field', 'Description for event 344'),
    ('Tournament 345', TIMESTAMP '2024-01-19T09:46:56', 'Sports Complex', 'Description for event 345'),
    ('Tournament 346', TIMESTAMP '2023-11-21T05:17:01', 'Main Stadium', 'Description for event 346'),
    ('Tournament 347', TIMESTAMP '2023-06-15T02:16:19', 'Sports Complex', 'Description for event 347'),
    ('Tournament 348', TIMESTAMP '2024-07-26T21:44:10', 'Main Stadium', 'Description for event 348'),
    ('Tournament 349', TIMESTAMP '2023-03-29T13:24:31', 'City Arena', 'Description for event 349'),
    ('Tournament 350', TIMESTAMP '2024-12-03T01:05:49', 'City Arena', 'Description for event 350'),
    ('Tournament 351', TIMESTAMP '2023-12-13T15:38:14', 'Main Stadium', 'Description for event 351'),
    ('Tournament 352', TIMESTAMP '2024-01-16T16:30:22', 'Main Stadium', 'Description for event 352'),
    ('Tournament 353', TIMESTAMP '2024-08-11T08:23:15', 'Main Stadium', 'Description for event 353'),
    ('Tournament 354', TIMESTAMP '2024-04-22T10:42:19', 'City Arena', 'Description for event 354'),
    ('Tournament 355', TIMESTAMP '2024-12-03T13:54:50', 'Main Stadium', 'Description for event 355'),
    ('Tournament 356', TIMESTAMP '2023-04-07T07:56:49', 'Memorial Field', 'Description for event 356'),
    ('Tournament 357', TIMESTAMP '2023-05-19T07:04:27', 'Sports Complex', 'Description for event 357'),
    ('Tournament 358', TIMESTAMP '2023-01-05T05:01:16', 'Main Stadium', 'Description for event 358'),
    ('Tournament 359', TIMESTAMP '2023-03-07T06:14:15', 'City Arena', 'Description for event 359'),
    ('Tournament 360', TIMESTAMP '2024-01-13T23:05:46', 'University Stadium', 'Description for event 360'),
    ('Tournament 361', TIMESTAMP '2024-07-01T15:57:53', 'Sports Complex', 'Description for event 361'),
    ('Tournament 362', TIMESTAMP '2024-04-13T10:46:58', 'Main Stadium', 'Description for event 362'),
    ('Tournament 363', TIMESTAMP '2024-04-27T09:45:50', 'City Arena', 'Description for event 363'),
    ('Tournament 364', TIMESTAMP '2024-02-26T15:02:16', 'University Stadium', 'Description for event 364'),
    ('Tournament 365', TIMESTAMP '2024-06-23T13:37:10', 'Memorial Field', 'Description for event 365'),
    ('Tournament 366', TIMESTAMP '2023-04-30T19:18:34', 'University Stadium', 'Description for event 366'),
    ('Tournament 367', TIMESTAMP '2023-09-20T01:15:47', 'Memorial Field', 'Description for event 367'),
    ('Tournament 368', TIMESTAMP '2023-03-17T11:48:38', 'City Arena', 'Description for event 368'),
    ('Tournament 369', TIMESTAMP '2024-06-01T23:32:00', 'Sports Complex', 'Description for event 369'),
    ('Tournament 370', TIMESTAMP '2023-05-01T04:59:48', 'Sports Complex', 'Description for event 370'),
    ('Tournament 371', TIMESTAMP '2024-08-21T19:28:19', 'University Stadium', 'Description for event 371'),
    ('Tournament 372', TIMESTAMP '2024-06-07T21:18:52', 'City Arena', 'Description for event 372'),
    ('Tournament 373', TIMESTAMP '2024-05-03T11:24:45', 'City Arena', 'Description for event 373'),
    ('Tournament 374', TIMESTAMP '2024-09-16T10:40:17', 'University Stadium', 'Description for event 374'),
    ('Tournament 375', TIMESTAMP '2023-05-21T21:04:27', 'Sports Complex', 'Description for event 375'),
    ('Tournament 376', TIMESTAMP '2024-12-29T11:36:43', 'City Arena', 'Description for event 376'),
    ('Tournament 377', TIMESTAMP '2023-06-25T11:38:23', 'Main Stadium', 'Description for event 377'),
    ('Tournament 378', TIMESTAMP '2024-02-19T06:54:15', 'Main Stadium', 'Description for event 378'),
    ('Tournament 379', TIMESTAMP '2024-12-17T12:26:49', 'Sports Complex', 'Description for event 379'),
    ('Tournament 380', TIMESTAMP '2023-08-08T07:21:23', 'Main Stadium', 'Description for event 380'),
    ('Tournament 381', TIMESTAMP '2023-12-20T01:09:02', 'Sports Complex', 'Description for event 381'),
    ('Tournament 382', TIMESTAMP '2023-04-01T23:40:32', 'City Arena', 'Description for event 382'),
    ('Tournament 383', TIMESTAMP '2024-11-15T18:14:13', 'Sports Complex', 'Description for event 383'),
    ('Tournament 384', TIMESTAMP '2023-05-06T06:44:19', 'University Stadium', 'Description for event 384'),
    ('Tournament 385', TIMESTAMP '2023-03-20T15:48:20', 'University Stadium', 'Description for event 385'),
    ('Tournament 386', TIMESTAMP '2024-06-24T01:02:07', 'Memorial Field', 'Description for event 386'),
    ('Tournament 387', TIMESTAMP '2023-08-17T15:58:42', 'Memorial Field', 'Description for event 387'),
    ('Tournament 388', TIMESTAMP '2023-10-24T11:26:18', 'University Stadium', 'Description for event 388'),
    ('Tournament 389', TIMESTAMP '2024-09-14T22:36:31', 'Sports Complex', 'Description for event 389'),
    ('Tournament 390', TIMESTAMP '2023-04-23T23:00:30', 'Main Stadium', 'Description for event 390'),
    ('Tournament 391', TIMESTAMP '2023-06-14T14:02:40', 'Memorial Field', 'Description for event 391'),
    ('Tournament 392', TIMESTAMP '2023-10-18T11:29:18', 'Main Stadium', 'Description for event 392'),
    ('Tournament 393', TIMESTAMP '2024-01-20T12:12:10', 'City Arena', 'Description for event 393'),
    ('Tournament 394', TIMESTAMP '2023-02-17T21:00:45', 'University Stadium', 'Description for event 394'),
    ('Tournament 395', TIMESTAMP '2024-09-21T04:25:40', 'Memorial Field', 'Description for event 395'),
    ('Tournament 396', TIMESTAMP '2024-06-08T15:06:25', 'Sports Complex', 'Description for event 396'),
    ('Tournament 397', TIMESTAMP '2024-12-10T01:41:28', 'University Stadium', 'Description for event 397'),
    ('Tournament 398', TIMESTAMP '2024-04-16T01:08:40', 'City Arena', 'Description for event 398'),
    ('Tournament 399', TIMESTAMP '2023-04-29T01:00:55', 'Sports Complex', 'Description for event 399'),
    ('Tournament 400', TIMESTAMP '2023-10-03T17:34:57', 'University Stadium', 'Description for event 400'),
    ('Tournament 401', TIMESTAMP '2024-11-09T14:03:34', 'City Arena', 'Description for event 401'),
    ('Tournament 402', TIMESTAMP '2024-05-17T01:31:06', 'Sports Complex', 'Description for event 402'),
    ('Tournament 403', TIMESTAMP '2023-12-17T01:38:23', 'Sports Complex', 'Description for event 403'),
    ('Tournament 404', TIMESTAMP '2023-06-05T05:26:56', 'City Arena', 'Description for event 404'),
    ('Tournament 405', TIMESTAMP '2023-05-12T06:30:55', 'City Arena', 'Description for event 405'),
    ('Tournament 406', TIMESTAMP '2024-02-01T13:23:51', 'University Stadium', 'Description for event 406'),
    ('Tournament 407', TIMESTAMP '2024-07-07T16:39:07', 'Memorial Field', 'Description for event 407'),
    ('Tournament 408', TIMESTAMP '2023-08-30T21:30:24', 'Memorial Field', 'Description for event 408'),
    ('Tournament 409', TIMESTAMP '2023-11-20T18:58:12', 'City Arena', 'Description for event 409'),
    ('Tournament 410', TIMESTAMP '2024-08-13T06:27:32', 'Memorial Field', 'Description for event 410'),
    ('Tournament 411', TIMESTAMP '2024-11-09T10:18:34', 'Memorial Field', 'Description for event 411'),
    ('Tournament 412', TIMESTAMP '2023-05-03T06:57:16', 'Sports Complex', 'Description for event 412'),
    ('Tournament 413', TIMESTAMP '2024-11-07T10:48:23', 'Memorial Field', 'Description for event 413'),
    ('Tournament 414', TIMESTAMP '2024-03-12T09:20:16', 'Main Stadium', 'Description for event 414'),
    ('Tournament 415', TIMESTAMP '2023-01-10T19:25:29', 'Sports Complex', 'Description for event 415'),
    ('Tournament 416', TIMESTAMP '2023-03-24T12:44:03', 'Main Stadium', 'Description for event 416'),
    ('Tournament 417', TIMESTAMP '2023-03-14T07:43:46', 'City Arena', 'Description for event 417'),
    ('Tournament 418', TIMESTAMP '2023-09-06T17:17:55', 'City Arena', 'Description for event 418'),
    ('Tournament 419', TIMESTAMP '2023-05-26T20:23:30', 'City Arena', 'Description for event 419'),
    ('Tournament 420', TIMESTAMP '2024-09-12T21:46:17', 'Memorial Field', 'Description for event 420'),
    ('Tournament 421', TIMESTAMP '2023-11-17T16:53:48', 'Sports Complex', 'Description for event 421'),
    ('Tournament 422', TIMESTAMP '2024-05-28T17:54:54', 'Main Stadium', 'Description for event 422'),
    ('Tournament 423', TIMESTAMP '2024-05-16T17:58:35', 'City Arena', 'Description for event 423'),
    ('Tournament 424', TIMESTAMP '2024-04-10T02:33:58', 'Main Stadium', 'Description for event 424'),
    ('Tournament 425', TIMESTAMP '2023-02-19T10:18:34', 'Memorial Field', 'Description for event 425'),
    ('Tournament 426', TIMESTAMP '2023-06-07T06:19:46', 'University Stadium', 'Description for event 426'),
    ('Tournament 427', TIMESTAMP '2024-03-21T12:15:47', 'City Arena', 'Description for event 427'),
    ('Tournament 428', TIMESTAMP '2023-12-15T17:03:30', 'Sports Complex', 'Description for event 428'),
    ('Tournament 429', TIMESTAMP '2024-11-15T20:57:53', 'Sports Complex', 'Description for event 429'),
    ('Tournament 430', TIMESTAMP '2023-09-02T12:16:22', 'City Arena', 'Description for event 430'),
    ('Tournament 431', TIMESTAMP '2024-09-17T06:04:23', 'Memorial Field', 'Description for event 431'),
    ('Tournament 432', TIMESTAMP '2024-07-21T08:11:41', 'University Stadium', 'Description for event 432'),
    ('Tournament 433', TIMESTAMP '2024-07-13T08:26:28', 'University Stadium', 'Description for event 433'),
    ('Tournament 434', TIMESTAMP '2024-12-09T18:43:01', 'Sports Complex', 'Description for event 434'),
    ('Tournament 435', TIMESTAMP '2024-06-30T11:42:58', 'Memorial Field', 'Description for event 435'),
    ('Tournament 436', TIMESTAMP '2023-07-12T22:23:22', 'Main Stadium', 'Description for event 436'),
    ('Tournament 437', TIMESTAMP '2024-04-05T08:42:08', 'Main Stadium', 'Description for event 437'),
    ('Tournament 438', TIMESTAMP '2024-01-09T01:06:24', 'University Stadium', 'Description for event 438'),
    ('Tournament 439', TIMESTAMP '2023-01-04T07:29:49', 'University Stadium', 'Description for event 439'),
    ('Tournament 440', TIMESTAMP '2023-06-12T07:16:55', 'Main Stadium', 'Description for event 440'),
    ('Tournament 441', TIMESTAMP '2024-06-19T17:53:27', 'Main Stadium', 'Description for event 441'),
    ('Tournament 442', TIMESTAMP '2024-05-30T22:29:47', 'University Stadium', 'Description for event 442'),
    ('Tournament 443', TIMESTAMP '2024-10-08T17:21:07', 'University Stadium', 'Description for event 443'),
    ('Tournament 444', TIMESTAMP '2024-10-04T11:18:22', 'Main Stadium', 'Description for event 444'),
    ('Tournament 445', TIMESTAMP '2024-07-04T10:07:56', 'Sports Complex', 'Description for event 445'),
    ('Tournament 446', TIMESTAMP '2024-01-02T12:09:49', 'Main Stadium', 'Description for event 446'),
    ('Tournament 447', TIMESTAMP '2023-06-05T22:07:58', 'Memorial Field', 'Description for event 447'),
    ('Tournament 448', TIMESTAMP '2023-12-29T16:27:12', 'City Arena', 'Description for event 448'),
    ('Tournament 449', TIMESTAMP '2023-05-18T14:08:13', 'Main Stadium', 'Description for event 449'),
    ('Tournament 450', TIMESTAMP '2023-09-19T06:54:55', 'University Stadium', 'Description for event 450'),
    ('Tournament 451', TIMESTAMP '2023-11-05T17:19:33', 'University Stadium', 'Description for event 451'),
    ('Tournament 452', TIMESTAMP '2023-09-23T16:23:30', 'Main Stadium', 'Description for event 452'),
    ('Tournament 453', TIMESTAMP '2024-02-27T09:35:03', 'Sports Complex', 'Description for event 453'),
    ('Tournament 454', TIMESTAMP '2024-07-30T05:18:41', 'University Stadium', 'Description for event 454'),
    ('Tournament 455', TIMESTAMP '2023-07-01T11:11:52', 'Sports Complex', 'Description for event 455'),
    ('Tournament 456', TIMESTAMP '2024-04-20T01:50:03', 'City Arena', 'Description for event 456'),
    ('Tournament 457', TIMESTAMP '2024-08-20T04:12:17', 'City Arena', 'Description for event 457'),
    ('Tournament 458', TIMESTAMP '2024-01-09T18:48:44', 'Main Stadium', 'Description for event 458'),
    ('Tournament 459', TIMESTAMP '2024-04-19T14:02:35', 'Sports Complex', 'Description for event 459'),
    ('Tournament 460', TIMESTAMP '2023-04-25T20:25:38', 'University Stadium', 'Description for event 460'),
    ('Tournament 461', TIMESTAMP '2024-04-10T18:58:35', 'University Stadium', 'Description for event 461'),
    ('Tournament 462', TIMESTAMP '2024-05-12T20:54:22', 'Main Stadium', 'Description for event 462'),
    ('Tournament 463', TIMESTAMP '2023-03-16T16:19:42', 'City Arena', 'Description for event 463'),
    ('Tournament 464', TIMESTAMP '2023-07-01T19:46:31', 'City Arena', 'Description for event 464'),
    ('Tournament 465', TIMESTAMP '2023-04-06T05:36:37', 'City Arena', 'Description for event 465'),
    ('Tournament 466', TIMESTAMP '2023-12-22T08:16:52', 'University Stadium', 'Description for event 466'),
    ('Tournament 467', TIMESTAMP '2024-04-05T14:49:50', 'University Stadium', 'Description for event 467'),
    ('Tournament 468', TIMESTAMP '2024-12-13T07:46:25', 'University Stadium', 'Description for event 468'),
    ('Tournament 469', TIMESTAMP '2023-07-05T21:22:59', 'University Stadium', 'Description for event 469'),
    ('Tournament 470', TIMESTAMP '2023-04-15T09:20:12', 'Memorial Field', 'Description for event 470'),
    ('Tournament 471', TIMESTAMP '2023-11-25T14:38:28', 'Main Stadium', 'Description for event 471'),
    ('Tournament 472', TIMESTAMP '2024-07-31T02:58:58', 'Sports Complex', 'Description for event 472'),
    ('Tournament 473', TIMESTAMP '2023-10-19T20:13:09', 'Sports Complex', 'Description for event 473'),
    ('Tournament 474', TIMESTAMP '2024-10-31T15:29:41', 'Memorial Field', 'Description for event 474'),
    ('Tournament 475', TIMESTAMP '2023-08-28T04:19:29', 'Memorial Field', 'Description for event 475'),
    ('Tournament 476', TIMESTAMP '2023-08-08T00:13:07', 'Main Stadium', 'Description for event 476'),
    ('Tournament 477', TIMESTAMP '2023-04-02T06:01:11', 'Main Stadium', 'Description for event 477'),
    ('Tournament 478', TIMESTAMP '2024-08-22T04:05:27', 'Main Stadium', 'Description for event 478'),
    ('Tournament 479', TIMESTAMP '2024-07-27T07:47:40', 'Memorial Field', 'Description for event 479'),
    ('Tournament 480', TIMESTAMP '2024-07-10T14:26:58', 'Main Stadium', 'Description for event 480'),
    ('Tournament 481', TIMESTAMP '2024-05-28T13:37:32', 'Sports Complex', 'Description for event 481'),
    ('Tournament 482', TIMESTAMP '2024-12-01T15:22:08', 'Main Stadium', 'Description for event 482'),
    ('Tournament 483', TIMESTAMP '2023-03-17T06:51:44', 'Main Stadium', 'Description for event 483'),
    ('Tournament 484', TIMESTAMP '2023-03-20T00:35:19', 'University Stadium', 'Description for event 484'),
    ('Tournament 485', TIMESTAMP '2024-03-06T06:09:58', 'Sports Complex', 'Description for event 485'),
    ('Tournament 486', TIMESTAMP '2024-03-16T17:27:40', 'Memorial Field', 'Description for event 486'),
    ('Tournament 487', TIMESTAMP '2024-07-05T16:15:05', 'University Stadium', 'Description for event 487'),
    ('Tournament 488', TIMESTAMP '2023-09-14T22:54:46', 'Memorial Field', 'Description for event 488'),
    ('Tournament 489', TIMESTAMP '2024-01-12T16:21:21', 'University Stadium', 'Description for event 489'),
    ('Tournament 490', TIMESTAMP '2023-02-26T07:02:39', 'University Stadium', 'Description for event 490'),
    ('Tournament 491', TIMESTAMP '2023-06-06T23:21:37', 'Main Stadium', 'Description for event 491'),
    ('Tournament 492', TIMESTAMP '2024-07-27T06:05:59', 'Memorial Field', 'Description for event 492'),
    ('Tournament 493', TIMESTAMP '2024-01-27T07:53:52', 'Memorial Field', 'Description for event 493'),
    ('Tournament 494', TIMESTAMP '2023-01-19T14:28:48', 'Main Stadium', 'Description for event 494'),
    ('Tournament 495', TIMESTAMP '2024-05-26T18:03:07', 'Sports Complex', 'Description for event 495'),
    ('Tournament 496', TIMESTAMP '2024-10-14T03:00:08', 'Main Stadium', 'Description for event 496'),
    ('Tournament 497', TIMESTAMP '2023-09-23T11:03:29', 'University Stadium', 'Description for event 497'),
    ('Tournament 498', TIMESTAMP '2023-12-24T14:16:24', 'Main Stadium', 'Description for event 498'),
    ('Tournament 499', TIMESTAMP '2024-02-12T07:56:47', 'University Stadium', 'Description for event 499'),
    ('Tournament 500', TIMESTAMP '2024-01-17T09:02:47', 'Sports Complex', 'Description for event 500')
) AS e(event_name, event_date, location, description)
CROSS JOIN (
  SELECT sport_id FROM sports ORDER BY random() LIMIT 1
) s
ON CONFLICT DO NOTHING;