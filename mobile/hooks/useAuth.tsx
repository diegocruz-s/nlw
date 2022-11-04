import { useContext } from "react";
import { AuthContext, AuthContextProvider, AuthContextDataProps } from "../src/context/AuthContext";

export function useAuth(): AuthContextDataProps{
    const context = useContext(AuthContext);

    return context;
}
