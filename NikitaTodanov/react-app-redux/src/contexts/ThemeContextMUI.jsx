import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeModeContext = React.createContext({
  toogleColorMode: () => {},
});

function ThemeContextMUI(props) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toogleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        console.log("toogleColorMode()", mode);
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

ThemeContextMUI.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ThemeContextMUI;
