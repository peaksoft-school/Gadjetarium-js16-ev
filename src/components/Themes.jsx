import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
   palette: {
      primary: {
         main: '#CB11AB',
         Liteblack: `#292929`,
         black: `#1A1A25`,
         gray: `#384255`,
      },
      secondary: {
         main: '#F10000',
         blue: `#2C68F5`,
         green: `#2FC509`,
         brightGreen: `#3CDE14`,
         brown: `#F99808`,
         darkGreen: `#08A592`,
      },
      tertiary: {
         main: 'CB11AB',
         blueGray: `#909CB5`,
         grayBlue: `#91969E`,
         lightGray: `#CDCDCD`,
         veryLightGray: `#E8E8E8`,
         GrayInput: `#E0E2E7`,
      },
      quaternary: {
         main: '#F4F4F4',
      },
   },
   typography: {
      fontFamily: '"Inter", sans-serif',
      h1: {
         fontFamily: '"Ubuntu", sans-serif',
         fontWeight: 700,
         fontSize: '2.5rem',
         lineHeight: 1.2,
      },
      h2: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 500,
         fontSize: '26px',
         lineHeight: 1.1,
      },
      h2Bold: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 700,
         fontSize: '28px',
         lineHeight: 'auto',
      },
      h3: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 500,
         fontSize: '28px',
         lineHeight: 1,
      },
      h4: {
         fontFamily: '"Inter", sans-serif',
         fontSize: '24px',
      },
      h5: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 500,
         fontSize: '22px',
         lineHeight: 1,
      },
      h6: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 600,
         fontSize: '20px',
         lineHeight: 1.2,
      },
      subtitle1: {
         fontFamily: '"Inter", sans-serif',
         fontSize: '18px',
         lineHeight: 1.6,
      },
      subtitle2: {
         fontFamily: '"Inter", sans-serif',
         fontSize: '19px',
         lineHeight: 1.3,
      },
      body1: {
         fontFamily: '"Inter", sans-serif',
         fontSize: '16px',
         lineHeight: 1.4,
      },
      bodyLight: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 300,
         fontSize: '16px',
         lineHeight: 1,
      },
      bodyMedium: {
         fontFamily: '"Inter", sans-serif',
         fontWeight: 500,
         fontSize: '10px',
         lineHeight: 1.4,
      },
   },
   components: {
      MuiTypography: {
         styleOverrides: {
            root: {
               '&.MuiTypography-h4-regular': {
                  fontWeight: 400,
               },
               '&.MuiTypography-h4-medium': {
                  fontWeight: 500,
               },
               '&.MuiTypography-h4-bold': {
                  fontWeight: 700,
               },
            },
         },
      },
   },
})

export const Themes = ({ children }) => (
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
