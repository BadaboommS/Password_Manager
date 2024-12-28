import { useContext, useEffect } from "react";
import { GeneralContext } from "../../../context/GeneralContextProvider";
import { MdExitToApp } from "react-icons/md";
import { accountService } from "../../../services/account.service";
import { useNavigate } from "react-router";

export default function LogoutControl() {
    const { selectedFile, setSelectedFile } = useContext(GeneralContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(selectedFile !== ""){
            accountService.setActiveFile(selectedFile);
        }else{
            accountService.logout();
        }
    }, [selectedFile]);

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