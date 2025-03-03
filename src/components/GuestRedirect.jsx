import { useUserContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";

export const GuestRedirect = ({ children }) => {
    const { user, isLoading, isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/allnotes');
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        <div className="flex justify-center items-center h-screen w-screen">
            <RingLoader color="#0362e9" size={120} />
        </div>
    }
    if (isAuthenticated) return null;

    return children;
};