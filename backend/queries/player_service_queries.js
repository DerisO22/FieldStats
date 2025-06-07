const PlayerQueries = {
    RETRIEVE_ALL: 'SELECT * FROM players LIMIT 200;',

    RETRIEVE_SPECIFIC: `
        WITH player_sport_stats AS (
            SELECT 
                ps.stat_id,
                s.sport_id,
                s.sport_name,
                ps.season,
                CASE s.sport_name
                    WHEN 'Basketball' THEN (SELECT row_to_json(bs) FROM basketball_stats bs WHERE bs.stat_id = ps.stat_id)
                    WHEN 'Baseball' THEN (SELECT row_to_json(bs) FROM baseball_stats bs WHERE bs.stat_id = ps.stat_id)
                    WHEN 'Football' THEN (SELECT row_to_json(fs) FROM football_stats fs WHERE fs.stat_id = ps.stat_id)
                    WHEN 'Soccer' THEN (SELECT row_to_json(ss) FROM soccer_stats ss WHERE ss.stat_id = ps.stat_id)
                    WHEN 'Volleyball' THEN (SELECT row_to_json(vs) FROM volleyball_stats vs WHERE vs.stat_id = ps.stat_id)
                    WHEN 'Tennis' THEN (SELECT row_to_json(ts) FROM tennis_stats ts WHERE ts.stat_id = ps.stat_id)
                    WHEN 'Track' THEN (SELECT row_to_json(ts) FROM track_stats ts WHERE ts.stat_id = ps.stat_id)
                    WHEN 'Swimming' THEN (SELECT row_to_json(ss) FROM swimming_stats ss WHERE ss.stat_id = ps.stat_id)
                    WHEN 'Wrestling' THEN (SELECT row_to_json(ws) FROM wrestling_stats ws WHERE ws.stat_id = ps.stat_id)
                    WHEN 'Golf' THEN (SELECT row_to_json(gs) FROM golf_stats gs WHERE gs.stat_id = ps.stat_id)
                    WHEN 'Softball' THEN (SELECT row_to_json(ss) FROM softball_stats ss WHERE ss.stat_id = ps.stat_id)
                    WHEN 'Lacrosse' THEN (SELECT row_to_json(ls) FROM lacrosse_stats ls WHERE ls.stat_id = ps.stat_id)
                    WHEN 'Field Hockey' THEN (SELECT row_to_json(fhs) FROM field_hockey_stats fhs WHERE fhs.stat_id = ps.stat_id)
                    WHEN 'Cross Country' THEN (SELECT row_to_json(ccs) FROM cross_country_stats ccs WHERE ccs.stat_id = ps.stat_id)
                    WHEN 'Hockey' THEN (SELECT row_to_json(hs) FROM hockey_stats hs WHERE hs.stat_id = ps.stat_id)
                    WHEN 'Ultimate Frisbee' THEN (SELECT row_to_json(ufs) FROM ultimate_frisbee_stats ufs WHERE ufs.stat_id = ps.stat_id)
                    WHEN 'Gymnastics' THEN (SELECT row_to_json(gs) FROM gymnastics_stats gs WHERE gs.stat_id = ps.stat_id)
                    WHEN 'Rugby' THEN (SELECT row_to_json(rs) FROM rugby_stats rs WHERE rs.stat_id = ps.stat_id)
                    WHEN 'Water Polo' THEN (SELECT row_to_json(wps) FROM water_polo_stats wps WHERE wps.stat_id = ps.stat_id)
                    WHEN 'Cheerleading' THEN (SELECT row_to_json(cs) FROM cheerleading_stats cs WHERE cs.stat_id = ps.stat_id)
                END as stats
            FROM player_stats ps
            JOIN sports s ON ps.sport_id = s.sport_id
            WHERE ps.player_id = $1
        )
        SELECT 
            p.*,
            json_agg(pss) as stats
        FROM players p
        LEFT JOIN player_sport_stats pss ON p.player_id = $1
        WHERE p.player_id = $1
        GROUP BY p.player_id;`,

    DELETE_PLAYER_COMPLETE: `
        -- First, delete from sport-specific stats tables
        DELETE FROM basketball_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM baseball_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM football_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM soccer_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM volleyball_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM tennis_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM track_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM swimming_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM wrestling_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM golf_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM softball_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM lacrosse_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM field_hockey_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM cross_country_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM hockey_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM ultimate_frisbee_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM gymnastics_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM rugby_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM water_polo_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        DELETE FROM cheerleading_stats 
        WHERE stat_id IN (SELECT stat_id FROM player_stats WHERE player_id = $1);
        
        -- Then delete general player stats
        DELETE FROM player_stats WHERE player_id = $1;
        
        -- Delete team associations
        DELETE FROM player_teams WHERE player_id = $1;
        
        -- Delete school associations
        DELETE FROM school_player WHERE player_id = $1;
        
        -- Finally delete the player
        DELETE FROM players WHERE player_id = $1;`,

    EDIT: `UPDATE players SET first_name = $2, last_name = $3, date_of_birth = $4, gender_id = $5, bio = $6
           WHERE player_id = $1;`,

    CREATE: `INSERT INTO players (first_name, last_name, date_of_birth, gender_id, bio)
             VALUES ($1, $2, $3, $4, $5);`,

    RETRIEVE_BY_GENDER: `SELECT * 
                         FROM players p
                         JOIN genders g ON p.gender_id = g.gender_id
                         WHERE g.gender_id = $1;`,
};

export { PlayerQueries };