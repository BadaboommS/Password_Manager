import { useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';


export default function FileList({ fileList }: { fileList: StorageDataInfoInterface[] }) {
    const { setSelectedFile } = useContext(GeneralContext);

    function handleSetActiveFile(selectedFile: string): void{
        setSelectedFile(selectedFile);
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
                            </tr>
                        </thead>
                        <tbody>
                            {fileList.map((file: StorageDataInfoInterface, i: number) => {
                                return(
                                    <tr key={i} onClick={() => handleSetActiveFile(file.fileName)} className='hover:cursor-pointer'>
                                        <td>{file.fileName}</td>
                                        <td>{file.fileModified.toString()}</td>
                                        <td>{file.fileSize}</td>
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