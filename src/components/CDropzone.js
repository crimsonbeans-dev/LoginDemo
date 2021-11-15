
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
  
  export default function CDropzone(props) {
    const [isUploaded, setIsUploaded] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the files
      console.log("acceptedFiles", acceptedFiles);
      setIsUploaded(true);
    }, []);
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({ accept: "image/*", onDrop });
  
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
          ) : (
            <BsFillCloudArrowUpFill
              size={100}
              color={isDragAccept ? "#00e676" : isDragReject ? "ff1744" : "grey"}
            />
          )}
          {!isUploaded && (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>
    );
  }
  