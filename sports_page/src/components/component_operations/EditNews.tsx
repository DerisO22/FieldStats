import { useState, useEffect } from "react";
import './component_operation_styles/modal_operation_form.css'
import Loader from "../Loader";

interface NewsData {
    news_id: number,
    headline: string,
    author: string,
    publish_date: string,
    content: string,
    image_url: string,
    sport_id: number,
    team_id: number,
    features: boolean
}

interface EditNewsProps {
    currentNews?: NewsData; 
    onSubmit: (newsData: NewsData) => Promise<void>;
    isLoading: boolean;
}

const EditNews = ({ currentNews, onSubmit, isLoading }: EditNewsProps) => {
    const [formData, setFormData] = useState({
        news_id: -1,
        headline: '',
        author: '',
        publish_date: '',
        content: '',
        image_url: '',
        sport_id: -1,
        team_id: -1,
        features: false
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Populate form with current news data 
    useEffect(() => {
        if (currentNews) {
            setFormData({
                news_id: currentNews.news_id,
                headline: currentNews.headline,
                author: currentNews.author,
                publish_date: currentNews.publish_date.substring(0, 10), 
                content: currentNews.content,
                image_url: currentNews.image_url,
                sport_id: currentNews.sport_id,
                team_id: currentNews.team_id,
                features: currentNews.features
            });
        }
    }, [currentNews]);

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

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
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let newValue;
        if (type === "checkbox") {
            newValue = (e.target as HTMLInputElement).checked;
        } else {
            newValue = value;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="news_operation_form">
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
                    placeholder="Enter headline"
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
                    placeholder="Enter image URL"
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
                    placeholder="Enter sport ID"
                    disabled={isLoading}
                />
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
                    placeholder="Enter team ID"
                    disabled={isLoading}
                />
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
                    Is Featured?
                </label>
            </div>

            <div className="form_actions">
                <button
                    type="submit"
                    className="submit_button"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : 'Update News'}
                </button>
            </div>
        </form>
    )
}

export default EditNews;