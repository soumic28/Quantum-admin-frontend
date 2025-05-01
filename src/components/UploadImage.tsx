import axios from "axios";
import { useState } from "react"
import { preSignedUrl } from "../api/s3";
import { CLOUDFRONT_URL } from "../config";

export function UploadImage({ setKey,folder,id }: {
    setKey: React.Dispatch<React.SetStateAction<string>>;
    folder:string;
    id:string;
}) {
    const [uploading, setUploading] = useState(false);

    async function onFileSelect(e: any) {
        setUploading(true);
        try {
            const file = e.target.files[0];
            const response = await preSignedUrl(folder,id,file.name);
            if(!response|| !response.data){
                return;
            }
            const presignedUrl = response.data.data.url;
            const formData = new FormData();
            formData.set("bucket", response.data.data.fields["bucket"])
            formData.set("X-Amz-Credential", response.data.data.fields["X-Amz-Credential"]);
            formData.set("X-Amz-Date", response.data.data.fields["X-Amz-Date"]);
            formData.set("key", response.data.data.fields["key"]);
            formData.set("Policy", response.data.data.fields["Policy"]);
            formData.set("X-Amz-Signature", response.data.data.fields["X-Amz-Signature"]);
            formData.set("X-Amz-Algorithm", response.data.data.fields["X-Amz-Algorithm"]);
            formData.append("file", file);
            await axios.post(presignedUrl, formData);
            setKey(`${CLOUDFRONT_URL}/${folder}/${id}/${file.name}`);
        } catch(e) {
            console.log(e)
        }
        setUploading(false);
    }

    return <div>
        <div className="w-40 h-40 rounded border text-2xl cursor-pointer">
                <div className="h-full flex justify-center flex-col relative w-full">
                    <div className="h-full flex justify-center w-full pt-16 text-4xl">
                    {uploading ? <div className="text-sm">Loading...</div> : <>
                        +
                        <input className="bg-red-400 w-40 h-40" type="file" style={{position: "absolute", opacity: 0, top: 0, left: 0, bottom: 0, right: 0, width: "100%", height: "100%"}} onChange={onFileSelect} />
                    </>}
                </div>
            </div>
        </div>
    </div>
}