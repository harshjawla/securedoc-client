import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

export default function SharedLoadingPage() {
    const { username, docName } = useParams();
    const [file, setFile] = useState();
    const [flag, setFlag] = useState(0);
    const navigate = useNavigate();
  
    useEffect(()=>{
      async function allCheck(){
        const data = {
          username, docName
        };
  
        const response = await fetch("https://securedoc-server.onrender.com/sharing", {
          method: "POST",
          headers: {
            "content-type" : "application/json"
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
  
        if(response.ok){
          const receivedData = await response.json();
          setFile(receivedData);
        } else{
          setFlag(1);
          console.log("File not found");
        }
   
      }
  
      allCheck();
    })
  
    useEffect(()=>{
      if(file){
        return navigate("/editor", { state: { data: file }});
      }
    }, [file, navigate])
  
    useEffect(()=>{
      if(flag===1){
        return navigate("/user");
      }
    }, [flag, navigate])
  
    return (
      <>
        <Loading />
      </>
    );
}