 const theme = {
   palette: {
     primary: {
       main: "#9c27b0",
       light: "#ab47bc",
       dark: "#7b1fa2",
       contrastText: "#fff",
     },
     secondary: {
       main: "#d500f9",
       light: "#e040fb",
       dark: "#6a1b9a",
       contrastText: "#fff",
     },
   },
   typography: {
     fontFamily: [
       '"Helvetica Neue"',
       '"Segoe UI"',
       "Roboto",
       "Arial",
       "sans-serif",
     ].join(","),
   },
   visibleSeparator: {
     width: "100%",
     borderBottom: "1px solid rgba(0,0,0,0.1)",
     marginBottom: 20,
   },
   invisibleSeparator: {
     border: "none",
     margin: 4,
   },
 };

export default theme;