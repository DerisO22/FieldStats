-- Create Table Statements
CREATE TABLE IF NOT EXISTS genders (
    gender_id SERIAL PRIMARY KEY,
    gender VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS school_types (
    school_type_id SERIAL PRIMARY KEY,
    school_type VARCHAR(30) NOT NULL
);

-- User Auth
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Sports
CREATE TABLE IF NOT EXISTS sports (
    sport_id SERIAL PRIMARY KEY,
    sport_name VARCHAR(50) NOT NULL,
    sport_description TEXT, 
    has_gender_divisions BOOLEAN DEFAULT TRUE  
);

CREATE TABLE IF NOT EXISTS sport_genders (
    sport_id INTEGER NOT NULL,
    gender_id INTEGER NOT NULL,

    PRIMARY KEY (sport_id, gender_is),
    FOREIGN KEY (sport_id) REFERENCES sports(sport_id),
    FOREIGN KEY (gender_id) REFERENCES genders (gender_id)
);

-- Schools
CREATE TABLE IF NOT EXISTS schools (
    school_id SERIAL PRIMARY KEY,
    school_name VARCHAR(100) NOT NULL,
    school_type_id INTEGER NOT NULL,
    state VARCHAR(30),
    city VARCHAR(50),
    address VARCHAR(100),
    website VARCHAR(100),
    
    FOREIGN KEY (school_type_id) REFERENCES school_types(school_type_id)
);

-- Teams 
CREATE TABLE IF NOT EXISTS teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    school_id INTEGER NOT NULL,
    sport_id INTEGER NOT NULL,
    gender_id INTEGER, 
    season VARCHAR(20), 
    
    FOREIGN KEY (school_id) REFERENCES schools(school_id),
    FOREIGN KEY (sport_id) REFERENCES sports(sport_id),
    FOREIGN KEY (gender_id) REFERENCES genders(gender_id)
);

-- Players info
CREATE TABLE IF NOT EXISTS players (
    player_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender_id INTEGER,
    bio TEXT,
    
    FOREIGN KEY (gender_id) REFERENCES genders(gender_id)
);

-- Many-to-many relationship between players and teams
CREATE TABLE IF NOT EXISTS player_teams (
    player_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    jersey_number VARCHAR(10),
    position VARCHAR(30),
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (player_id, team_id),
    FOREIGN KEY (player_id) REFERENCES players(player_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- Coaches
CREATE TABLE IF NOT EXISTS coaches (
    coach_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio TEXT
);

-- Many-to-many relationship between coaches and teams
CREATE TABLE IF NOT EXISTS coach_teams (
    coach_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    role VARCHAR(50), 
    
    PRIMARY KEY (coach_id, team_id),
    FOREIGN KEY (coach_id) REFERENCES coaches(coach_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- News Cards
CREATE TABLE IF NOT EXISTS news (
    news_id SERIAL PRIMARY KEY,
    headline VARCHAR(100) NOT NULL,
    author VARCHAR(50),
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    sport_id INTEGER,
    team_id INTEGER,
    featured BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (sport_id) REFERENCES sports(sport_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- Events/competitions
CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(100),
    description TEXT,
    sport_id INTEGER NOT NULL,
    
    FOREIGN KEY (sport_id) REFERENCES sports(sport_id)
);

-- Many-to-many between teams and events
CREATE TABLE IF NOT EXISTS event_teams (
    event_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    score VARCHAR(20),
    placement INTEGER,
    
    PRIMARY KEY (event_id, team_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

--
-- Stats related tables
--
CREATE TABLE IF NOT EXISTS player_stats (
    stat_id SERIAL PRIMARY KEY NOT NULL,
    player_id INTEGER NOT NULL,
    sport_id INTEGER NOT NULL,
    season VARCHAR(20),

    FOREIGN KEY (player_id) REFERENCES players (player_id),
    FOREIGN KEY (sport_id) REFERENCES sports (sport_id)
);

-- Sport-specific stats tables
CREATE TABLE IF NOT EXISTS basketball_stats (
    stat_id INTEGER PRIMARY KEY,
    points INTEGER DEFAULT 0,
    rebounds INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    steals INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    three_pointers INTEGER DEFAULT 0,
    field_goal_percentage DECIMAL(5,2),
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS baseball_stats (
    stat_id INTEGER PRIMARY KEY,
    at_bats INTEGER DEFAULT 0,
    hits INTEGER DEFAULT 0,
    runs INTEGER DEFAULT 0,
    rbi INTEGER DEFAULT 0,
    stolen_bases INTEGER DEFAULT 0,
    home_runs INTEGER DEFAULT 0,
    batting_average DECIMAL(4,3),
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS football_stats (
    stat_id INTEGER PRIMARY KEY,
    touchdowns INTEGER DEFAULT 0,
    rushing_yards INTEGER DEFAULT 0,
    passing_yards INTEGER DEFAULT 0,
    tackles INTEGER DEFAULT 0,
    sacks INTEGER DEFAULT 0,
    interceptions INTEGER DEFAULT 0,
    field_goals INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS soccer_stats (
    stat_id INTEGER PRIMARY KEY,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    shots_on_goal INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0,
    clean_sheets INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS volleyball_stats (
    stat_id INTEGER PRIMARY KEY,
    kills INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    digs INTEGER DEFAULT 0,
    aces INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    service_errors INTEGER DEFAULT 0,
    hitting_percentage DECIMAL(4,3),
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS tennis_stats (
    stat_id INTEGER PRIMARY KEY,
    aces INTEGER DEFAULT 0,
    double_faults INTEGER DEFAULT 0,
    first_serve_percentage DECIMAL(5,2),
    break_points_saved INTEGER DEFAULT 0,
    winners INTEGER DEFAULT 0,
    unforced_errors INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS track_stats (
    stat_id INTEGER PRIMARY KEY,
    event_name VARCHAR(50),
    finish_time DECIMAL(8,2),
    place INTEGER,
    personal_best BOOLEAN DEFAULT FALSE,
    points_earned INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS swimming_stats (
    stat_id INTEGER PRIMARY KEY,
    event_name VARCHAR(50),
    finish_time DECIMAL(8,2),
    distance INTEGER,
    stroke_type VARCHAR(30),
    place INTEGER,
    personal_best BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS wrestling_stats (
    stat_id INTEGER PRIMARY KEY,
    weight_class VARCHAR(20),
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    pins INTEGER DEFAULT 0,
    technical_falls INTEGER DEFAULT 0,
    major_decisions INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS golf_stats (
    stat_id INTEGER PRIMARY KEY,
    score INTEGER,
    par INTEGER,
    fairways_hit INTEGER DEFAULT 0,
    greens_in_regulation INTEGER DEFAULT 0,
    putts INTEGER DEFAULT 0,
    eagles INTEGER DEFAULT 0,
    birdies INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS softball_stats (
    stat_id INTEGER PRIMARY KEY,
    at_bats INTEGER DEFAULT 0,
    hits INTEGER DEFAULT 0,
    runs INTEGER DEFAULT 0,
    rbi INTEGER DEFAULT 0,
    stolen_bases INTEGER DEFAULT 0,
    batting_average DECIMAL(4,3),
    fielding_percentage DECIMAL(4,3),
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS lacrosse_stats (
    stat_id INTEGER PRIMARY KEY,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    ground_balls INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    face_offs_won INTEGER DEFAULT 0,
    shots_on_goal INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS field_hockey_stats (
    stat_id INTEGER PRIMARY KEY,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    shots_on_goal INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    defensive_saves INTEGER DEFAULT 0,
    penalty_corners INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS cross_country_stats (
    stat_id INTEGER PRIMARY KEY,
    distance DECIMAL(5,2),
    finish_time DECIMAL(8,2),
    place INTEGER,
    personal_best BOOLEAN DEFAULT FALSE,
    course_name VARCHAR(100),
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS hockey_stats (
    stat_id INTEGER PRIMARY KEY,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    shots_on_goal INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    penalties_in_minutes INTEGER DEFAULT 0,
    plus_minus INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS ultimate_frisbee_stats (
    stat_id INTEGER PRIMARY KEY,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    completions INTEGER DEFAULT 0,
    drops INTEGER DEFAULT 0,
    defensive_plays INTEGER DEFAULT 0,
    turnovers INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS gymnastics_stats (
    stat_id INTEGER PRIMARY KEY,
    event_name VARCHAR(50),
    difficulty_score DECIMAL(4,2),
    execution_score DECIMAL(4,2),
    final_score DECIMAL(4,2),
    place INTEGER,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS rugby_stats (
    stat_id INTEGER PRIMARY KEY,
    tries INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    penalty_goals INTEGER DEFAULT 0,
    tackles INTEGER DEFAULT 0,
    meters_gained INTEGER DEFAULT 0,
    lineouts_won INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS water_polo_stats (
    stat_id INTEGER PRIMARY KEY,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    steals INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    turnovers INTEGER DEFAULT 0,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

CREATE TABLE IF NOT EXISTS cheerleading_stats (
    stat_id INTEGER PRIMARY KEY,
    routine_difficulty DECIMAL(4,2),
    execution_score DECIMAL(4,2),
    total_score DECIMAL(4,2),
    deductions INTEGER DEFAULT 0,
    place INTEGER,
    
    FOREIGN KEY (stat_id) REFERENCES player_stats(stat_id)
);

-- 
-- Junction Tables
--
-- Many-to-many relationship between schools and sports
CREATE TABLE IF NOT EXISTS school_sports (
    school_id INTEGER NOT NULL,
    sport_id INTEGER NOT NULL,

    PRIMARY KEY (school_id, sport_id),
    FOREIGN KEY (school_id) REFERENCES schools (school_id),
    FOREIGN KEY (sport_id) REFERENCES sports (sport_id)
);

-- Many-to-many relationship between schools and players
CREATE TABLE IF NOT EXISTS school_player (
    school_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,

    PRIMARY KEY (school_id, player_id),
    FOREIGN KEY (school_id) REFERENCES schools(school_id),
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);

-- Many-to-many relationship between schools, sports, and team
CREATE TABLE IF NOT EXISTS news_school_sport_team (
    news_id INTEGER NOT NULL,
    school_id INTEGER NOT NULL,
    sport_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,

    PRIMARY KEY (news_id, school_id, sport_id, team_id),
    FOREIGN KEY (news_id) REFERENCES news(news_id),
    FOREIGN KEY (school_id) REFERENCES schools(school_id),
    FOREIGN KEY (sport_id) REFERENCES sports(sport_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);