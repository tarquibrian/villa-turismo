import { useContext, useState } from "react";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import "./write.css";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const NewPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.name,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:4000/api/posts", newPost);
      window.location.replace("http://localhost:3000/#/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div>
      <NavbarAdmin />
      <Link className="blogItem-link" to={`/admin-panel`}>
        atras
      </Link>
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Titulo"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Ingrese texto..."
              type="text"
              className="writeInput writeText"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
            Publicar
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};
