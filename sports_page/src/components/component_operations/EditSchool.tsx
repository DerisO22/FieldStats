import { useState, useEffect } from "react";
import './component_operation_styles/modal_operation_form.css'

interface SchoolData {
    school_id: number;
    school_name: string;
    school_type_id: number;
    state: string;
    city: string;
    address: string;
    website: string;
}

interface EditSchoolProps {
    currentSchool?: SchoolData; 
    onSubmit: (schoolData: SchoolData) => Promise<void>;
    isLoading: boolean;
}

const EditSchool = ({ currentSchool, onSubmit, isLoading }: EditSchoolProps) => {
    const [formData, setFormData] = useState({
        school_id: -1,
        school_name: '',
        school_type_id: 1,
        state: '',
        city: '',
        address: '',
        website: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Populate form with current school data 
    useEffect(() => {
        if (currentSchool) {
            setFormData({
                school_id: currentSchool.school_id,
                school_name: currentSchool.school_name,
                school_type_id: currentSchool.school_type_id,
                state: currentSchool.state,
                city: currentSchool.city,
                address: currentSchool.address,
                website: currentSchool.website
            });
        }
    }, [currentSchool]);

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
                    <option value={1}>High School</option>
                    <option value={2}>College</option>
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
                    placeholder="Enter website URL"
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
                    {isLoading ? 'Updating School...' : 'Update School'}
                </button>
            </div>
        </form>
    );
};

export default EditSchool;