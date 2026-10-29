import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import AddCourse from "./pages/AddCourse";
import AllCourses from "./pages/AllCourses";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/add-course" element={<AddCourse/>} />
        <Route path ="/all-courses" element={<AllCourses/>} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
    
  );
}

export default App;
