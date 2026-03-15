import { useContext } from "react";
import { AuthUserContext } from "../components/AuthUserProvider";

export const useSelectCurrentUser = () => {
    return useContext(AuthUserContext).user;
};
