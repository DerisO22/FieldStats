import './pageStyles/schoolspage.css'
import './pageStyles/common_styles.css'
import { useEffect, useState, useCallback} from 'react'
import { deleteSchool, getSchools, createSchool } from '../services/schools_services'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../contexts/ModalContext'
import { useAuth } from '../contexts/AuthContext'
import AddSchool from '../components/component_operations/AddSchool'

interface School {
	school_id: number,
	school_name: string,
	school_type_id: number,
	state: string,
	city: string,
	address: string,
	website: string,
}

interface newSchool {
	school_name: string,
	school_type_id: number,
	state: string,
	city: string,
	address: string,
	website: string,
}

interface SchoolsPageProps {
  	searchTerm: string
}

const SchoolsPage = ({ searchTerm }: SchoolsPageProps) => {
	const [ schoolData, setSchoolData ] = useState<School[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const navigate = useNavigate();
	const { openModal, closeModal } = useModal();
	const {isAuthenticated, isAdmin } = useAuth();

	const fetchData = useCallback(async () => {
		setIsLoading(true);

		try {
			const data = await getSchools();
			setSchoolData(data);
		} catch (error) {
		console.log("Error: ", error);
		} finally {
			setIsLoading(false)
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleDelete = async (school_id: number) => {
		setIsLoading(true);

		try {	
			await deleteSchool(school_id);
			fetchData();
		} catch (error) {
			console.error('Error fetching school data:', error);
		} finally {
			setIsLoading(false);
		}
	}

	const handleAddSchool = async (newSchoolData: newSchool) => {
		setIsLoading(true);

		try {
			await createSchool(newSchoolData);
			fetchData();
			closeModal();
		} catch (error) {
			console.error('Error adding school:', error);
		} finally {

		}
	}	

	const openAddSchoolModal = () => {
		openModal(
			<AddSchool
				onSubmit={handleAddSchool}
				isLoading={isLoading}
			/>,
			"Add New School"
		)
	}

	const handleSchoolClick = useCallback((school_id: number) => {
		const schoolUrl = `/schools/${school_id}`;
		console.log("Navigating to:", schoolUrl);
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		navigate(schoolUrl);
	}, [navigate]);
	
	return (
		<>
			<div className='page_container'>
				<h1 className='header1'>Schools</h1>
				<div className='sports_container'>
				{isLoading ? (
					<p>Loading sports...</p>
				) : (
					schoolData
					.filter(school => school.school_name.toLowerCase().includes(searchTerm.toLowerCase()))
					.map((school) => (
						<button
							key={school.school_id}
							className='sport_button'
							onClick={() => handleSchoolClick(school.school_id)}
						>
							{school.school_name}
							{isAuthenticated && isAdmin &&
                                <div onClick={() => handleDelete(school.school_id)} className='delete_button'>Delete</div>
                            }
						</button>
					))
				)}
				</div>

				{isAuthenticated && isAdmin && (
                <button onClick={openAddSchoolModal} className='add_sport_button'>Add School</button>
            	)}
			</div>
		</>
	)
}

export default SchoolsPage;