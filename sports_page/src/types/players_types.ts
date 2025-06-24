export interface PlayerData {
    player_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string
}

export interface AddNewPlayer {
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string
}

export interface PlayerStats {
    stat_id: number,
    player_id: number,
    sport_name: string,
    season: string,
    stats: any
}

export interface EditPlayerDetails {
    player_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string,
}

export interface ChartDataEntry {
    name: string;
    value: number;
}