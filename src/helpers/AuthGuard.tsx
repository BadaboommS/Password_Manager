import { Navigate } from "react-router";
import { accountService } from "../services/account.service";

const AuthGuard = ({ children } : { children: React.ReactNode }) => {

    if(!accountService.isLogged()){
      return <Navigate to="/login" />
    }

    return children
}

export default AuthGuard