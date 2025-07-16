import { useState, useEffect } from 'react'
import {
   AppBar,
   Toolbar,
   Typography,
   IconButton,
   Badge,
   InputBase,
   Button,
   Stack,
   styled,
   Box,
} from '@mui/material'
import { Icons } from '../../assets/icons'
import { useNavigate } from 'react-router'
import CartHoverTrigger from '../../components/UI/CartHoverTrigger'
import { fetchFavorites } from '../../store/lk-favorite/favoritesThunk'
import { useDispatch, useSelector } from 'react-redux'

const UserHeader = ({ compareCount = 0, basketCount = 0 }) => {
   const navArray = ['Главная', 'О магазине', 'Доставка', 'FAQ', 'Контакты']
   const { favorites } = useSelector((state) => state.favorite)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchFavorites())
   }, [])

   const [isScrolled, setIsScrolled] = useState(false)
   const [profileHover, setProfileHover] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY

         setIsScrolled(scrollPosition > 50)
      }

      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const handleLogout = () => {
      localStorage.clear()
      navigate('/sign-in')
      window.location.reload() // или просто перезагрузить страницу
   }

   const handleFavoritesNavigate = () => navigate('/user/favorites')

   return (
      <StyledAppBar position={isScrolled ? 'fixed' : 'static'}>
         <TopRow sx={{ display: isScrolled ? 'none' : 'flex' }}>
            <TopInfo>
               <Logo src={Icons.gadgetarium} alt="Gadgetarium Logo" />

               <NavContainer>
                  {navArray.map((item) => (
                     <NavButton sx={{ whiteSpace: 'nowrap' }} key={item}>
                        {item}
                     </NavButton>
                  ))}
               </NavContainer>
            </TopInfo>

            <ContactBox>
               <PhoneText>+996 (999) 160 609</PhoneText>
               <ProfileIconBox
                  onMouseEnter={() => setProfileHover(true)}
                  onMouseLeave={() => setProfileHover(false)}
               >
                  <WhiteIcon
                     aria-label="user profile"
                     onClick={() => navigate('/user/account/order-history')}
                  >
                     <IconImage src={Icons.user} alt="User" />
                  </WhiteIcon>
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
               </ProfileIconBox>
            </ContactBox>
         </TopRow>

         <BottomRow isScrolled={isScrolled}>
            <Logo
               src={Icons.gadgetarium}
               alt="Gadgetarium Logo"
               sx={{ display: isScrolled ? 'block' : 'none' }}
            />

            <InputContainer>
               <CatalogButton
                  startIcon={<IconImage src={Icons.catalog} alt="Catalog" />}
               >
                  Каталог
               </CatalogButton>

               <SearchContainer>
                  <StyledInputBase placeholder="Поиск по каталогу магазина" />

                  <WhiteIcon aria-label="search">
                     <IconImage src={Icons.search} alt="Search" />
                  </WhiteIcon>
               </SearchContainer>
            </InputContainer>

            <IconsContainer>
               {!isScrolled && (
                  <Stack direction="row" spacing={2}>
                     <WhiteIcon aria-label="facebook">
                        <IconImage src={Icons.facebookWhite} alt="Facebook" />
                     </WhiteIcon>

                     <WhiteIcon aria-label="instagram">
                        <IconImage src={Icons.instagramWhite} alt="Instagram" />
                     </WhiteIcon>

                     <WhiteIcon aria-label="whatsapp">
                        <IconImage src={Icons.whatsappWhite} alt="WhatsApp" />
                     </WhiteIcon>
                  </Stack>
               )}

               <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Badge badgeContent={compareCount} color="error">
                     <WhiteIcon aria-label="compare items">
                        <IconImage src={Icons.scales} alt="Compare" />
                     </WhiteIcon>
                  </Badge>

                  <Badge badgeContent={0} color="error">
                     <CartHoverTrigger
                        icon={Icons.likeW}
                        onClick={handleFavoritesNavigate}
                     >
                        <FavoritesDropdown>
                           {favorites?.length === 0 ? (
                              <p>Избранных пока нету!</p>
                           ) : (
                              favorites?.slice(0, 2)?.map((favorite) => (
                                 <Box className="favorite-card">
                                    <img
                                       src={favorite.image}
                                       alt="photo"
                                       className="image"
                                    />

                                    <Typography className="product-name">
                                       {favorite.productName}
                                    </Typography>

                                    <Typography className="price">
                                       {favorite.productPrice}
                                    </Typography>
                                 </Box>
                              ))
                           )}

                           <Button
                              className="favorite-btn"
                              variant="contained"
                              onClick={handleFavoritesNavigate}
                           >
                              Перейти в избранное
                           </Button>
                        </FavoritesDropdown>
                     </CartHoverTrigger>
                  </Badge>

                  <Badge badgeContent={basketCount} color="error">
                     <WhiteIcon aria-label="cart">
                        <IconImage src={Icons.basket} alt="Cart" />
                     </WhiteIcon>
                  </Badge>
               </Stack>
            </IconsContainer>
         </BottomRow>
      </StyledAppBar>
   )
}

const StyledAppBar = styled(AppBar)({
   backgroundColor: '#1A1A25',
   boxShadow: 'none',
   width: '100%',
   zIndex: 1100,
})

const TopRow = styled(Toolbar)({
   padding: 0,
   minHeight: '40px !important',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',

   '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '12px',
   },
})

const BottomRow = styled(Toolbar)(({ isScrolled }) => ({
   padding: isScrolled ? '8px 100px' : 0,
   marginTop: isScrolled ? 0 : '8px',
   minHeight: isScrolled ? '64px !important' : '64px !important',
   display: 'flex',
   gap: isScrolled ? '24px' : '100px',
   alignItems: 'center',
   backgroundColor: isScrolled ? '#1A1A25' : 'transparent',

   '@media (max-width: 960px)': {
      padding: isScrolled ? '8px 24px' : 0,
      gap: isScrolled ? '16px' : '24px',
   },

   '@media (max-width: 600px)': {
      padding: isScrolled ? '8px 16px' : 0,
      flexDirection: 'column',
      gap: isScrolled ? '12px' : '16px',
   },
}))

const TopInfo = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '20%',

   '@media (max-width: 960px)': {
      gap: '24px',
   },
})

const NavContainer = styled(Box)({
   display: 'flex',
   gap: '24px',

   '@media (max-width: 600px)': {
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '16px',
   },
})

const NavButton = styled(Button)({
   color: '#fff',
   textTransform: 'none',
   fontSize: '14px',
   fontWeight: 400,
   padding: '4px 8px',
   minWidth: 'auto',

   '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
   },
})

const ContactBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
})

const PhoneText = styled(Typography)({
   color: '#fff',
   fontSize: '14px',
})

const WhiteIcon = styled(IconButton)({
   color: 'white',
   padding: '4px',
})

const IconImage = styled('img')({
   width: '18px',
   height: '18px',
   transition: 'all 0.3s ease',
})

const Logo = styled('img')({
   width: '160px',
   height: 'auto',
   '@media (max-width: 600px)': {
      width: '120px',
   },
})

const InputContainer = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
   width: '70%',

   '@media (max-width: 960px)': {
      width: '100%',
      gap: '12px',
   },
})

const CatalogButton = styled(Button)({
   backgroundColor: '#CB11AB',
   textTransform: 'none',
   color: '#fff',
   fontSize: '14px',
   fontWeight: 500,
   padding: '8px 16px',
   borderRadius: '4px',
   minWidth: '100px',
   height: '36px',
   '&:hover': {
      backgroundColor: '#B01099',
   },
})

const SearchContainer = styled(Box)({
   backgroundColor: '#2A2A3A',
   border: '1px solid #FFFFFF',
   padding: '4px 12px',
   display: 'flex',
   alignItems: 'center',
   width: '100%',
   height: '36px',
   borderRadius: '8px',
   transition: 'all 0.3s ease',

   '&:hover': {
      backgroundColor: 'white',
      borderColor: 'grey',

      '& .MuiInputBase-input::placeholder': {
         color: 'grey',
      },

      '& img': {
         filter: 'brightness(0) saturate(100%) invert(50%)',
      },
   },

   '&:focus-within': {
      backgroundColor: 'white',
      borderColor: 'grey',

      '& .MuiInputBase-input': {
         color: 'black',
      },

      '& img': {
         filter: 'brightness(0) saturate(100%)',
      },
   },
})

const StyledInputBase = styled(InputBase)({
   color: '#ffffff',
   fontSize: '14px',
   flex: 1,
   '& .MuiInputBase-input': {
      padding: 0,
      '::placeholder': {
         color: '#FFFFFF',
         opacity: 1,
      },
   },
   '&:hover .MuiInputBase-input': {
      '::placeholder': {
         color: 'grey',
         opacity: 1,
      },
   },
   '& .MuiInputBase-input:focus': {
      backgroundColor: 'white',
      color: 'black',
   },
})

const IconsContainer = styled(Box)({
   display: 'flex',
   gap: '80px',
   alignItems: 'center',
   '@media (max-width: 960px)': {
      gap: '24px',
   },
   '@media (max-width: 600px)': {
      justifyContent: 'space-between',
      width: '100%',
      gap: '12px',
   },
})

const ProfileIconBox = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   position: 'relative',
})

const LogoutHint = styled('div')({
   marginTop: '-5px',
   background: '#fff',
   color: '#CB11AB',
   fontSize: 12,
   fontWeight: 600,
   borderRadius: 8,
   padding: '6px 18px',
   boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
   position: 'absolute',
   top: '120%',
   left: '50%',
   transform: 'translateX(-50%)',
   whiteSpace: 'nowrap',
   zIndex: 10,
   transition: 'all 0.2s',
})

const FavoritesDropdown = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   padding: '12px',
   minWidth: '280px',
   color: '#1a1a25',

   '& .favorite-btn': {
      marginTop: '20px',
   },

   '& .favorite-card': {
      display: 'flex',
      alignItems: 'start',
      gap: '12px',
      borderBottom: '1px solid #858FA426',
      padding: '10px 0',
      width: '100%',

      '& .product-name': {
         width: '100%',
      },

      '& .price': {
         color: '#384255',
         fontSize: '14px',
         fontWeight: 700,
      },

      '& .image': {
         width: '60px',
      },
   },
}))

export default UserHeader
