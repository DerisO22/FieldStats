import { useState } from "react";
import './component_operation_styles/modal_operation_form.css'

interface AddNewsProps {
    onSubmit: (newsData: {
        headline: string;
        author: string;
        publish_date: string;
        content: string;
        image_url: string;
        sport_id: number;
        team_id: number;
        features: boolean;
    }) => Promise<void>;
    isLoading?: boolean;
}

const AddNews = ({ onSubmit, isLoading = false }: AddNewsProps) => {
    const [formData, setFormData] = useState({
        headline: '',
        author: '',
        publish_date: new Date().toISOString().split('T')[0], // Default to today
        content: '',
        image_url: '',
        sport_id: 1,
        team_id: 1,
        features: false
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.headline.trim()) {
            newErrors.headline = 'Headline is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }

        if (!formData.publish_date) {
            newErrors.publish_date = 'Publish date is required';
        }

        if (formData.sport_id < 1) {
            newErrors.sport_id = 'Sport ID must be a positive number';
        }

        if (formData.team_id < 1) {
            newErrors.team_id = 'Team ID must be a positive number';
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
                headline: '',
                author: '',
                publish_date: new Date().toISOString().split('T')[0],
                content: '',
                image_url: '',
                sport_id: 1,
                team_id: 1,
                features: false
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
            [name]: type === 'checkbox' 
                ? (e.target as HTMLInputElement).checked 
                : type === 'number' 
                    ? Number(value)
                    : value
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
                <label htmlFor="headline" className="form_label">
                    Headline
                </label>
                <input
                    type="text"
                    id="headline"
                    name="headline"
                    value={formData.headline}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter article headline"
                    disabled={isLoading}
                />
                {errors.headline && <span className="error_message">{errors.headline}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="author" className="form_label">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter author name"
                    disabled={isLoading}
                />
                {errors.author && <span className="error_message">{errors.author}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="publish_date" className="form_label">
                    Publish Date
                </label>
                <input
                    type="date"
                    id="publish_date"
                    name="publish_date"
                    value={formData.publish_date}
                    onChange={handleInputChange}
                    className="form_input"
                    disabled={isLoading}
                />
                {errors.publish_date && <span className="error_message">{errors.publish_date}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="content" className="form_label">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="form_textarea"
                    placeholder="Enter article content"
                    rows={6}
                    disabled={isLoading}
                />
                {errors.content && <span className="error_message">{errors.content}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="image_url" className="form_label">
                    Image URL
                </label>
                <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="form_input"
                    placeholder="Enter image URL (optional)"
                    disabled={isLoading}
                />
            </div>

            <div className="form_group">
                <label htmlFor="sport_id" className="form_label">
                    Sport ID
                </label>
                <input
                    type="number"
                    id="sport_id"
                    name="sport_id"
                    value={formData.sport_id}
                    onChange={handleInputChange}
                    className="form_input"
                    min="1"
                    disabled={isLoading}
                />
                {errors.sport_id && <span className="error_message">{errors.sport_id}</span>}
            </div>

            <div className="form_group">
                <label htmlFor="team_id" className="form_label">
                    Team ID
                </label>
                <input
                    type="number"
                    id="team_id"
                    name="team_id"
                    value={formData.team_id}
                    onChange={handleInputChange}
                    className="form_input"
                    min="1"
                    disabled={isLoading}
                />
                {errors.team_id && <span className="error_message">{errors.team_id}</span>}
            </div>

            <div className="form_group">
                <label className="checkbox_label">
                    <input
                        type="checkbox"
                        name="features"
                        checked={formData.features}
                        onChange={handleInputChange}
                        className="form_checkbox"
                        disabled={isLoading}
                    />
                    Featured Article
                </label>
            </div>

            <div className="form_actions">
                <button
                    type="submit"
                    className="submit_button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding Article...' : 'Add Article'}
                </button>
            </div>
        </form>
    );
};

export default AddNews;