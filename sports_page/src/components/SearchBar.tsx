import { useState } from "react"
import './component_styles/searchbar.css'

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar = ({onSearch} : SearchBarProps) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ isOpen, setIsOpen ] = useState<boolean>(false); 
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    }

    const handleSearchBarToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(prev => !prev);
        console.log(isOpen)
    }

    return (
        <div className="searchbar_container">
            <button className="search_toggle_button" onClick={handleSearchBarToggle}>{isOpen ? 'close' : 'open'}</button>
            <input 
                className={`searchbar_${isOpen ? 'opened' : 'closed'}`}  
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                placeholder="Search by the page you're on"></input>
        </div>
    )
}

export default SearchBar;