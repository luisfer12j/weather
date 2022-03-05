import { useEffect, useState } from "react";
import axios from "axios";


const useFecth = (url)=>{
    const [res,setRes]=useState({});

    useEffect(() => {
        axios.get(url)
        .then((e)=>{
            setRes(e.data)
        })
    },[url]);
    //console.log(res)
    return{res};
}

export default useFecth;