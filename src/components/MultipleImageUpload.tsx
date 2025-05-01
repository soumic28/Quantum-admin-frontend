import axios from "axios";
import { useState } from "react";
import { preSignedUrl } from "../api/s3";
import { CLOUDFRONT_URL } from "../config";
import { cn } from "../utils/cn";
import { useToast } from "../ui/use-toast";

export function MultipleUploadImage({ setKeys, folder, id ,keys,className}: {
    setKeys: React.Dispatch<React.SetStateAction<string[]>>;
    folder: string;
    id: string;
    keys:string[];
    className?:string;
}) {
    const [uploading, setUploading] = useState(false);
    const {toast} = useToast();
    async function onFilesSelect(e: any) {
        setUploading(true);
        setUploading(true);
        if (!e.target.files) return; 

        const files = Array.from(e.target.files) as File[]; 
        const uploadedKeys: string[] =[...keys];

        for (const file of files) {
            try {
                const response = await preSignedUrl(folder, id, file.name);
                if (!response || !response.data) {
                    continue;
                }
                const presignedUrl = response.data.data.url;
                const formData = new FormData();
                formData.set("bucket", response.data.data.fields["bucket"]);
                formData.set("X-Amz-Credential", response.data.data.fields["X-Amz-Credential"]);
                formData.set("X-Amz-Date", response.data.data.fields["X-Amz-Date"]);
                formData.set("key", response.data.data.fields["key"]);
                formData.set("Policy", response.data.data.fields["Policy"]);
                formData.set("X-Amz-Signature", response.data.data.fields["X-Amz-Signature"]);
                formData.set("X-Amz-Algorithm", response.data.data.fields["X-Amz-Algorithm"]);
                formData.append("file", file);

                await axios.post(presignedUrl, formData);
                uploadedKeys.push(`${CLOUDFRONT_URL}/${folder}/${id}/${file.name}`);
            } catch (e:any) {
                toast({
                    title:"error",
                    description:e.message,
                    variant:"destructive"
                })
            }
        }

        setKeys(uploadedKeys);
        setUploading(false);
    }

    return (
        <div className={cn("w-40 h-40",className)}>
            <div className="w-full h-full rounded border text-2xl cursor-pointer">
                <div className="h-full flex justify-center flex-col relative w-full">
                    <div className="h-full flex justify-center w-full pt-16 text-4xl">
                        {uploading ? <div className="text-sm">Uploading...</div> : <>
                            +
                            <input className="bg-red-400 w-40 h-40" type="file" multiple style={{ position: "absolute", opacity: 0, top: 0, left: 0, bottom: 0, right: 0, width: "100%", height: "100%" }} onChange={onFilesSelect} />
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
}