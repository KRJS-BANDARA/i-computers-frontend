import { useState } from "react";
import toast from "react-hot-toast";
import { FaTwitter } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import mediaUpload from "../utils/mediaUpload";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdGpscHd3YmlxaG5zdHJkdmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NDgzNjEsImV4cCI6MjA5MzEyNDM2MX0.U1_NKlkOA1i6_MkQ_KzfkOSEtrS842InOru-OTFDLEY";
const url = "https://jjtjlpwwbiqhnstrdvao.supabase.co"

const supabase = createClient(url, key);

export default function TestPage() {
    const [file, setFile] = useState(null);

    async function upLoadFile() {
        console.log(file); 
    //     supabase.storage.from("images").upload(file.name, file).then((res) => {
    //         const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
    //         console.log(publicUrl);
    // });

    const res = await mediaUpload(file);
    console.log(res);

    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0])
                }
            }/>
            <button
            onClick={upLoadFile} 
            className="bg-blue-600 p-4 rounded-lg text-white" >
                Upload
            </button>
        </div>
    );
}

// function TestPage() {
//     const [score, setScore] = useState(50);
//     const [mood, setMood] = useState("😊");
//     const [isFollowed, setIsFollowed] = useState(false);
// //let score = 50

//     return (
//         <div className='w-full h-full flex bg-green-400 p-12.5 justify-center items-center'>
//             <div className='w-[450px] h-[350px] bg-white flex justify-center items-center flex-col rounded-lg'>
//                 {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident animi cumque sit placeat dignissimos ex asperiores, tempora consequatur enim, adipisci itaque similique. Magni assumenda unde possimus tempore quaerat optio rerum ex est, eligendi, nemo, porro commodi adipisci! Nam excepturi ut officiis quod sit ullam? Quaerat dignissimos laudantium cupiditate, iure esse culpa adipisci quas eaque quod blanditiis autem expedita laborum necessitatibus voluptates voluptas tempora quae accusantium velit, quo dicta provident. Et maxime est ducimus, exercitationem obcaecati tempora temporibus numquam illo ad? */}
            
//             {/* <div className='w-[50px] h-[50px] bg-blue-700'></div>
//             <div className='w-[50px] h-[50px] bg-red-700 ml-[100px]'></div>
//             <div className='w-[50px] h-[50px] bg-green-700'></div>
//             <div className='w-[50px] h-[50px] bg-black'></div> */}

//                 <h1 className="font-bold text-7xl">{score}</h1>
//                 <div className="w-full flex h-[100px] justify-center items-center">
                   
//                     <button className='bg-blue-700 text-white px-4 py-2 rounded-lg mr-4' onClick={() => {
//                         //score += 1
//                         setScore(score + 1) 
//                         //alert(score)
//                         }
//                         }>Increase</button>
//                     <button className='bg-red-700 text-white px-4 py-2 rounded-lg' onClick={() => {
//                         //score -= 1
//                         setScore(score - 1)
//                         //alert(score)
//                     }
//                     }>Decrease</button>
//                 </div>
//                     <h1 className='w-full h-[100px] flex justify-center items-center text-7xl'>{mood}</h1>  
//                     <div className="w-full h-[100px] flex justify-center items-center">
//                     <button className='bg-blue-700 text-white px-4 py-2 rounded-lg mr-4' onClick={
//                         () => {
//                             setMood("😒")
//                             toast.success("Mood set to Sad", {icon: '😒'})
//                             }
//                             }>Sad</button>
//                     <button className='bg-red-700 text-white px-4 py-2 rounded-lg' onClick={() => {  
//                         setMood("😊")
//                         toast.success("Mood set to Neutral")
//                         }
//                         }>Neutral</button>
//                     <button className='bg-green-700 text-white px-4 py-2 rounded-lg ml-4' onClick={() => {
//                         setMood("😃")
//                         toast.success("Mood set to Happy")
//                         }
//                         }>Happy</button>
//                     </div>
//                     <FaTwitter onClick={() => {
//                         toast.success("follow us on Twitter", 
//                             {icon: <FaTwitter className="text-blue-700"/>})
//                         //setIsFollowed(true)
//                         setIsFollowed(!isFollowed)
//                     }
//                 } 
//                     className={isFollowed ?"text-[100px] text-blue-700":"text-[100px] text-red-700"}/>                                                                                                                                                                                                                                                             
//             </div>
//         </div>
//     );
// }

// export default TestPage