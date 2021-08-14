import React, { useState, useEffect } from "react";
import encodeImageFileAsURL from "../utility/encodeImageFileAsURL";

function UploadButton(props) {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  useEffect(() => {
    setInputFile(document.getElementById("input-file"));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    inputFile?.click();
  };
  const handleDisplayFileDetails = () => {
    let fileNameSummary = inputFile.files[0].name.substring(1, 20) + "...";
    console.log("input file", inputFile.files[0]);

    encodeImageFileAsURL(inputFile, (result) => {
      props.handleImageUpload(result);
    });

    inputFile?.files && setUploadedFileName(fileNameSummary);
  };
  return (
    <div className="m-3">
      <label className="mx-3">{props.buttonName} </label>
      <input
        id="input-file"
        onChange={handleDisplayFileDetails}
        className="d-none"
        type="file"
      />
      <button
        onClick={handleUpload}
        className={`btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
        disabled
      >
        {uploadedFileName ? uploadedFileName : "Upload"}
      </button>
      <br />
      {/* <Image src={image && image} style={{ paddingTop: "10px" }} rounded /> */}
    </div>
  );
}

export default UploadButton;
