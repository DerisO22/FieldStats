import { ClipLoader } from "react-spinners"
import { useTheme } from "../contexts/ThemeContext";

const Loader = () => {
    const { theme } = useTheme(); 
    
    return (
        <div>
            <ClipLoader 
                color={theme === "dark" ? "white" : "#005eb8"}
                loading={true}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader;