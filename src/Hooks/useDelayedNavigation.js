import { useNavigate } from "react-router-dom";

const useDelayedNavigation = () => {
    const navigate = useNavigate();

    return (to, delay) => setTimeout(() => {navigate(to, { replace: true })}, delay);
}

export default useDelayedNavigation;