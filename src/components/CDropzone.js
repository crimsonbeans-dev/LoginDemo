import { CircularProgress } from "@mui/material";
import React, { useState, useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillCloudArrowUpFill, BsFillCloudCheckFill } from "react-icons/bs";

const baseStyle = {
  marginTop: "20px",
  marginBottom: "20px",
  height: "50vh",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function CDropzone({
  fileUpload,
  userData,
  isUploading = false,
  setFileErr,
}) {
  const [isUploaded, setIsUploaded] = useState(
    userData?.fileUrl ? false : false
  );
  const [fileName, setFileName] = useState("");
  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    setFileErr(false);
    console.log(acceptedFiles);
    setFileName(acceptedFiles[0]?.name);
    await fileUpload(acceptedFiles);
    setIsUploaded(true);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isUploaded ? (
          <BsFillCloudCheckFill size={100} color={"#00e676"} />
        ) : isUploading ? (
          <CircularProgress color="inherit" size={50} />
        ) : (
          <BsFillCloudArrowUpFill
            size={100}
            color={isDragAccept ? "#00e676" : isDragReject ? "ff1744" : "grey"}
          />
        )}
        {fileName ? (
          <p>{fileName}</p>
        ) : (
          !isUploaded &&
          !isUploading && (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )
        )}
        {isUploading && <p>Uploading.......</p>}
      </div>
    </div>
  );
}
