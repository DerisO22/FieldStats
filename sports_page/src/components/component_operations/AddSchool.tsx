import { useState } from "react";
import './component_operation_styles/modal_operation_form.css'
import Loader from "../Loader";

interface AddSchoolProps {
    onSubmit: (schoolData: {
        school_name: string;
        school_type_id: number;
        state: string;
        city: string;
        address: string;
        website: string;
    }) => Promise<void>;
    isLoading?: boolean;
}

const AddSchool = ({ onSubmit, isLoading = false }: AddSchoolProps) => {
    const [formData, setFormData] = useState({
        school_name: '',
        school_type_id: 28,
        state: '',
        city: '',
        address: '',
        website: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.school_name.trim()) {
            newErrors.school_name = 'School name is required';
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (formData.website && !isValidUrl(formData.website)) {
            newErrors.website = 'Please enter a valid website URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (url: string) => {
        try {
            // Add protocol if missing
            const urlToTest = url.startsWith('http') ? url : `https://${url}`;
            new URL(urlToTest);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            // Clean up website URL - remove protocol for storage
            const cleanedData = {
                ...formData,
                website: formData.website.replace(/^https?:\/\//, '')
            };

            await onSubmit(cleanedData);

            // Reset form on successful submission
            setFormData({
                school_name: '',
                school_type_id: 28,
                state: '',
                city: '',
                address: '',
                website: ''
            });

            setErrors({});
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
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
        <form onSubmit={handleSubmit} className="operation_form">
            <div className="form_group">
                <label htmlFor="school_name" className="form_label">
                    School Name
                </label>
                <input
                    type="text"
                    id="school_name"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter school name"
                    disabled={isLoading}
                />
                {errors.school_name && <span className="error_message">{errors.school_name}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="school_type_id" className="form_label">
                    School Type
                </label>
                <select
                    id="school_type_id"
                    name="school_type_id"
                    value={formData.school_type_id}
                    onChange={handleInputChange}
                    className="form_input"
                    disabled={isLoading}
                >
                    {/* Values are supposed to be 1 and 2 but some data got duplicated in my database */}
                    <option value={28}>High School</option>
                    <option value={31}>College</option>
                </select>
            </div>

            <div className="form_group">
                <label htmlFor="state" className="form_label">
                    State
                </label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter state"
                    disabled={isLoading}
                />
                {errors.state && <span className="error_message">{errors.state}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="city" className="form_label">
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter city"
                    disabled={isLoading}
                />
                {errors.city && <span className="error_message">{errors.city}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="address" className="form_label">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter street address"
                    disabled={isLoading}
                />
                {errors.address && <span className="error_message">{errors.address}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="website" className="form_label">
                    Website
                </label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter website URL (optional)"
                    disabled={isLoading}
                />
                {errors.website && <span className="error_message">{errors.website}</span>}
            </div>

            <div className="form_actions">
                <button
                    type="submit"
                    className="submit_button"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : 'Add School'}
                </button>
            </div>
        </form>
    );
};

export default AddSchool;