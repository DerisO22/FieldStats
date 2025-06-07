import { useState, useEffect } from "react";
import './component_operation_styles/modal_operation_form.css'

interface PlayerData {
    player_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender_id: number;
    bio: string;
}

interface EditPlayerProps {
    currentPlayer?: PlayerData; 
    onSubmit: (playerData: PlayerData) => Promise<void>;
    isLoading: boolean;
}

const EditPlayer = ({ currentPlayer, onSubmit, isLoading }: EditPlayerProps) => {
    const [formData, setFormData] = useState({
        player_id: -1,
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender_id: 7,
        bio: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Populate form with current player data 
    useEffect(() => {
        if (currentPlayer) {
            setFormData({
                player_id: currentPlayer.player_id,
                first_name: currentPlayer.first_name,
                last_name: currentPlayer.last_name,
                date_of_birth: currentPlayer.date_of_birth.substring(0, 10), // Format date for input
                gender_id: currentPlayer.gender_id,
                bio: currentPlayer.bio
            });
        }
    }, [currentPlayer]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }

        if (!formData.date_of_birth) {
            newErrors.date_of_birth = 'Date of birth is required';
        } else {
            // Validate that the date is not in the future
            const selectedDate = new Date(formData.date_of_birth);
            const today = new Date();
            if (selectedDate > today) {
                newErrors.date_of_birth = 'Date of birth cannot be in the future';
            }
        }

        if (!formData.bio.trim()) {
            newErrors.bio = 'Bio is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            await onSubmit(formData);
            setErrors({});
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="operation_form">
            <div className="form_group">
                <label htmlFor="first_name" className="form_label">
                    First Name
                </label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter first name"
                    disabled={isLoading}
                />
                {errors.first_name && <span className="error_message">{errors.first_name}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="last_name" className="form_label">
                    Last Name
                </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter last name"
                    disabled={isLoading}
                />
                {errors.last_name && <span className="error_message">{errors.last_name}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="date_of_birth" className="form_label">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className="form_input"
                    disabled={isLoading}
                />
                {errors.date_of_birth && <span className="error_message">{errors.date_of_birth}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="gender_id" className="form_label">
                    Gender
                </label>
                <select
                    id="gender_id"
                    name="gender_id"
                    value={formData.gender_id}
                    onChange={handleInputChange}
                    className="form_input"
                    disabled={isLoading}
                >
                    <option value={7}>Male</option>
                    <option value={8}>Female</option>
                </select>
            </div>

            <div className="form_group">
                <label htmlFor="bio" className="form_label">
                    Bio
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter player bio"
                    rows={4}
                    disabled={isLoading}
                />
                {errors.bio && <span className="error_message">{errors.bio}</span>}
            </div>

            <div className="form_actions">
                <button
                    type="submit"
                    className="submit_button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating Player...' : 'Update Player'}
                </button>
            </div>
        </form>
    );
};

export default EditPlayer;