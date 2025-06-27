import './pageStyles/schoolspage.css'
import { useEffect, useState, useCallback} from 'react'
import { deleteSchool, getSchools, createSchool } from '../services/schools_services'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../contexts/ModalContext'
import { useAuth } from '../contexts/AuthContext'
import AddSchool from '../components/component_operations/AddSchool'

// Custom Types
import { School, newSchool } from '../types/schools_types'
import Loader from '../components/Loader'

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
				<div className='schools_container'>
				{isLoading ? (
					<Loader />
				) : (
					schoolData
					.filter(school => school.school_name.toLowerCase().includes(searchTerm.toLowerCase()))
					.map((school) => (
						<div
							key={school.school_id}
							className='school_container'
							onClick={() => handleSchoolClick(school.school_id)}
						>
								<div className='header3'>{school.school_name}</div>
								<div className='text'>{school.school_type_id === 29 ? "High School" : "College"}</div>
								<div className='text'>{school.city}, {school.state}</div>
								<div className='text'>{school.address}</div>
							{isAuthenticated && isAdmin &&
                                <button onClick={() => handleDelete(school.school_id)} className='delete_button'>Delete</button>
                            }
						</div>
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