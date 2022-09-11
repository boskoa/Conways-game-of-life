import { Button, Stack } from "@mui/material";
import React from "react";

const Item = React.memo(
  ({ field, fields, setFields, disabled, handleNewValue }) => {
    const handleClick = () => {
      if (!disabled) {
        const value = field.value === 0 ? 1 : 0;
        setFields(() => handleNewValue(field.id, value));
      }
    };

    return (
      <Stack justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color={field.color}
          onClick={handleClick}
          sx={{
            width: `${field.dimensions}px`,
            height: `${field.dimensions + fields.length * 1.8}px`,
            mr: 0.5,
          }}
        />
      </Stack>
    );
  }
);

export default Item;
