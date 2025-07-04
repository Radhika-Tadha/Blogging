import { useLocation, useNavigate } from "react-router-dom";
import CreateBlog from "./CreateBlog";

export default function EditWrapper() {
  const location = useLocation();
  const navigate=useNavigate();
  
  const blogToEdit = location.state?.blogToEdit;

  if(!blogToEdit){
    navigate("/AllBlogs");
    return null;
  }else{
    navigate("/AllBlogs");
  }

  return <CreateBlog blogToEdit={blogToEdit} />;
}
