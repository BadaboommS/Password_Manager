import { Navigate } from "react-router";
//import { accountService } from "../services/account.service";

const AuthGuard = ({ children } : { children: React.ReactNode }) => {
    const log = true;

    //if(!accountService.isLogged()){
    if(!log){
      return <Navigate to="/login" />
    }

    return children
}

export default AuthGuard