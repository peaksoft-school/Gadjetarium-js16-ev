import { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Icons } from '../../assets/icons'
import Modal from '../../components/UI/Modal'
import Mailing from '../../components/Mailing'
import { useNavigate } from 'react-router'

const AdminHeader = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [profileHover, setProfileHover] = useState(false)
   const navigate = useNavigate()

   const handleOpenModal = () => setIsModalOpen(true)
   const handleCloseModal = () => setIsModalOpen(false)

   const handleLogout = () => {
      localStorage.clear()
      navigate('/sign-in')
      window.location.reload()
   }

   return (
      <>
         <StyledAppBar position="static">
            <StyledToolbar>
               <StyledNavs>
                  <Logo src={Icons.gadgetarium} alt="Gadgetarium" />
                  <Box>
                     <NavLink onClick={() => navigate('/admin/products')}>
                        Товары
                     </NavLink>
                     <NavLink onClick={() => navigate('/admin/orders')}>
                        Заказы
                     </NavLink>
                     <NavLink onClick={() => navigate('/admin/reviews')}>
                        Отзывы и рейтинг
                     </NavLink>
                  </Box>
               </StyledNavs>

               <StyledButton variant="contained" onClick={handleOpenModal}>
                  Создать рассылку
               </StyledButton>

               <AdminBox
                  onMouseEnter={() => setProfileHover(true)}
                  onMouseLeave={() => setProfileHover(false)}
               >
                  <UserIcon src={Icons.user} alt="Администратор" />
                  <Typography color="#fff">Администратор</Typography>
                  {profileHover && (
                     <LogoutHint
                        onMouseEnter={() => setProfileHover(true)}
                        onMouseLeave={() => setProfileHover(false)}
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }}
                     >
                        Выйти
                     </LogoutHint>
                  )}
               </AdminBox>
            </StyledToolbar>
         </StyledAppBar>

         <Modal open={isModalOpen} onClose={handleCloseModal}>
            <ModalBox>
               <Mailing
                  onCancel={handleCloseModal}
                  onSubmit={handleCloseModal}
               />
            </ModalBox>
         </Modal>
      </>
   )
}

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
   position: relative;
`

const UserIcon = styled('img')`
   height: 40px;
   width: 40px;
   border-radius: 50%;
`

const ModalBox = styled(Box)`
   padding: 20px;
   width: 100%;
   max-width: 600px;
`

const LogoutHint = styled('div')`
   margin-top: 8px;
   background: #fff;
   color: #cb11ab;
   font-size: 18px;
   font-weight: 600;
   border-radius: 8px;
   padding: 10px 24px;
   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
   position: absolute;
   left: 50%;
   top: 100%;
   transform: translateX(-50%);
   white-space: nowrap;
   z-index: 10;
   transition: all 0.2s;
   pointer-events: auto;
`
