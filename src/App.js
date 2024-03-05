import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";
import RegisterPage from "./components/RegisterPage";
import EditorPage from "./components/EditorPage";
import CopyComponent from "./components/CopyComponent";
import AllLoadingPage from "./components/AllLoadingPage";
import SharedLoadingPage from "./components/SharedLoadingPage";


export default function App(){
  return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/user" element={<UserPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/test" element={<CopyComponent />} />
      <Route path="/:username/:docName/all" element={<AllLoadingPage/>} /> 
      <Route path="/:username/:docName/shared" element={<SharedLoadingPage/>} /> 
    </Routes>
  );
}