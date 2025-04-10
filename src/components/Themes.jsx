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
})

export const Themes = ({ children }) => (
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
