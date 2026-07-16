import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdGpscHd3YmlxaG5zdHJkdmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NDgzNjEsImV4cCI6MjA5MzEyNDM2MX0.U1_NKlkOA1i6_MkQ_KzfkOSEtrS842InOru-OTFDLEY";
const url = "https://jjtjlpwwbiqhnstrdvao.supabase.co"

const supabase = createClient(url, key);

export default function mediaUpload(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file provided");
        } else {
            const timestamp = new Date().getTime();
            const fileName = timestamp + "_" + file.name;
              supabase.storage.from("images").upload(fileName, file).then((res) => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl); 
    }).catch((error) => {        
        reject(error);
    });
        }
    });
}