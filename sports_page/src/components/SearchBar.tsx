import { useState, memo } from "react"
import './component_styles/searchbar.css'

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar = ({onSearch} : SearchBarProps) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ isOpen, setIsOpen ] = useState<boolean>(false); 
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    }

    const handleSearchBarToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(prev => !prev);
    }

    return (
        <div className="searchbar_container">
            <button className="search_toggle_button" onClick={handleSearchBarToggle}>
                <div className="search_indicator_container">
                    {isOpen ? 'close' : 'open'}
                    <img className="searchbar_img" src="/search_interface_symbol.png"></img>
                </div>
            </button>
            <input 
                className={`searchbar_${isOpen ? 'opened' : 'closed'}`}  
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                placeholder="Search by the page you're on"></input>
        </div>
    )
}

export default memo(SearchBar);