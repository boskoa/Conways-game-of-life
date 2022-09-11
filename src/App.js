import {
  Button,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Limited from "./Limited";
import Limitless from "./Limitless";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minWidth: 0 },
      },
    },
  },
});

const App = () => {
  const [limited, setLimited] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack>
        {limited ? <Limited /> : <Limitless />}
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            pt: 0.8,
            m: 0.3,
          }}
          onClick={() => setLimited(!limited)}
        >
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            {`Change to ${limited ? "limitless" : "limited"}`}
          </Typography>
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
