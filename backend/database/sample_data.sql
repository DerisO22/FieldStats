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
    ('Dallas School 1', 'Illinois', 'Dallas', '1 Main St', 'www.school1.edu'),
    ('Dallas School 2', 'Florida', 'Dallas', '2 Main St', 'www.school2.edu'),
    ('Dallas School 3', 'California', 'Dallas', '3 Main St', 'www.school3.edu'),
    ('Houston School 4', 'Texas', 'Houston', '4 Main St', 'www.school4.edu'),
    ('Miami School 5', 'Illinois', 'Miami', '5 Main St', 'www.school5.edu'),
    ('Houston School 6', 'Florida', 'Houston', '6 Main St', 'www.school6.edu'),
    ('Dallas School 7', 'Florida', 'Dallas', '7 Main St', 'www.school7.edu'),
    ('Houston School 8', 'New York', 'Houston', '8 Main St', 'www.school8.edu'),
    ('Chicago School 9', 'New York', 'Chicago', '9 Main St', 'www.school9.edu'),
    ('San Francisco School 10', 'California', 'San Francisco', '10 Main St', 'www.school10.edu'),
    ('Houston School 11', 'Florida', 'Houston', '11 Main St', 'www.school11.edu'),
    ('San Francisco School 12', 'Florida', 'San Francisco', '12 Main St', 'www.school12.edu'),
    ('Chicago School 13', 'New York', 'Chicago', '13 Main St', 'www.school13.edu'),
    ('Chicago School 14', 'New York', 'Chicago', '14 Main St', 'www.school14.edu'),
    ('New York City School 15', 'California', 'New York City', '15 Main St', 'www.school15.edu'),
    ('San Francisco School 16', 'California', 'San Francisco', '16 Main St', 'www.school16.edu'),
    ('Houston School 17', 'Illinois', 'Houston', '17 Main St', 'www.school17.edu'),
    ('Chicago School 18', 'Texas', 'Chicago', '18 Main St', 'www.school18.edu'),
    ('Los Angeles School 19', 'Florida', 'Los Angeles', '19 Main St', 'www.school19.edu'),
    ('Los Angeles School 20', 'Florida', 'Los Angeles', '20 Main St', 'www.school20.edu'),
    ('New York City School 21', 'Illinois', 'New York City', '21 Main St', 'www.school21.edu'),
    ('Los Angeles School 22', 'New York', 'Los Angeles', '22 Main St', 'www.school22.edu'),
    ('New York City School 23', 'California', 'New York City', '23 Main St', 'www.school23.edu'),
    ('Houston School 24', 'Florida', 'Houston', '24 Main St', 'www.school24.edu'),
    ('San Francisco School 25', 'New York', 'San Francisco', '25 Main St', 'www.school25.edu'),
    ('Dallas School 26', 'Texas', 'Dallas', '26 Main St', 'www.school26.edu'),
    ('New York City School 27', 'Florida', 'New York City', '27 Main St', 'www.school27.edu'),
    ('Houston School 28', 'California', 'Houston', '28 Main St', 'www.school28.edu'),
    ('Los Angeles School 29', 'Florida', 'Los Angeles', '29 Main St', 'www.school29.edu'),
    ('Dallas School 30', 'New York', 'Dallas', '30 Main St', 'www.school30.edu'),
    ('Dallas School 31', 'Texas', 'Dallas', '31 Main St', 'www.school31.edu'),
    ('Dallas School 32', 'Florida', 'Dallas', '32 Main St', 'www.school32.edu'),
    ('Houston School 33', 'Florida', 'Houston', '33 Main St', 'www.school33.edu'),
    ('Houston School 34', 'New York', 'Houston', '34 Main St', 'www.school34.edu'),
    ('Dallas School 35', 'New York', 'Dallas', '35 Main St', 'www.school35.edu'),
    ('New York City School 36', 'California', 'New York City', '36 Main St', 'www.school36.edu'),
    ('Chicago School 37', 'Texas', 'Chicago', '37 Main St', 'www.school37.edu'),
    ('Houston School 38', 'Illinois', 'Houston', '38 Main St', 'www.school38.edu'),
    ('New York City School 39', 'Texas', 'New York City', '39 Main St', 'www.school39.edu'),
    ('San Francisco School 40', 'Illinois', 'San Francisco', '40 Main St', 'www.school40.edu'),
    ('Los Angeles School 41', 'Florida', 'Los Angeles', '41 Main St', 'www.school41.edu'),
    ('New York City School 42', 'New York', 'New York City', '42 Main St', 'www.school42.edu'),
    ('Dallas School 43', 'New York', 'Dallas', '43 Main St', 'www.school43.edu'),
    ('New York City School 44', 'California', 'New York City', '44 Main St', 'www.school44.edu'),
    ('Chicago School 45', 'Illinois', 'Chicago', '45 Main St', 'www.school45.edu'),
    ('Chicago School 46', 'Florida', 'Chicago', '46 Main St', 'www.school46.edu'),
    ('Dallas School 47', 'Illinois', 'Dallas', '47 Main St', 'www.school47.edu'),
    ('Houston School 48', 'Florida', 'Houston', '48 Main St', 'www.school48.edu'),
    ('Houston School 49', 'New York', 'Houston', '49 Main St', 'www.school49.edu'),
    ('Miami School 50', 'Texas', 'Miami', '50 Main St', 'www.school50.edu'),
    ('Houston School 51', 'Texas', 'Houston', '51 Main St', 'www.school51.edu'),
    ('Dallas School 52', 'Illinois', 'Dallas', '52 Main St', 'www.school52.edu'),
    ('Los Angeles School 53', 'California', 'Los Angeles', '53 Main St', 'www.school53.edu'),
    ('New York City School 54', 'Texas', 'New York City', '54 Main St', 'www.school54.edu'),
    ('Houston School 55', 'Illinois', 'Houston', '55 Main St', 'www.school55.edu'),
    ('San Francisco School 56', 'Florida', 'San Francisco', '56 Main St', 'www.school56.edu'),
    ('New York City School 57', 'Illinois', 'New York City', '57 Main St', 'www.school57.edu'),
    ('San Francisco School 58', 'California', 'San Francisco', '58 Main St', 'www.school58.edu'),
    ('San Francisco School 59', 'Florida', 'San Francisco', '59 Main St', 'www.school59.edu'),
    ('New York City School 60', 'Florida', 'New York City', '60 Main St', 'www.school60.edu'),
    ('Los Angeles School 61', 'California', 'Los Angeles', '61 Main St', 'www.school61.edu'),
    ('Houston School 62', 'Florida', 'Houston', '62 Main St', 'www.school62.edu'),
    ('Dallas School 63', 'New York', 'Dallas', '63 Main St', 'www.school63.edu'),
    ('Los Angeles School 64', 'Texas', 'Los Angeles', '64 Main St', 'www.school64.edu'),
    ('Chicago School 65', 'New York', 'Chicago', '65 Main St', 'www.school65.edu'),
    ('Los Angeles School 66', 'California', 'Los Angeles', '66 Main St', 'www.school66.edu'),
    ('New York City School 67', 'Illinois', 'New York City', '67 Main St', 'www.school67.edu'),
    ('Chicago School 68', 'Texas', 'Chicago', '68 Main St', 'www.school68.edu'),
    ('Los Angeles School 69', 'Texas', 'Los Angeles', '69 Main St', 'www.school69.edu'),
    ('Houston School 70', 'Illinois', 'Houston', '70 Main St', 'www.school70.edu'),
    ('Dallas School 71', 'Texas', 'Dallas', '71 Main St', 'www.school71.edu'),
    ('Houston School 72', 'California', 'Houston', '72 Main St', 'www.school72.edu'),
    ('Miami School 73', 'New York', 'Miami', '73 Main St', 'www.school73.edu'),
    ('New York City School 74', 'Illinois', 'New York City', '74 Main St', 'www.school74.edu'),
    ('New York City School 75', 'Illinois', 'New York City', '75 Main St', 'www.school75.edu'),
    ('Chicago School 76', 'Florida', 'Chicago', '76 Main St', 'www.school76.edu'),
    ('San Francisco School 77', 'New York', 'San Francisco', '77 Main St', 'www.school77.edu'),
    ('Los Angeles School 78', 'Florida', 'Los Angeles', '78 Main St', 'www.school78.edu'),
    ('San Francisco School 79', 'New York', 'San Francisco', '79 Main St', 'www.school79.edu'),
    ('Miami School 80', 'California', 'Miami', '80 Main St', 'www.school80.edu'),
    ('Los Angeles School 81', 'New York', 'Los Angeles', '81 Main St', 'www.school81.edu'),
    ('New York City School 82', 'New York', 'New York City', '82 Main St', 'www.school82.edu'),
    ('Los Angeles School 83', 'New York', 'Los Angeles', '83 Main St', 'www.school83.edu'),
    ('Houston School 84', 'Illinois', 'Houston', '84 Main St', 'www.school84.edu'),
    ('San Francisco School 85', 'Illinois', 'San Francisco', '85 Main St', 'www.school85.edu'),
    ('New York City School 86', 'California', 'New York City', '86 Main St', 'www.school86.edu'),
    ('San Francisco School 87', 'California', 'San Francisco', '87 Main St', 'www.school87.edu'),
    ('Houston School 88', 'New York', 'Houston', '88 Main St', 'www.school88.edu'),
    ('Houston School 89', 'Texas', 'Houston', '89 Main St', 'www.school89.edu'),
    ('San Francisco School 90', 'Illinois', 'San Francisco', '90 Main St', 'www.school90.edu'),
    ('Chicago School 91', 'California', 'Chicago', '91 Main St', 'www.school91.edu'),
    ('Miami School 92', 'Florida', 'Miami', '92 Main St', 'www.school92.edu'),
    ('San Francisco School 93', 'Florida', 'San Francisco', '93 Main St', 'www.school93.edu'),
    ('Miami School 94', 'Illinois', 'Miami', '94 Main St', 'www.school94.edu'),
    ('New York City School 95', 'Florida', 'New York City', '95 Main St', 'www.school95.edu'),
    ('San Francisco School 96', 'Illinois', 'San Francisco', '96 Main St', 'www.school96.edu'),
    ('Miami School 97', 'Illinois', 'Miami', '97 Main St', 'www.school97.edu'),
    ('San Francisco School 98', 'California', 'San Francisco', '98 Main St', 'www.school98.edu'),
    ('Dallas School 99', 'New York', 'Dallas', '99 Main St', 'www.school99.edu'),
    ('Dallas School 100', 'California', 'Dallas', '100 Main St', 'www.school100.edu')
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
    SELECT stat_id, 39, 10, 13, 6, 0, 6, 85.02
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Basketball') ON CONFLICT DO NOTHING;


    INSERT INTO baseball_stats (stat_id, at_bats, hits, runs, rbi, stolen_bases, home_runs, batting_average)
    SELECT stat_id, 137, 76, 56, 18, 14, 16, 0.162
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Baseball') ON CONFLICT DO NOTHING;


    INSERT INTO football_stats (stat_id, touchdowns, rushing_yards, passing_yards, tackles, sacks, interceptions, field_goals)
    SELECT stat_id, 2, 199, 59, 1, 3, 0, 1
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Football') ON CONFLICT DO NOTHING;


    INSERT INTO soccer_stats (stat_id, goals, assists, shots_on_goal, saves, yellow_cards, red_cards, clean_sheets)
    SELECT stat_id, 23, 3, 45, 15, 2, 2, 15
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Soccer') ON CONFLICT DO NOTHING;


    INSERT INTO volleyball_stats (stat_id, kills, blocks, digs, aces, assists, service_errors, hitting_percentage)
    SELECT stat_id, 26, 15, 15, 2, 15, 9, 0.184
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Volleyball') ON CONFLICT DO NOTHING;


    INSERT INTO tennis_stats (stat_id, aces, double_faults, first_serve_percentage, break_points_saved, winners, unforced_errors)
    SELECT stat_id, 2, 3, 44.8, 7, 42, 11
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
      553.64, 
      7, 
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
      54.99, 
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
      8, 
      (random() > 0.8)
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Swimming') ON CONFLICT DO NOTHING;


    INSERT INTO wrestling_stats (stat_id, weight_class, wins, losses, pins, technical_falls, major_decisions)
    SELECT stat_id, concat(279, ' lbs'), 12, 3, 7, 5, 13
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Wrestling') ON CONFLICT DO NOTHING;


    INSERT INTO golf_stats (stat_id, score, par, fairways_hit, greens_in_regulation, putts, eagles, birdies)
    SELECT stat_id, 76, 72, 8, 9, 27, 1, 5
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Golf') ON CONFLICT DO NOTHING;


    INSERT INTO softball_stats (stat_id, at_bats, hits, runs, rbi, stolen_bases, batting_average, fielding_percentage)
    SELECT stat_id, 28, 146, 47, 23, 13, 0.429, 0.984
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Softball') ON CONFLICT DO NOTHING;


    INSERT INTO lacrosse_stats (stat_id, goals, assists, ground_balls, saves, face_offs_won, shots_on_goal)
    SELECT stat_id, 25, 5, 79, 60, 129, 96
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Lacrosse') ON CONFLICT DO NOTHING;


    INSERT INTO field_hockey_stats (stat_id, goals, assists, shots_on_goal, saves, defensive_saves, penalty_corners)
    SELECT stat_id, 22, 13, 3, 91, 11, 3
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Field Hockey') ON CONFLICT DO NOTHING;


    INSERT INTO cross_country_stats (stat_id, distance, finish_time, place, personal_best, course_name)
    SELECT stat_id, 
      CASE floor(random() * 3 + 1)
        WHEN 1 THEN 5000
        WHEN 2 THEN 8000
        WHEN 3 THEN 10000
      END,
      1790.77, 
      31, 
      (random() > 0.8), 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'City Park'
        WHEN 2 THEN 'Forest Trail'
        WHEN 3 THEN 'Highland Course'
        WHEN 4 THEN 'Valley Route'
      END
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Cross Country') ON CONFLICT DO NOTHING;


    INSERT INTO hockey_stats (stat_id, goals, assists, shots_on_goal, saves, penalties_in_minutes, plus_minus)
    SELECT stat_id, 5, 37, 12, 671, 68, 16
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Hockey') ON CONFLICT DO NOTHING;


    INSERT INTO ultimate_frisbee_stats (stat_id, goals, assists, completions, drops, defensive_plays, turnovers)
    SELECT stat_id, 1, 17, 125, 18, 4, 0
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Ultimate Frisbee') ON CONFLICT DO NOTHING;


    INSERT INTO gymnastics_stats (stat_id, event_name, difficulty_score, execution_score, final_score, place)
    SELECT stat_id, 
      CASE floor(random() * 4 + 1)
        WHEN 1 THEN 'Floor Exercise'
        WHEN 2 THEN 'Balance Beam'
        WHEN 3 THEN 'Uneven Bars'
        WHEN 4 THEN 'Vault'
      END,
      6.1, 
      7.86, 
      14.09, 
      5
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Gymnastics') ON CONFLICT DO NOTHING;


    INSERT INTO rugby_stats (stat_id, tries, conversions, penalty_goals, tackles, meters_gained, lineouts_won)
    SELECT stat_id, 12, 1, 2, 14, 135, 9
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Rugby') ON CONFLICT DO NOTHING;


    INSERT INTO water_polo_stats (stat_id, goals, assists, steals, blocks, saves, turnovers)
    SELECT stat_id, 4, 0, 9, 1, 22, 17
    FROM player_stats WHERE sport_id = (SELECT sport_id FROM sports WHERE sport_name = 'Water Polo') ON CONFLICT DO NOTHING;


    INSERT INTO cheerleading_stats (stat_id, routine_difficulty, execution_score, total_score, deductions, place)
    SELECT stat_id, 3.14, 7.28, 12.06, 1, 6
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

INSERT INTO events (event_name, event_date, location, description, sport_id) VALUES
('Tournament 1', '2024-09-29T13:28:09', 'Sports Complex', 'Description for event 1', 20),
('Tournament 2', '2024-08-07T05:13:36', 'City Arena', 'Description for event 2', 14),
('Tournament 3', '2023-11-25T18:06:02', 'Main Stadium', 'Description for event 3', 6),
('Tournament 4', '2023-09-04T20:09:55', 'Memorial Field', 'Description for event 4', 17),
('Tournament 5', '2023-10-20T02:54:33', 'Memorial Field', 'Description for event 5', 16),
('Tournament 6', '2023-01-12T11:50:39', 'Main Stadium', 'Description for event 6', 18),
('Tournament 7', '2024-11-22T06:23:14', 'Sports Complex', 'Description for event 7', 2),
('Tournament 8', '2024-10-08T13:25:50', 'City Arena', 'Description for event 8', 6),
('Tournament 9', '2023-09-01T01:22:47', 'Memorial Field', 'Description for event 9', 5),
('Tournament 10', '2023-09-22T00:17:40', 'Memorial Field', 'Description for event 10', 12),
('Tournament 11', '2024-10-17T13:24:53', 'City Arena', 'Description for event 11', 6),
('Tournament 12', '2024-08-02T08:43:24', 'Memorial Field', 'Description for event 12', 13),
('Tournament 13', '2024-04-07T06:39:49', 'Main Stadium', 'Description for event 13', 20),
('Tournament 14', '2024-09-12T13:25:38', 'Main Stadium', 'Description for event 14', 18),
('Tournament 15', '2024-12-30T11:36:10', 'University Stadium', 'Description for event 15', 8),
('Tournament 16', '2023-02-28T22:33:18', 'Sports Complex', 'Description for event 16', 15),
('Tournament 17', '2023-02-10T02:59:54', 'University Stadium', 'Description for event 17', 11),
('Tournament 18', '2023-10-13T15:33:50', 'Sports Complex', 'Description for event 18', 15),
('Tournament 19', '2024-02-12T19:48:46', 'Memorial Field', 'Description for event 19', 19),
('Tournament 20', '2023-11-01T10:28:35', 'Sports Complex', 'Description for event 20', 1),
('Tournament 21', '2023-03-01T09:07:44', 'University Stadium', 'Description for event 21', 15),
('Tournament 22', '2024-12-26T03:09:57', 'City Arena', 'Description for event 22', 19),
('Tournament 23', '2024-08-31T07:05:07', 'University Stadium', 'Description for event 23', 19),
('Tournament 24', '2023-10-05T18:21:40', 'Memorial Field', 'Description for event 24', 7),
('Tournament 25', '2023-07-07T08:02:45', 'Main Stadium', 'Description for event 25', 14),
('Tournament 26', '2024-03-08T23:18:34', 'Memorial Field', 'Description for event 26', 20),
('Tournament 27', '2023-06-20T18:47:37', 'Main Stadium', 'Description for event 27', 17),
('Tournament 28', '2024-03-09T03:08:30', 'City Arena', 'Description for event 28', 3),
('Tournament 29', '2024-09-13T04:07:46', 'Memorial Field', 'Description for event 29', 19),
('Tournament 30', '2024-02-02T11:20:50', 'Sports Complex', 'Description for event 30', 7),
('Tournament 31', '2024-03-16T12:31:09', 'University Stadium', 'Description for event 31', 20),
('Tournament 32', '2024-03-20T07:23:35', 'City Arena', 'Description for event 32', 19),
('Tournament 33', '2024-09-18T20:27:53', 'Memorial Field', 'Description for event 33', 8),
('Tournament 34', '2024-03-10T21:16:40', 'Memorial Field', 'Description for event 34', 12),
('Tournament 35', '2024-04-14T20:09:39', 'University Stadium', 'Description for event 35', 5),
('Tournament 36', '2023-02-08T18:22:48', 'City Arena', 'Description for event 36', 15),
('Tournament 37', '2024-02-29T07:36:15', 'Sports Complex', 'Description for event 37', 12),
('Tournament 38', '2024-12-13T15:02:50', 'Main Stadium', 'Description for event 38', 15),
('Tournament 39', '2024-08-17T10:24:53', 'City Arena', 'Description for event 39', 18),
('Tournament 40', '2023-01-24T20:29:51', 'Sports Complex', 'Description for event 40', 11),
('Tournament 41', '2023-03-19T14:31:59', 'Memorial Field', 'Description for event 41', 19),
('Tournament 42', '2024-02-12T08:20:58', 'Memorial Field', 'Description for event 42', 17),
('Tournament 43', '2024-03-23T07:51:33', 'Memorial Field', 'Description for event 43', 3),
('Tournament 44', '2024-06-29T21:41:39', 'City Arena', 'Description for event 44', 2),
('Tournament 45', '2024-03-04T01:07:50', 'University Stadium', 'Description for event 45', 16),
('Tournament 46', '2023-01-20T00:09:13', 'City Arena', 'Description for event 46', 9),
('Tournament 47', '2024-10-22T20:12:44', 'University Stadium', 'Description for event 47', 11),
('Tournament 48', '2023-10-11T19:57:52', 'Memorial Field', 'Description for event 48', 11),
('Tournament 49', '2023-03-22T17:54:34', 'University Stadium', 'Description for event 49', 7),
('Tournament 50', '2023-01-12T05:30:37', 'Main Stadium', 'Description for event 50', 1),
('Tournament 51', '2024-06-14T02:30:40', 'Main Stadium', 'Description for event 51', 4),
('Tournament 52', '2024-09-08T18:11:14', 'Memorial Field', 'Description for event 52', 3),
('Tournament 53', '2024-06-04T08:32:05', 'City Arena', 'Description for event 53', 13),
('Tournament 54', '2024-01-03T21:08:30', 'Main Stadium', 'Description for event 54', 13),
('Tournament 55', '2024-01-20T10:55:14', 'City Arena', 'Description for event 55', 11),
('Tournament 56', '2024-11-17T12:50:16', 'University Stadium', 'Description for event 56', 3),
('Tournament 57', '2024-05-27T05:09:00', 'City Arena', 'Description for event 57', 2),
('Tournament 58', '2023-09-10T13:35:55', 'Main Stadium', 'Description for event 58', 20),
('Tournament 59', '2023-08-13T23:23:37', 'Memorial Field', 'Description for event 59', 8),
('Tournament 60', '2023-03-23T08:25:45', 'Main Stadium', 'Description for event 60', 13),
('Tournament 61', '2023-07-28T04:52:27', 'Memorial Field', 'Description for event 61', 8),
('Tournament 62', '2024-12-29T06:05:08', 'Main Stadium', 'Description for event 62', 14),
('Tournament 63', '2024-07-21T16:39:31', 'University Stadium', 'Description for event 63', 13),
('Tournament 64', '2024-04-19T06:07:43', 'University Stadium', 'Description for event 64', 6),
('Tournament 65', '2024-07-16T09:54:06', 'City Arena', 'Description for event 65', 14),
('Tournament 66', '2024-09-12T07:37:43', 'Sports Complex', 'Description for event 66', 6),
('Tournament 67', '2024-02-16T10:40:56', 'City Arena', 'Description for event 67', 14),
('Tournament 68', '2024-06-29T11:10:17', 'Main Stadium', 'Description for event 68', 6),
('Tournament 69', '2023-11-19T12:33:33', 'Main Stadium', 'Description for event 69', 15),
('Tournament 70', '2023-07-16T20:31:42', 'University Stadium', 'Description for event 70', 6),
('Tournament 71', '2024-01-14T13:21:16', 'Memorial Field', 'Description for event 71', 7),
('Tournament 72', '2023-10-05T23:41:42', 'Sports Complex', 'Description for event 72', 19),
('Tournament 73', '2024-01-04T23:52:06', 'Main Stadium', 'Description for event 73', 7),
('Tournament 74', '2023-05-02T15:05:06', 'City Arena', 'Description for event 74', 2),
('Tournament 75', '2023-06-16T02:38:23', 'Memorial Field', 'Description for event 75', 20),
('Tournament 76', '2024-03-29T07:17:41', 'Sports Complex', 'Description for event 76', 13),
('Tournament 77', '2023-12-17T01:31:53', 'Memorial Field', 'Description for event 77', 6),
('Tournament 78', '2024-10-14T19:10:25', 'Memorial Field', 'Description for event 78', 5),
('Tournament 79', '2024-07-08T07:28:47', 'Sports Complex', 'Description for event 79', 19),
('Tournament 80', '2023-03-10T17:47:08', 'Memorial Field', 'Description for event 80', 14),
('Tournament 81', '2024-07-16T10:04:55', 'Main Stadium', 'Description for event 81', 14),
('Tournament 82', '2023-12-12T15:26:21', 'Memorial Field', 'Description for event 82', 6),
('Tournament 83', '2023-01-02T13:02:50', 'Main Stadium', 'Description for event 83', 7),
('Tournament 84', '2024-03-06T08:01:54', 'Sports Complex', 'Description for event 84', 6),
('Tournament 85', '2024-03-04T09:51:09', 'University Stadium', 'Description for event 85', 13),
('Tournament 86', '2023-11-13T16:58:52', 'Main Stadium', 'Description for event 86', 16),
('Tournament 87', '2024-02-21T18:50:32', 'Memorial Field', 'Description for event 87', 9),
('Tournament 88', '2023-09-17T22:56:16', 'Memorial Field', 'Description for event 88', 4),
('Tournament 89', '2024-11-13T04:19:15', 'Memorial Field', 'Description for event 89', 9),
('Tournament 90', '2024-01-28T16:54:09', 'University Stadium', 'Description for event 90', 18),
('Tournament 91', '2024-08-24T20:34:33', 'Main Stadium', 'Description for event 91', 12),
('Tournament 92', '2023-06-17T06:52:01', 'Memorial Field', 'Description for event 92', 4),
('Tournament 93', '2023-05-30T05:51:20', 'Sports Complex', 'Description for event 93', 1),
('Tournament 94', '2023-12-17T10:13:27', 'Sports Complex', 'Description for event 94', 11),
('Tournament 95', '2024-11-19T04:05:01', 'Memorial Field', 'Description for event 95', 6),
('Tournament 96', '2023-01-27T06:37:56', 'Main Stadium', 'Description for event 96', 18),
('Tournament 97', '2024-02-17T02:09:51', 'Memorial Field', 'Description for event 97', 14),
('Tournament 98', '2024-04-22T23:14:50', 'Sports Complex', 'Description for event 98', 13),
('Tournament 99', '2023-12-10T10:32:00', 'Memorial Field', 'Description for event 99', 18),
('Tournament 100', '2024-05-08T16:42:08', 'City Arena', 'Description for event 100', 8),
('Tournament 101', '2023-10-02T20:41:10', 'University Stadium', 'Description for event 101', 20),
('Tournament 102', '2023-09-01T23:50:49', 'University Stadium', 'Description for event 102', 15),
('Tournament 103', '2023-05-19T16:41:16', 'University Stadium', 'Description for event 103', 3),
('Tournament 104', '2024-03-03T14:39:13', 'University Stadium', 'Description for event 104', 5),
('Tournament 105', '2024-09-27T10:49:42', 'Sports Complex', 'Description for event 105', 20),
('Tournament 106', '2024-08-21T08:36:18', 'Memorial Field', 'Description for event 106', 13),
('Tournament 107', '2024-09-18T14:22:26', 'Main Stadium', 'Description for event 107', 3),
('Tournament 108', '2024-08-15T00:06:30', 'City Arena', 'Description for event 108', 3),
('Tournament 109', '2023-06-03T08:43:04', 'Sports Complex', 'Description for event 109', 9),
('Tournament 110', '2023-04-21T04:15:35', 'Sports Complex', 'Description for event 110', 7),
('Tournament 111', '2023-12-03T01:48:26', 'Memorial Field', 'Description for event 111', 11),
('Tournament 112', '2024-04-02T23:55:03', 'City Arena', 'Description for event 112', 3),
('Tournament 113', '2024-08-01T18:47:59', 'City Arena', 'Description for event 113', 19),
('Tournament 114', '2023-09-28T23:32:59', 'Memorial Field', 'Description for event 114', 13),
('Tournament 115', '2023-12-16T18:34:38', 'City Arena', 'Description for event 115', 19),
('Tournament 116', '2024-10-17T19:31:43', 'City Arena', 'Description for event 116', 11),
('Tournament 117', '2024-06-14T21:32:00', 'University Stadium', 'Description for event 117', 19),
('Tournament 118', '2024-02-11T08:51:10', 'Main Stadium', 'Description for event 118', 8),
('Tournament 119', '2023-05-24T10:16:20', 'Main Stadium', 'Description for event 119', 9),
('Tournament 120', '2023-09-25T16:10:39', 'Memorial Field', 'Description for event 120', 13),
('Tournament 121', '2023-09-23T05:42:41', 'University Stadium', 'Description for event 121', 20),
('Tournament 122', '2024-06-15T04:20:44', 'Main Stadium', 'Description for event 122', 15),
('Tournament 123', '2024-05-06T14:02:34', 'University Stadium', 'Description for event 123', 4),
('Tournament 124', '2024-07-31T00:30:06', 'Memorial Field', 'Description for event 124', 13),
('Tournament 125', '2023-06-13T08:34:07', 'Memorial Field', 'Description for event 125', 18),
('Tournament 126', '2023-04-24T15:45:59', 'City Arena', 'Description for event 126', 5),
('Tournament 127', '2023-02-06T22:56:07', 'City Arena', 'Description for event 127', 5),
('Tournament 128', '2023-12-15T20:24:24', 'Sports Complex', 'Description for event 128', 11),
('Tournament 129', '2023-03-22T15:41:23', 'Sports Complex', 'Description for event 129', 14),
('Tournament 130', '2024-07-16T16:18:35', 'University Stadium', 'Description for event 130', 3),
('Tournament 131', '2024-09-26T18:09:31', 'University Stadium', 'Description for event 131', 5),
('Tournament 132', '2023-08-31T13:38:48', 'Memorial Field', 'Description for event 132', 17),
('Tournament 133', '2024-02-16T08:14:57', 'Main Stadium', 'Description for event 133', 14),
('Tournament 134', '2023-02-20T21:19:03', 'Sports Complex', 'Description for event 134', 9),
('Tournament 135', '2023-02-20T06:46:22', 'City Arena', 'Description for event 135', 12),
('Tournament 136', '2024-10-22T04:51:46', 'University Stadium', 'Description for event 136', 4),
('Tournament 137', '2023-11-06T15:40:06', 'Sports Complex', 'Description for event 137', 6),
('Tournament 138', '2024-12-01T22:35:24', 'Sports Complex', 'Description for event 138', 6),
('Tournament 139', '2023-12-19T22:30:51', 'Sports Complex', 'Description for event 139', 11),
('Tournament 140', '2024-05-19T08:18:29', 'Memorial Field', 'Description for event 140', 16),
('Tournament 141', '2024-05-04T10:03:02', 'Main Stadium', 'Description for event 141', 20),
('Tournament 142', '2023-02-16T03:05:39', 'University Stadium', 'Description for event 142', 7),
('Tournament 143', '2024-10-10T07:30:42', 'University Stadium', 'Description for event 143', 11),
('Tournament 144', '2024-05-24T17:59:51', 'Sports Complex', 'Description for event 144', 11),
('Tournament 145', '2023-12-08T01:43:40', 'Main Stadium', 'Description for event 145', 18),
('Tournament 146', '2024-03-02T16:13:41', 'Main Stadium', 'Description for event 146', 8),
('Tournament 147', '2024-11-30T05:18:27', 'Main Stadium', 'Description for event 147', 4),
('Tournament 148', '2023-05-25T21:01:30', 'Main Stadium', 'Description for event 148', 17),
('Tournament 149', '2024-05-30T21:20:07', 'City Arena', 'Description for event 149', 16),
('Tournament 150', '2024-03-28T05:47:40', 'University Stadium', 'Description for event 150', 18),
('Tournament 151', '2024-07-13T01:17:15', 'University Stadium', 'Description for event 151', 16),
('Tournament 152', '2023-12-21T15:34:16', 'City Arena', 'Description for event 152', 17),
('Tournament 153', '2024-04-07T10:33:40', 'Memorial Field', 'Description for event 153', 9),
('Tournament 154', '2023-02-01T11:21:31', 'University Stadium', 'Description for event 154', 16),
('Tournament 155', '2023-01-06T02:38:12', 'University Stadium', 'Description for event 155', 10),
('Tournament 156', '2023-06-14T19:09:40', 'Main Stadium', 'Description for event 156', 8),
('Tournament 157', '2023-08-10T00:51:54', 'University Stadium', 'Description for event 157', 14),
('Tournament 158', '2024-02-07T21:17:53', 'University Stadium', 'Description for event 158', 20),
('Tournament 159', '2024-10-28T09:04:43', 'Sports Complex', 'Description for event 159', 18),
('Tournament 160', '2023-06-06T21:03:21', 'Main Stadium', 'Description for event 160', 12),
('Tournament 161', '2023-09-01T00:02:14', 'Memorial Field', 'Description for event 161', 11),
('Tournament 162', '2024-07-21T04:06:58', 'City Arena', 'Description for event 162', 12),
('Tournament 163', '2024-09-04T04:59:01', 'Main Stadium', 'Description for event 163', 15),
('Tournament 164', '2023-07-12T03:01:16', 'Sports Complex', 'Description for event 164', 4),
('Tournament 165', '2024-09-17T06:19:00', 'University Stadium', 'Description for event 165', 17),
('Tournament 166', '2024-09-22T02:36:53', 'Main Stadium', 'Description for event 166', 8),
('Tournament 167', '2024-02-29T23:22:08', 'University Stadium', 'Description for event 167', 20),
('Tournament 168', '2023-01-31T05:01:44', 'Sports Complex', 'Description for event 168', 10),
('Tournament 169', '2024-11-26T20:51:50', 'City Arena', 'Description for event 169', 6),
('Tournament 170', '2023-10-19T09:11:53', 'Sports Complex', 'Description for event 170', 3),
('Tournament 171', '2024-11-06T22:28:49', 'City Arena', 'Description for event 171', 7),
('Tournament 172', '2023-07-22T00:48:52', 'City Arena', 'Description for event 172', 20),
('Tournament 173', '2024-09-26T13:23:05', 'Memorial Field', 'Description for event 173', 8),
('Tournament 174', '2024-11-25T18:52:10', 'Main Stadium', 'Description for event 174', 20),
('Tournament 175', '2024-06-14T02:01:24', 'University Stadium', 'Description for event 175', 8),
('Tournament 176', '2024-12-26T07:12:22', 'City Arena', 'Description for event 176', 13),
('Tournament 177', '2023-07-28T02:55:58', 'Main Stadium', 'Description for event 177', 15),
('Tournament 178', '2024-01-26T03:36:25', 'City Arena', 'Description for event 178', 1),
('Tournament 179', '2024-01-21T12:47:49', 'University Stadium', 'Description for event 179', 6),
('Tournament 180', '2024-06-22T20:34:35', 'University Stadium', 'Description for event 180', 7),
('Tournament 181', '2023-03-26T01:56:03', 'Memorial Field', 'Description for event 181', 6),
('Tournament 182', '2023-03-08T11:38:41', 'Main Stadium', 'Description for event 182', 13),
('Tournament 183', '2024-01-02T14:11:21', 'Sports Complex', 'Description for event 183', 16),
('Tournament 184', '2024-06-27T20:37:40', 'City Arena', 'Description for event 184', 5),
('Tournament 185', '2023-05-10T11:11:12', 'University Stadium', 'Description for event 185', 8),
('Tournament 186', '2024-01-17T06:56:48', 'University Stadium', 'Description for event 186', 10),
('Tournament 187', '2024-09-06T03:29:27', 'Memorial Field', 'Description for event 187', 6),
('Tournament 188', '2023-08-16T21:13:42', 'Main Stadium', 'Description for event 188', 18),
('Tournament 189', '2024-11-16T01:41:15', 'University Stadium', 'Description for event 189', 5),
('Tournament 190', '2023-11-05T20:02:52', 'Main Stadium', 'Description for event 190', 10),
('Tournament 191', '2023-06-20T17:28:44', 'University Stadium', 'Description for event 191', 15),
('Tournament 192', '2024-04-02T11:18:10', 'City Arena', 'Description for event 192', 9),
('Tournament 193', '2024-02-22T20:03:44', 'City Arena', 'Description for event 193', 9),
('Tournament 194', '2024-11-14T07:48:28', 'Main Stadium', 'Description for event 194', 20),
('Tournament 195', '2024-03-17T02:53:45', 'Memorial Field', 'Description for event 195', 10),
('Tournament 196', '2024-09-04T11:55:38', 'Sports Complex', 'Description for event 196', 19),
('Tournament 197', '2023-10-05T11:56:12', 'Sports Complex', 'Description for event 197', 17),
('Tournament 198', '2023-06-24T00:01:49', 'Main Stadium', 'Description for event 198', 5),
('Tournament 199', '2023-08-10T22:18:43', 'Sports Complex', 'Description for event 199', 18),
('Tournament 200', '2024-10-12T05:19:50', 'City Arena', 'Description for event 200', 6),
('Tournament 201', '2023-12-15T01:57:25', 'Sports Complex', 'Description for event 201', 18),
('Tournament 202', '2023-06-19T09:11:52', 'Memorial Field', 'Description for event 202', 16),
('Tournament 203', '2023-09-04T10:15:54', 'Main Stadium', 'Description for event 203', 11),
('Tournament 204', '2023-06-11T20:17:36', 'Main Stadium', 'Description for event 204', 18),
('Tournament 205', '2023-06-11T08:09:19', 'City Arena', 'Description for event 205', 14),
('Tournament 206', '2023-04-15T19:50:34', 'City Arena', 'Description for event 206', 13),
('Tournament 207', '2024-05-20T07:13:50', 'City Arena', 'Description for event 207', 20),
('Tournament 208', '2024-10-29T06:03:03', 'City Arena', 'Description for event 208', 14),
('Tournament 209', '2023-06-16T04:52:18', 'City Arena', 'Description for event 209', 10),
('Tournament 210', '2024-09-19T14:38:21', 'Main Stadium', 'Description for event 210', 18),
('Tournament 211', '2023-11-17T04:55:44', 'Memorial Field', 'Description for event 211', 18),
('Tournament 212', '2024-02-22T02:48:41', 'Memorial Field', 'Description for event 212', 19),
('Tournament 213', '2023-08-07T12:26:52', 'Sports Complex', 'Description for event 213', 5),
('Tournament 214', '2023-12-11T03:03:16', 'Sports Complex', 'Description for event 214', 5),
('Tournament 215', '2023-10-19T05:57:42', 'Main Stadium', 'Description for event 215', 4),
('Tournament 216', '2024-11-02T21:52:16', 'Memorial Field', 'Description for event 216', 18),
('Tournament 217', '2024-11-07T09:15:12', 'Memorial Field', 'Description for event 217', 5),
('Tournament 218', '2024-10-03T12:22:45', 'University Stadium', 'Description for event 218', 13),
('Tournament 219', '2023-11-15T06:58:12', 'Memorial Field', 'Description for event 219', 6),
('Tournament 220', '2023-10-24T23:38:17', 'City Arena', 'Description for event 220', 5),
('Tournament 221', '2023-03-16T13:22:04', 'City Arena', 'Description for event 221', 20),
('Tournament 222', '2024-06-29T21:49:42', 'Main Stadium', 'Description for event 222', 19),
('Tournament 223', '2024-08-27T21:41:52', 'Sports Complex', 'Description for event 223', 13),
('Tournament 224', '2023-06-20T15:54:05', 'City Arena', 'Description for event 224', 15),
('Tournament 225', '2024-03-29T00:20:01', 'City Arena', 'Description for event 225', 7),
('Tournament 226', '2024-08-09T03:18:51', 'Main Stadium', 'Description for event 226', 3),
('Tournament 227', '2024-01-23T08:27:17', 'Main Stadium', 'Description for event 227', 5),
('Tournament 228', '2023-04-15T15:03:43', 'Memorial Field', 'Description for event 228', 16),
('Tournament 229', '2023-07-12T02:32:01', 'Memorial Field', 'Description for event 229', 11),
('Tournament 230', '2024-10-10T22:38:22', 'Main Stadium', 'Description for event 230', 1),
('Tournament 231', '2024-01-13T03:36:10', 'University Stadium', 'Description for event 231', 14),
('Tournament 232', '2023-04-22T09:45:53', 'Memorial Field', 'Description for event 232', 2),
('Tournament 233', '2023-04-17T09:13:29', 'Main Stadium', 'Description for event 233', 19),
('Tournament 234', '2024-01-02T21:39:53', 'University Stadium', 'Description for event 234', 1),
('Tournament 235', '2024-08-30T03:44:58', 'Sports Complex', 'Description for event 235', 18),
('Tournament 236', '2023-11-02T22:30:29', 'Sports Complex', 'Description for event 236', 1),
('Tournament 237', '2023-06-02T20:35:41', 'Main Stadium', 'Description for event 237', 17),
('Tournament 238', '2023-07-25T10:08:05', 'City Arena', 'Description for event 238', 11),
('Tournament 239', '2023-10-14T01:37:45', 'Main Stadium', 'Description for event 239', 13),
('Tournament 240', '2023-01-26T14:17:31', 'Sports Complex', 'Description for event 240', 10),
('Tournament 241', '2023-10-08T06:57:39', 'Memorial Field', 'Description for event 241', 20),
('Tournament 242', '2023-05-16T12:59:52', 'Memorial Field', 'Description for event 242', 17),
('Tournament 243', '2024-12-09T00:04:08', 'Sports Complex', 'Description for event 243', 5),
('Tournament 244', '2023-03-02T21:24:52', 'University Stadium', 'Description for event 244', 4),
('Tournament 245', '2023-04-20T11:15:45', 'City Arena', 'Description for event 245', 11),
('Tournament 246', '2024-11-07T22:50:43', 'Sports Complex', 'Description for event 246', 19),
('Tournament 247', '2024-11-24T15:07:01', 'University Stadium', 'Description for event 247', 5),
('Tournament 248', '2023-07-14T14:40:53', 'Memorial Field', 'Description for event 248', 4),
('Tournament 249', '2023-01-16T04:24:09', 'Main Stadium', 'Description for event 249', 13),
('Tournament 250', '2024-03-15T02:43:55', 'University Stadium', 'Description for event 250', 6),
('Tournament 251', '2023-06-14T20:36:51', 'Memorial Field', 'Description for event 251', 14),
('Tournament 252', '2024-06-18T18:20:04', 'Memorial Field', 'Description for event 252', 17),
('Tournament 253', '2024-09-07T20:51:38', 'Sports Complex', 'Description for event 253', 13),
('Tournament 254', '2024-03-09T16:35:07', 'Sports Complex', 'Description for event 254', 2),
('Tournament 255', '2023-01-22T12:12:08', 'Sports Complex', 'Description for event 255', 17),
('Tournament 256', '2023-10-24T04:12:39', 'University Stadium', 'Description for event 256', 19),
('Tournament 257', '2024-06-14T17:02:18', 'City Arena', 'Description for event 257', 13),
('Tournament 258', '2024-02-14T06:03:17', 'Memorial Field', 'Description for event 258', 16),
('Tournament 259', '2023-01-05T15:24:53', 'Main Stadium', 'Description for event 259', 1),
('Tournament 260', '2023-08-01T08:22:29', 'Sports Complex', 'Description for event 260', 13),
('Tournament 261', '2023-12-13T14:31:50', 'Memorial Field', 'Description for event 261', 8),
('Tournament 262', '2024-06-01T19:10:27', 'City Arena', 'Description for event 262', 10),
('Tournament 263', '2023-08-02T23:54:12', 'Memorial Field', 'Description for event 263', 3),
('Tournament 264', '2023-11-02T20:00:46', 'Memorial Field', 'Description for event 264', 6),
('Tournament 265', '2024-12-11T01:21:10', 'Sports Complex', 'Description for event 265', 7),
('Tournament 266', '2023-09-03T22:20:17', 'Sports Complex', 'Description for event 266', 5),
('Tournament 267', '2023-12-28T08:35:21', 'Memorial Field', 'Description for event 267', 3),
('Tournament 268', '2024-10-02T02:55:27', 'City Arena', 'Description for event 268', 6),
('Tournament 269', '2024-02-28T03:47:54', 'Sports Complex', 'Description for event 269', 2),
('Tournament 270', '2023-10-02T18:39:58', 'Memorial Field', 'Description for event 270', 17),
('Tournament 271', '2024-02-16T15:22:44', 'Main Stadium', 'Description for event 271', 5),
('Tournament 272', '2024-09-08T16:35:01', 'University Stadium', 'Description for event 272', 15),
('Tournament 273', '2023-01-09T09:19:20', 'University Stadium', 'Description for event 273', 13),
('Tournament 274', '2024-01-08T05:27:57', 'City Arena', 'Description for event 274', 5),
('Tournament 275', '2024-08-01T11:48:19', 'Memorial Field', 'Description for event 275', 3),
('Tournament 276', '2023-01-02T05:42:46', 'Sports Complex', 'Description for event 276', 15),
('Tournament 277', '2024-07-02T23:41:22', 'Sports Complex', 'Description for event 277', 12),
('Tournament 278', '2024-01-17T09:18:44', 'City Arena', 'Description for event 278', 14),
('Tournament 279', '2023-04-11T10:45:09', 'University Stadium', 'Description for event 279', 5),
('Tournament 280', '2024-04-05T00:00:30', 'City Arena', 'Description for event 280', 3),
('Tournament 281', '2024-12-19T07:33:07', 'Sports Complex', 'Description for event 281', 17),
('Tournament 282', '2023-10-26T12:37:54', 'Sports Complex', 'Description for event 282', 15),
('Tournament 283', '2024-04-18T18:25:02', 'University Stadium', 'Description for event 283', 17),
('Tournament 284', '2023-11-26T23:04:03', 'Main Stadium', 'Description for event 284', 7),
('Tournament 285', '2024-06-25T13:02:19', 'University Stadium', 'Description for event 285', 15),
('Tournament 286', '2024-08-05T17:49:09', 'Sports Complex', 'Description for event 286', 7),
('Tournament 287', '2023-09-17T20:29:36', 'City Arena', 'Description for event 287', 7),
('Tournament 288', '2024-08-22T11:23:40', 'University Stadium', 'Description for event 288', 18),
('Tournament 289', '2023-12-27T07:47:45', 'Main Stadium', 'Description for event 289', 3),
('Tournament 290', '2023-05-12T12:51:05', 'University Stadium', 'Description for event 290', 20),
('Tournament 291', '2024-10-02T05:49:55', 'University Stadium', 'Description for event 291', 10),
('Tournament 292', '2024-11-28T05:10:18', 'Sports Complex', 'Description for event 292', 19),
('Tournament 293', '2024-02-29T21:43:49', 'University Stadium', 'Description for event 293', 8),
('Tournament 294', '2024-02-05T11:23:27', 'City Arena', 'Description for event 294', 8),
('Tournament 295', '2024-04-21T22:26:11', 'Main Stadium', 'Description for event 295', 1),
('Tournament 296', '2024-11-23T11:13:49', 'Main Stadium', 'Description for event 296', 1),
('Tournament 297', '2024-03-23T10:00:50', 'Memorial Field', 'Description for event 297', 12),
('Tournament 298', '2024-04-23T05:29:46', 'Main Stadium', 'Description for event 298', 11),
('Tournament 299', '2024-02-25T13:29:39', 'Memorial Field', 'Description for event 299', 12),
('Tournament 300', '2024-10-19T19:25:33', 'University Stadium', 'Description for event 300', 9),
('Tournament 301', '2023-10-19T17:38:45', 'Sports Complex', 'Description for event 301', 18),
('Tournament 302', '2023-07-01T22:22:15', 'City Arena', 'Description for event 302', 20),
('Tournament 303', '2024-05-14T01:23:59', 'Sports Complex', 'Description for event 303', 5),
('Tournament 304', '2024-07-17T00:59:04', 'University Stadium', 'Description for event 304', 12),
('Tournament 305', '2023-05-28T01:40:41', 'Sports Complex', 'Description for event 305', 4),
('Tournament 306', '2023-11-04T08:29:46', 'Memorial Field', 'Description for event 306', 3),
('Tournament 307', '2023-05-27T11:24:32', 'Memorial Field', 'Description for event 307', 18),
('Tournament 308', '2023-03-24T15:04:40', 'City Arena', 'Description for event 308', 4),
('Tournament 309', '2023-07-30T00:11:56', 'University Stadium', 'Description for event 309', 17),
('Tournament 310', '2024-01-28T21:23:03', 'Sports Complex', 'Description for event 310', 15),
('Tournament 311', '2023-10-07T07:19:41', 'City Arena', 'Description for event 311', 13),
('Tournament 312', '2024-11-08T17:35:19', 'City Arena', 'Description for event 312', 20),
('Tournament 313', '2023-02-17T09:25:33', 'University Stadium', 'Description for event 313', 7),
('Tournament 314', '2024-07-31T16:51:47', 'Memorial Field', 'Description for event 314', 14),
('Tournament 315', '2024-10-08T22:58:17', 'Memorial Field', 'Description for event 315', 9),
('Tournament 316', '2024-11-18T14:01:30', 'University Stadium', 'Description for event 316', 20),
('Tournament 317', '2024-08-19T15:51:44', 'Sports Complex', 'Description for event 317', 18),
('Tournament 318', '2023-03-16T03:42:51', 'University Stadium', 'Description for event 318', 11),
('Tournament 319', '2023-07-31T01:23:45', 'Sports Complex', 'Description for event 319', 14),
('Tournament 320', '2023-07-29T03:06:50', 'Sports Complex', 'Description for event 320', 3),
('Tournament 321', '2024-03-28T21:54:07', 'Memorial Field', 'Description for event 321', 14),
('Tournament 322', '2023-07-09T18:11:33', 'Sports Complex', 'Description for event 322', 12),
('Tournament 323', '2023-06-29T09:48:29', 'University Stadium', 'Description for event 323', 9),
('Tournament 324', '2024-07-29T07:59:22', 'City Arena', 'Description for event 324', 16),
('Tournament 325', '2024-06-11T22:09:34', 'University Stadium', 'Description for event 325', 17),
('Tournament 326', '2024-11-10T04:26:45', 'Memorial Field', 'Description for event 326', 3),
('Tournament 327', '2023-12-11T00:34:48', 'Sports Complex', 'Description for event 327', 19),
('Tournament 328', '2023-12-13T13:25:35', 'Sports Complex', 'Description for event 328', 4),
('Tournament 329', '2024-01-12T18:53:49', 'Sports Complex', 'Description for event 329', 2),
('Tournament 330', '2024-11-25T09:17:50', 'Main Stadium', 'Description for event 330', 2),
('Tournament 331', '2024-06-26T15:25:34', 'Memorial Field', 'Description for event 331', 5),
('Tournament 332', '2024-07-22T09:20:44', 'Main Stadium', 'Description for event 332', 17),
('Tournament 333', '2023-09-07T19:16:03', 'Sports Complex', 'Description for event 333', 1),
('Tournament 334', '2024-08-27T08:14:47', 'Main Stadium', 'Description for event 334', 9),
('Tournament 335', '2024-10-14T18:47:01', 'Main Stadium', 'Description for event 335', 9),
('Tournament 336', '2024-05-07T00:42:20', 'Sports Complex', 'Description for event 336', 5),
('Tournament 337', '2023-11-09T03:04:57', 'Memorial Field', 'Description for event 337', 14),
('Tournament 338', '2023-10-01T17:51:28', 'Main Stadium', 'Description for event 338', 15),
('Tournament 339', '2023-07-21T09:19:47', 'University Stadium', 'Description for event 339', 14),
('Tournament 340', '2024-08-10T15:38:52', 'Sports Complex', 'Description for event 340', 20),
('Tournament 341', '2023-01-11T06:55:10', 'University Stadium', 'Description for event 341', 12),
('Tournament 342', '2023-04-15T00:54:38', 'Sports Complex', 'Description for event 342', 3),
('Tournament 343', '2024-08-13T20:50:06', 'Main Stadium', 'Description for event 343', 9),
('Tournament 344', '2024-07-19T10:18:51', 'Main Stadium', 'Description for event 344', 19),
('Tournament 345', '2024-02-04T12:00:57', 'Sports Complex', 'Description for event 345', 7),
('Tournament 346', '2023-01-31T08:29:36', 'University Stadium', 'Description for event 346', 19),
('Tournament 347', '2024-02-24T04:46:00', 'Main Stadium', 'Description for event 347', 18),
('Tournament 348', '2023-05-16T11:07:24', 'City Arena', 'Description for event 348', 15),
('Tournament 349', '2024-06-30T01:02:56', 'Memorial Field', 'Description for event 349', 8),
('Tournament 350', '2023-11-26T16:14:10', 'Memorial Field', 'Description for event 350', 14),
('Tournament 351', '2024-12-01T11:41:33', 'University Stadium', 'Description for event 351', 5),
('Tournament 352', '2024-08-08T04:58:48', 'City Arena', 'Description for event 352', 7),
('Tournament 353', '2024-10-18T16:12:23', 'Sports Complex', 'Description for event 353', 1),
('Tournament 354', '2024-09-27T17:20:57', 'Sports Complex', 'Description for event 354', 3),
('Tournament 355', '2023-06-14T19:38:51', 'Memorial Field', 'Description for event 355', 18),
('Tournament 356', '2023-05-29T18:17:52', 'Sports Complex', 'Description for event 356', 5),
('Tournament 357', '2024-06-09T13:09:36', 'Main Stadium', 'Description for event 357', 14),
('Tournament 358', '2024-10-19T08:56:06', 'Sports Complex', 'Description for event 358', 18),
('Tournament 359', '2023-09-01T03:48:28', 'Memorial Field', 'Description for event 359', 11),
('Tournament 360', '2023-11-13T19:43:16', 'University Stadium', 'Description for event 360', 2),
('Tournament 361', '2023-02-02T08:05:44', 'City Arena', 'Description for event 361', 10),
('Tournament 362', '2024-04-23T19:26:30', 'City Arena', 'Description for event 362', 11),
('Tournament 363', '2023-05-08T00:08:58', 'City Arena', 'Description for event 363', 5),
('Tournament 364', '2024-09-21T04:33:56', 'Memorial Field', 'Description for event 364', 3),
('Tournament 365', '2023-09-17T12:32:57', 'Memorial Field', 'Description for event 365', 4),
('Tournament 366', '2023-06-06T22:37:31', 'University Stadium', 'Description for event 366', 15),
('Tournament 367', '2024-10-26T11:10:40', 'Sports Complex', 'Description for event 367', 6),
('Tournament 368', '2023-04-08T02:16:27', 'City Arena', 'Description for event 368', 5),
('Tournament 369', '2023-10-20T18:16:49', 'University Stadium', 'Description for event 369', 6),
('Tournament 370', '2024-05-16T21:22:42', 'Memorial Field', 'Description for event 370', 6),
('Tournament 371', '2024-03-26T08:30:51', 'City Arena', 'Description for event 371', 13),
('Tournament 372', '2024-09-04T08:01:05', 'Main Stadium', 'Description for event 372', 12),
('Tournament 373', '2023-07-13T05:28:43', 'Memorial Field', 'Description for event 373', 12),
('Tournament 374', '2024-03-08T19:27:55', 'Sports Complex', 'Description for event 374', 13),
('Tournament 375', '2024-11-30T00:40:38', 'City Arena', 'Description for event 375', 7),
('Tournament 376', '2024-10-17T21:14:19', 'City Arena', 'Description for event 376', 11),
('Tournament 377', '2024-04-13T23:42:41', 'Sports Complex', 'Description for event 377', 15),
('Tournament 378', '2023-09-21T09:12:20', 'Sports Complex', 'Description for event 378', 17),
('Tournament 379', '2024-04-15T16:14:44', 'Sports Complex', 'Description for event 379', 13),
('Tournament 380', '2023-02-25T22:02:23', 'Sports Complex', 'Description for event 380', 4),
('Tournament 381', '2024-01-25T14:51:34', 'Main Stadium', 'Description for event 381', 4),
('Tournament 382', '2024-06-23T06:45:11', 'University Stadium', 'Description for event 382', 15),
('Tournament 383', '2023-03-12T03:35:37', 'Main Stadium', 'Description for event 383', 17),
('Tournament 384', '2024-11-30T16:49:48', 'Main Stadium', 'Description for event 384', 6),
('Tournament 385', '2023-03-17T23:24:46', 'City Arena', 'Description for event 385', 20),
('Tournament 386', '2024-08-11T13:18:17', 'Sports Complex', 'Description for event 386', 3),
('Tournament 387', '2023-12-20T14:24:10', 'City Arena', 'Description for event 387', 14),
('Tournament 388', '2023-02-07T22:47:34', 'University Stadium', 'Description for event 388', 11),
('Tournament 389', '2023-02-10T22:11:06', 'City Arena', 'Description for event 389', 11),
('Tournament 390', '2024-01-13T22:53:39', 'Memorial Field', 'Description for event 390', 14),
('Tournament 391', '2024-06-11T17:11:30', 'Sports Complex', 'Description for event 391', 10),
('Tournament 392', '2023-07-04T21:45:37', 'City Arena', 'Description for event 392', 19),
('Tournament 393', '2024-10-15T04:41:39', 'Memorial Field', 'Description for event 393', 16),
('Tournament 394', '2024-03-06T22:57:41', 'University Stadium', 'Description for event 394', 14),
('Tournament 395', '2024-10-17T01:18:41', 'Main Stadium', 'Description for event 395', 8),
('Tournament 396', '2024-07-26T10:25:34', 'University Stadium', 'Description for event 396', 11),
('Tournament 397', '2023-01-19T01:53:42', 'Sports Complex', 'Description for event 397', 11),
('Tournament 398', '2023-08-31T03:03:35', 'City Arena', 'Description for event 398', 17),
('Tournament 399', '2023-01-15T02:47:28', 'Main Stadium', 'Description for event 399', 17),
('Tournament 400', '2023-05-17T03:22:06', 'Memorial Field', 'Description for event 400', 11),
('Tournament 401', '2023-03-24T21:53:28', 'Sports Complex', 'Description for event 401', 15),
('Tournament 402', '2023-09-08T05:08:32', 'Memorial Field', 'Description for event 402', 11),
('Tournament 403', '2024-06-04T14:18:48', 'University Stadium', 'Description for event 403', 6),
('Tournament 404', '2023-05-11T20:31:46', 'Sports Complex', 'Description for event 404', 8),
('Tournament 405', '2024-03-12T09:58:34', 'Main Stadium', 'Description for event 405', 6),
('Tournament 406', '2023-08-29T00:56:41', 'University Stadium', 'Description for event 406', 8),
('Tournament 407', '2024-12-04T15:19:30', 'City Arena', 'Description for event 407', 6),
('Tournament 408', '2024-12-28T15:13:15', 'Sports Complex', 'Description for event 408', 15),
('Tournament 409', '2023-04-12T12:55:45', 'Sports Complex', 'Description for event 409', 6),
('Tournament 410', '2024-01-05T19:38:18', 'University Stadium', 'Description for event 410', 13),
('Tournament 411', '2024-12-18T02:18:43', 'City Arena', 'Description for event 411', 9),
('Tournament 412', '2023-03-19T08:22:54', 'Sports Complex', 'Description for event 412', 14),
('Tournament 413', '2024-08-29T00:27:50', 'Sports Complex', 'Description for event 413', 6),
('Tournament 414', '2024-11-13T06:01:20', 'Memorial Field', 'Description for event 414', 12),
('Tournament 415', '2023-06-28T22:13:59', 'Main Stadium', 'Description for event 415', 15),
('Tournament 416', '2023-11-08T17:23:21', 'Sports Complex', 'Description for event 416', 20),
('Tournament 417', '2024-08-26T06:37:12', 'Memorial Field', 'Description for event 417', 17),
('Tournament 418', '2024-02-29T23:12:56', 'City Arena', 'Description for event 418', 5),
('Tournament 419', '2024-05-15T04:38:36', 'Memorial Field', 'Description for event 419', 5),
('Tournament 420', '2023-11-14T12:19:34', 'University Stadium', 'Description for event 420', 12),
('Tournament 421', '2023-02-11T15:05:16', 'City Arena', 'Description for event 421', 6),
('Tournament 422', '2024-04-30T09:23:10', 'University Stadium', 'Description for event 422', 1),
('Tournament 423', '2024-05-15T19:31:39', 'Sports Complex', 'Description for event 423', 5),
('Tournament 424', '2023-01-09T01:57:42', 'Sports Complex', 'Description for event 424', 4),
('Tournament 425', '2024-12-13T15:23:31', 'University Stadium', 'Description for event 425', 6),
('Tournament 426', '2024-04-12T08:20:52', 'Main Stadium', 'Description for event 426', 8),
('Tournament 427', '2024-01-31T03:45:08', 'City Arena', 'Description for event 427', 20),
('Tournament 428', '2023-05-19T11:07:02', 'Sports Complex', 'Description for event 428', 19),
('Tournament 429', '2023-09-23T11:52:51', 'Sports Complex', 'Description for event 429', 4),
('Tournament 430', '2023-09-01T15:56:28', 'City Arena', 'Description for event 430', 1),
('Tournament 431', '2024-05-26T11:13:40', 'University Stadium', 'Description for event 431', 19),
('Tournament 432', '2023-04-06T06:04:50', 'City Arena', 'Description for event 432', 16),
('Tournament 433', '2023-12-02T02:12:26', 'City Arena', 'Description for event 433', 10),
('Tournament 434', '2023-11-10T14:24:08', 'Sports Complex', 'Description for event 434', 5),
('Tournament 435', '2023-07-19T22:58:31', 'Main Stadium', 'Description for event 435', 10),
('Tournament 436', '2023-02-20T16:37:06', 'City Arena', 'Description for event 436', 11),
('Tournament 437', '2023-12-03T13:37:15', 'Memorial Field', 'Description for event 437', 7),
('Tournament 438', '2024-08-28T10:45:20', 'City Arena', 'Description for event 438', 1),
('Tournament 439', '2024-04-29T21:30:32', 'Sports Complex', 'Description for event 439', 8),
('Tournament 440', '2023-01-31T15:08:30', 'City Arena', 'Description for event 440', 4),
('Tournament 441', '2024-10-06T05:21:26', 'City Arena', 'Description for event 441', 8),
('Tournament 442', '2023-03-13T10:42:23', 'Sports Complex', 'Description for event 442', 11),
('Tournament 443', '2024-02-18T05:55:42', 'City Arena', 'Description for event 443', 4),
('Tournament 444', '2023-01-19T08:16:38', 'Memorial Field', 'Description for event 444', 4),
('Tournament 445', '2024-09-23T22:27:03', 'Sports Complex', 'Description for event 445', 20),
('Tournament 446', '2023-11-13T00:10:34', 'Main Stadium', 'Description for event 446', 1),
('Tournament 447', '2024-12-24T15:57:02', 'Memorial Field', 'Description for event 447', 4),
('Tournament 448', '2023-08-01T01:49:18', 'Sports Complex', 'Description for event 448', 10),
('Tournament 449', '2024-12-20T08:46:25', 'Main Stadium', 'Description for event 449', 17),
('Tournament 450', '2024-04-30T02:51:01', 'Memorial Field', 'Description for event 450', 5),
('Tournament 451', '2024-07-30T06:58:00', 'Main Stadium', 'Description for event 451', 13),
('Tournament 452', '2024-03-13T05:30:34', 'University Stadium', 'Description for event 452', 19),
('Tournament 453', '2024-07-27T18:03:13', 'Memorial Field', 'Description for event 453', 15),
('Tournament 454', '2024-04-07T16:37:48', 'University Stadium', 'Description for event 454', 8),
('Tournament 455', '2023-02-02T02:21:52', 'Main Stadium', 'Description for event 455', 17),
('Tournament 456', '2024-09-23T12:10:40', 'Main Stadium', 'Description for event 456', 10),
('Tournament 457', '2023-03-24T08:15:45', 'University Stadium', 'Description for event 457', 16),
('Tournament 458', '2023-12-21T23:52:41', 'City Arena', 'Description for event 458', 16),
('Tournament 459', '2023-07-02T14:39:27', 'Sports Complex', 'Description for event 459', 2),
('Tournament 460', '2024-08-07T23:17:30', 'Sports Complex', 'Description for event 460', 9),
('Tournament 461', '2024-05-02T04:13:00', 'Sports Complex', 'Description for event 461', 5),
('Tournament 462', '2024-05-16T08:26:29', 'Main Stadium', 'Description for event 462', 10),
('Tournament 463', '2024-11-10T09:07:36', 'Sports Complex', 'Description for event 463', 17),
('Tournament 464', '2023-07-21T21:59:20', 'City Arena', 'Description for event 464', 12),
('Tournament 465', '2024-01-30T03:42:30', 'City Arena', 'Description for event 465', 6),
('Tournament 466', '2023-12-10T03:07:44', 'Main Stadium', 'Description for event 466', 15),
('Tournament 467', '2024-07-10T22:23:33', 'Sports Complex', 'Description for event 467', 15),
('Tournament 468', '2023-10-17T03:55:30', 'University Stadium', 'Description for event 468', 9),
('Tournament 469', '2024-04-10T05:40:40', 'Sports Complex', 'Description for event 469', 2),
('Tournament 470', '2024-02-16T20:44:27', 'Sports Complex', 'Description for event 470', 16),
('Tournament 471', '2024-12-06T10:07:15', 'Main Stadium', 'Description for event 471', 5),
('Tournament 472', '2024-08-16T05:36:03', 'Memorial Field', 'Description for event 472', 2),
('Tournament 473', '2024-04-11T08:33:20', 'Sports Complex', 'Description for event 473', 18),
('Tournament 474', '2023-07-16T02:43:44', 'Memorial Field', 'Description for event 474', 12),
('Tournament 475', '2023-01-22T22:40:29', 'City Arena', 'Description for event 475', 13),
('Tournament 476', '2024-08-17T23:46:54', 'Memorial Field', 'Description for event 476', 19),
('Tournament 477', '2023-02-15T23:07:03', 'Memorial Field', 'Description for event 477', 2),
('Tournament 478', '2023-06-21T04:43:49', 'City Arena', 'Description for event 478', 17),
('Tournament 479', '2024-10-21T12:04:14', 'University Stadium', 'Description for event 479', 2),
('Tournament 480', '2024-07-13T08:56:10', 'City Arena', 'Description for event 480', 8),
('Tournament 481', '2023-01-12T14:39:51', 'Memorial Field', 'Description for event 481', 15),
('Tournament 482', '2023-07-17T03:17:20', 'Sports Complex', 'Description for event 482', 18),
('Tournament 483', '2023-06-21T03:46:04', 'Memorial Field', 'Description for event 483', 5),
('Tournament 484', '2023-10-01T19:12:17', 'Main Stadium', 'Description for event 484', 13),
('Tournament 485', '2023-03-29T18:32:43', 'University Stadium', 'Description for event 485', 4),
('Tournament 486', '2024-05-26T13:14:39', 'Sports Complex', 'Description for event 486', 3),
('Tournament 487', '2024-07-19T14:27:19', 'Main Stadium', 'Description for event 487', 17),
('Tournament 488', '2023-03-07T00:45:06', 'Main Stadium', 'Description for event 488', 17),
('Tournament 489', '2024-03-08T01:52:40', 'City Arena', 'Description for event 489', 13),
('Tournament 490', '2024-12-12T05:45:22', 'Main Stadium', 'Description for event 490', 11),
('Tournament 491', '2023-09-18T09:50:42', 'City Arena', 'Description for event 491', 2),
('Tournament 492', '2024-04-23T22:00:01', 'City Arena', 'Description for event 492', 7),
('Tournament 493', '2024-04-17T14:56:17', 'University Stadium', 'Description for event 493', 19),
('Tournament 494', '2023-07-08T14:15:31', 'Main Stadium', 'Description for event 494', 6),
('Tournament 495', '2023-10-02T07:28:10', 'Memorial Field', 'Description for event 495', 18),
('Tournament 496', '2023-09-27T01:36:13', 'University Stadium', 'Description for event 496', 20),
('Tournament 497', '2024-10-19T16:54:32', 'Memorial Field', 'Description for event 497', 10),
('Tournament 498', '2023-05-26T01:18:50', 'Memorial Field', 'Description for event 498', 17),
('Tournament 499', '2023-03-10T01:18:12', 'Memorial Field', 'Description for event 499', 1),
('Tournament 500', '2023-09-10T08:43:33', 'Main Stadium', 'Description for event 500', 5)
ON CONFLICT DO NOTHING;

