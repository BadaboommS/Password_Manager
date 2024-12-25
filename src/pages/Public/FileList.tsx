import { useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';


export default function FileList({list}: {list: string[]}) {
    const { setSelectedFile } = useContext(GeneralContext);

    function handleSetActiveFile(selectedFile: string): void{
        setSelectedFile(selectedFile);
    }

    return (
        <>
            {(list[0])
                ?   <table>
                        <thead>
                            <tr>
                                <th>File</th>
                                <th>Last modified</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((fileName: string, i: number) => {
                                return(
                                    <tr key={i}>
                                        <td onClick={() => handleSetActiveFile(fileName)}>{fileName}</td>
                                        {/* <td>{fileInfo.lastModified}</td>
                                        <td>{fileInfo.size}</td> */}
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