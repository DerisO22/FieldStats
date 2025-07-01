export interface School {
	school_id: number,
	school_name: string,
	school_type_id: number,
	state: string,
	city: string,
	address: string,
	website: string,
};

export interface newSchool {
	school_name: string,
	school_type_id: number,
	state: string,
	city: string,
	address: string,
	website: string,
};

export interface SchoolsPageProps {
  	searchTerm: string
};

export interface School_Sport {
    sport_id: number,
    sport_name: string
}