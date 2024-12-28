import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContextProvider";
import { MdExitToApp } from "react-icons/md";
import { accountService } from "../../../services/account.service";
import { useNavigate } from "react-router";

export default function LogoutControl() {
    const { setSelectedFile } = useContext(GeneralContext);
    const navigate = useNavigate();

    function handleLogout(): void{
        if(window.confirm("Logout ?") === false){
            return null
        }
        setSelectedFile('');
        accountService.logout();
        navigate('/');
    }

    return (
        <button title="Exit File" className="bg-red-500" onClick={() => handleLogout()}>
            <MdExitToApp size='24'/>
        </button>
    )
}