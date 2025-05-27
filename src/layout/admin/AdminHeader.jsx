import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Icons } from '../../assets/icons'

const AdminHeader = () => (
   <StyledAppBar position="static">
      <StyledToolbar>
         <StyledNavs>
            <Logo src={Icons.gadgetarium} alt="Gadgetarium" />
            <Box>
               <NavLink>Товары</NavLink>
               <NavLink>Заказы</NavLink>
               <NavLink>Отзывы и рейтинг</NavLink>
            </Box>
         </StyledNavs>

         <StyledButton variant="contained">Создать рассылку</StyledButton>

         <AdminBox>
            <UserIcon src={Icons.user} alt="Администратор" />
            <Typography color="#fff">Администратор</Typography>
         </AdminBox>
      </StyledToolbar>
   </StyledAppBar>
)

export default AdminHeader

const StyledNavs = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '700px',
})

const StyledAppBar = styled(AppBar)`
   background-color: #1a1a25;
   box-shadow: none;
   border-bottom: 2px solid #6a1b9a;
   padding: 0 20px;
`

const StyledToolbar = styled(Toolbar)`
   display: flex;
   align-items: center;
   justify-content: space-between;
`

const NavLink = styled(Button)`
   color: #fff;
   text-transform: none;
   font-size: 16px;
   margin: 0 10px;
   &:hover {
      background-color: rgba(255, 255, 255, 0.1);
   }
`

const StyledButton = styled(Button)`
   background-color: #cb11ab;
   color: #fff;
   border-radius: 46px;
   text-transform: none;
   font-weight: bold;
   &:hover {
      background-color: #b4149a;
   }
   margin-left: auto;
   margin-right: 20px;
`

const Logo = styled('img')`
   height: 40px;
   margin-right: 20px;
`

const AdminBox = styled(Box)`
   border-left: 1px solid white;
   padding-left: 20px;
   display: flex;
   align-items: center;
   gap: 10px;
`

const UserIcon = styled('img')`
   height: 40px;
   width: 40px;
   border-radius: 50%;
`
