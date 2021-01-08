import axiosClient from "./axiosClient";
const config={headers:{"Content-Type":"multipart/form-data"}

};
class Api{
    createImageDensenet121=(filepath)=>{
        const url ="/predictImage/Densenet121";
        return axiosClient.post(url,filepath,config)
    }
    createImageXception=(filepath)=>{
        const url = "predictImage/Xception";
        return axiosClient.post(url,filepath,config)
    }
    createImageDensenet201=(filepath)=>{
        const url = "predictImage/Densenet201";
        return axiosClient.post(url,filepath,config)
    }
    
}
const api =new Api();
export default api; 
