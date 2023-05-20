import axios from 'axios'

export const uploadcloudnary = async (file)=>{
    // console.log("files "+file);
    const formData = new FormData();
    formData.append("file",file)
    formData.append("upload_preset", "InstaCloneTrial");
    formData.append("cloud_name", "dbvurfvz8");
    try{
        const {data} = await axios.post("https://api.cloudinary.com/v1_1/dbvurfvz8/image/upload", formData)
        console.log(" data "+JSON.stringify(data));
        return {publicId: data?.public_id, url: data?.secure_url }

    }catch(e){
        console.log("error i n upload :"+e);
    }
  
}