import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Item from "./Item";
import useMatrix from "./useMatrix";

const Limitless = () => {
  const [
    fields,
    setFields,
    start,
    setStart,
    setReset,
    handleNewValue,
    width,
    setWidth,
    height,
    setHeight,
    render,
    setRender,
  ] = useMatrix();

  const handleReset = () => {
    setReset(true);
    setRender(false);
  };

  if (!fields && !fields[0][0].color) {
    return <div />;
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 1, flexWrap: "wrap" }}
      >
        <Button
          size="small"
          disabled={start}
          variant="contained"
          color="success"
          sx={{ pt: 0.8, m: 0.3 }}
          onClick={() => setStart((prev) => !prev)}
        >
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            Start new life
          </Typography>
        </Button>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mr: 8 }}
        >
          <TextField
            disabled={start}
            type="number"
            value={width}
            size="small"
            label={<Typography variant="body2">Width</Typography>}
            variant="outlined"
            onChange={(e) => setWidth(Number(e.target.value))}
            sx={{ m: 1, width: 100 }}
          />
          <TextField
            disabled={start}
            type="number"
            value={height}
            size="small"
            label={<Typography variant="body2">Height</Typography>}
            variant="outlined"
            onChange={(e) => setHeight(Number(e.target.value))}
            sx={{ m: 1, width: 100 }}
          />
        </Stack>
        <Button
          variant="contained"
          size="small"
          color="info"
          sx={{ pt: 0.8, m: 0.3 }}
          onClick={handleReset}
        >
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            Reset
          </Typography>
        </Button>
      </Stack>
      <Stack
        justifyContent="start"
        alignItems="center"
        sx={{ height: "84vh", width: "100vw" }}
        key={render}
      >
        {fields.map((f) => (
          <Stack
            key={Math.floor(Math.random() * 10000000)}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              mb: 0.5,
            }}
          >
            {f.map((i) => (
              <Item
                key={i.id}
                field={i}
                fields={fields}
                setFields={setFields}
                disabled={start}
                handleNewValue={handleNewValue}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Limitless;
