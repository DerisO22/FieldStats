import { useState } from "react";
import './component_operation_styles/add_sport.css'

interface AddSportProps {
    onSubmit: (sportData: {
        sport_name: string;
        sport_description: string;
        has_gender_division: boolean;
    }) => Promise<void>;
    isLoading?: boolean;
}

const AddSport = ({ onSubmit, isLoading = false }: AddSportProps) => {
    const [formData, setFormData] = useState({
        sport_name: '',
        sport_description: '',
        has_gender_division: false
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.sport_name.trim()) {
            newErrors.sport_name = 'Sport name is required';
        }

        if (!formData.sport_description.trim()) {
            newErrors.sport_description = 'Sport description is required';
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

            // Reset form on successful submission
            setFormData({
                sport_name: '',
                sport_description: '',
                has_gender_division: false
            });

            setErrors({});
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add_sport_form">
            <div className="form_group">
                <label htmlFor="sport_name" className="form_label">
                    Sport Name
                </label>
                <input
                    type="text"
                    id="sport_name"
                    name="sport_name"
                    value={formData.sport_name}
                    onChange={handleInputChange}
                    className={`form_input`}
                    placeholder="Enter sport name"
                    disabled={isLoading}
                />
                {errors.sport_name && <span className="error_message">{errors.sport_name}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="sport_description" className="form_label">
                    Sport Description 
                </label>
                <textarea
                    id="sport_description"
                    name="sport_description"
                    value={formData.sport_description}
                    onChange={handleInputChange}
                    className={`form_textarea`}
                    placeholder="Enter sport description"
                    rows={4}
                    disabled={isLoading}
                />
                {errors.sport_description && <span className="error_message">{errors.sport_description}</span>}
            </div>

            <div className="form_group">
                <label className="checkbox_label">
                <input
                    type="checkbox"
                    name="has_gender_division"
                    checked={formData.has_gender_division}
                    onChange={handleInputChange}
                    className="form_checkbox"
                    disabled={isLoading}
                />
                    Has Gender Division
                </label>
            </div>

            <div className="form_actions">
                <button
                    type="submit"
                    className="submit_button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding Sport...' : 'Add Sport'}
                </button>
            </div>
        </form>
    );
};

export default AddSport;