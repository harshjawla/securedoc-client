import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";

export default function AllLoadingPage() {
  const { username, docName } = useParams();
  const [file, setFile] = useState();
  const [flag, setFlag] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    async function allCheck(){
      const data = {
        username, docName
      };

      const response = await fetch("https://securedoc-server.onrender.com/all", {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data),
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
  }, [file])

  useEffect(()=>{
    if(flag===1){
      return navigate("/user");
    }
  }, [flag])

  return (
    <>
      <Loading />
    </>
  );
}
