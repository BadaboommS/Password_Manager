import { useContext } from 'react';
import { MdLogin ,MdDelete } from "react-icons/md";
import { GeneralContext } from '../../context/GeneralContextProvider';
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';
import { PublicContext } from '../../context/PublicContextProvider';

export default function FileList({ fileList }: { fileList: StorageDataInfoInterface[] }) {
    const { setReload } = useContext(PublicContext);
    const { setSelectedFile } = useContext(GeneralContext);

    function handleSetActiveFile(selectedFile: string): void{
        setSelectedFile(selectedFile);
    }


    function handleFileDelete(fileName: string): void{
        if(window.confirm("Confirm File suppression ? (this is permanent)") === false){
            return null
        }

        window.electronAPI.deleteFile(fileName);
        setReload(true);
    }

    return (
        <>
            {(fileList[0])
                ?   <table>
                        <thead>
                            <tr>
                                <th>File</th>
                                <th>Last modified</th>
                                <th>Size</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileList.map((file: StorageDataInfoInterface, i: number) => {
                                return(
                                    <tr key={i} className='hover:cursor-pointer'>
                                        <td>{file.fileName}</td>
                                        <td>{file.fileModified.toString()}</td>
                                        <td>{file.fileSize}</td>
                                        <td className='flex justify-evenly'>
                                            <button title="Open" onClick={() => handleSetActiveFile(file.fileName)}>
                                                <MdLogin size='24'/>
                                            </button>
                                            <button title="Delete File" onClick={() => handleFileDelete(file.fileName)}>
                                                <MdDelete size='24'/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                :   <></>
            }
        </>
  )
}