import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import React from "react";

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "field",
})(({ theme, field }) => ({
  width: `${field.dimensions}px`,
  height: `${field.dimensions}px`,
  mr: 0.5,
  backgroundColor:
    field.color === "success"
      ? theme.palette.success.main
      : theme.palette.warning.main,
}));

const LimItem = React.memo(
  ({ field, fields, setFields, disabled, handleNewValue }) => {
    const handleClick = () => {
      if (!disabled) {
        const value = field.value === 0 ? 1 : 0;
        setFields(() => handleNewValue(field.id, value));
      }
    };

    return (
      <Stack justifyContent="center" alignItems="center">
        <StyledBox
          field={field}
          onClick={handleClick}
          sx={{
            width: 100,
            height: 100,
            mr: 0.5,
          }}
        />
      </Stack>
    );
  }
);

export default LimItem;
