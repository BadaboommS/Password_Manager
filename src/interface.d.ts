export interface IElectronAPI {
    saveText: (value: string) => Promise<void>,
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}