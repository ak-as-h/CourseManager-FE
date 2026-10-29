import {BASEURL} from "../services/BaseURL"
import axiosConfig from "../services/AxiosConfig"

 export const addCourse= async(reqBody)=>{
    return await axiosConfig("post",`${BASEURL}/courseDatas`,reqBody)
 }

 export const getAllCourse = async()=>{
   return await axiosConfig("get",`${BASEURL}/courseDatas`)
 }

 export const updateCourse=async(id,reqBody)=>{
   return await axiosConfig("put",`${BASEURL}/courseDatas/${id}`,reqBody)
 }


 export const deleteCourse=async(id)=>{
   return await axiosConfig("delete",`${BASEURL}/courseDatas/${id}`)
 }