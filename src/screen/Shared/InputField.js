import React, { useState } from "react";
import { Controller } from "react-hook-form";
import CssTextField from "./CssTextField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Typography, IconButton } from "@mui/material";
const InputField = ({
  errors,
  control,
  inputType,
  multiline = false,
  name,
  placeholder,
  noOfRows,
  defaultValue,
  rules = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log("inside", errors);
  return (
    <>
      <Controller
        render={({ field }) => (
          <>
            <CssTextField
              {...field}
              error={errors ? true : false}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: inputType === "password" && (
                  <IconButton onClick={() => setIsVisible((prev) => !prev)}>
                    {isVisible ? (
                      <AiOutlineEye fontSize={18} color={"gray"} />
                    ) : (
                      <AiOutlineEyeInvisible fontSize={18} color={"gray"} />
                    )}
                  </IconButton>
                ),
              }}
              multiline={multiline}
              placeholder={placeholder ?? ""}
              rows={noOfRows ?? 1}
              type={
                inputType === "password"
                  ? isVisible
                    ? "text"
                    : "password"
                  : inputType
              }
              color="primary"
              // helperText={errors && errors?.message}
            />
          </>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
      />
      {errors && (
        <Typography
          style={{ color: "crimson", fontSize: "12px", marginLeft: "5px" }}
        >
          {errors?.message}
        </Typography>
      )}
    </>
  );
};

export default InputField;
