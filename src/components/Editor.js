import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "./Loading";

export default function Editor(props) {
  const [loader, setLoader] = useState(true);
  const [content, setContent] = useState("");
  useEffect(() => {
    function setValue() {
      setContent(props.data.content);
    }

    setValue();
  }, [props.data.content]);

  useEffect(() => {
    if (content !== "") {
      setLoader(false);
    }
  }, [content]);

  async function handleClick() {
    try {
      setLoader(true);
      const data = {
        name: props.data.name,
        username: props.data.username,
        content: content,
      };

      const response = await fetch("https://securedoc-server.vercel.app/update", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <>
      {loader && <Loading />}
      <div className="flex mt-10 justify-center h-screen">
        <div className="w-3/5 h-2/3">
          <ReactQuill
            value={content}
            onChange={(newValue) => setContent(newValue)}
            theme={"snow"}
            modules={modules}
            formats={formats}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClick}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 mr-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
