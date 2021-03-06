interface Props {
    isPrivate?: boolean;
    multiple?: boolean;
    authSuccess?: Function;
    authFailed?: Function;
    beforeUpload?: Function;
    uploadProgress?: Function;
    uploadFileSuccess?: Function;
    uploadFileFailed?: Function;
    uploadError?: Function;
    uploadFinish?: Function;
    onSuccess?: Function;
    onChange?: Function;
    children?: object;
}
declare const Upload: (props: Props) => JSX.Element;
export default Upload;
