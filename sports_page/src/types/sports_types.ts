export interface Sport {
    sport_id: number,
    sport_name: string,
    sport_description: string,
    has_gender_division: boolean,
}

export interface SportGenders {
    sport_id: number,
    gender_id: number,
    gender: string
}