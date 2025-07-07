import React, { useCallback, useState } from 'react'
import {
   Box,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Avatar,
   Typography,
   Rating,
   Button,
   Tabs,
   Tab,
   TextField,
   IconButton,
   Divider,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
   postReviewResponse,
   deleteReview,
   fetchReviewsByStatus,
} from '../store/reviews/ReviewsThunk'
import Modal from './UI/Modal'
import { showToast } from '../utils/helpers/showToast'
import { Icons } from '../assets/icons'

const ReviewsTable = ({ data = [], onReply }) => {
   const dispatch = useDispatch()
   const { items: reviews } = useSelector((state) => state.reviews)

   const [tab, setTab] = useState(0)
   const [expandedRow, setExpandedRow] = useState(null)
   const [editingReviews, setEditingReviews] = useState({})
   const [replyTexts, setReplyTexts] = useState({})
   const [currentPage, setCurrentPage] = useState(1)
   const [modalOpen, setModalOpen] = useState(false)
   const [reviewToDelete, setReviewToDelete] = useState(null)
   const [selectedImage, setSelectedImage] = useState(null)

   const reviewsPerPage = 7

   const allReviews = React.useMemo(
      () => (Array.isArray(reviews) ? reviews : []),
      [reviews]
   )
   const unansweredCount = React.useMemo(
      () => allReviews.filter((item) => !item.review?.response).length,
      [allReviews]
   )
   const answeredCount = React.useMemo(
      () => allReviews.filter((item) => item.review?.response).length,
      [allReviews]
   )
   const allCount = allReviews.length

   const filteredData = React.useMemo(() => {
      if (tab === 1) return allReviews.filter((item) => !item.review?.response)
      if (tab === 2) return allReviews.filter((item) => item.review?.response)
      return allReviews
   }, [allReviews, tab])

   const indexOfLastReview = currentPage * reviewsPerPage
   const indexOfFirstReview = indexOfLastReview - reviewsPerPage
   const currentReviews = filteredData.slice(
      indexOfFirstReview,
      indexOfLastReview
   )
   const totalPages = Math.ceil(filteredData.length / reviewsPerPage)

   const toggleExpanded = (id) => {
      setExpandedRow((prev) => (prev === id ? null : id))
      setEditingReviews((prev) => ({ ...prev, [id]: false }))
      setReplyTexts((prev) => ({ ...prev, [id]: '' }))
   }

   const startEditing = (id, currentResponse = '') => {
      setEditingReviews((prev) => ({ ...prev, [id]: true }))
      setReplyTexts((prev) => ({ ...prev, [id]: currentResponse }))
   }

   const cancelEditing = (id) => {
      setEditingReviews((prev) => ({ ...prev, [id]: false }))
      setReplyTexts((prev) => ({ ...prev, [id]: '' }))
   }

   const saveReply = (reviewData) => {
      const reviewId = reviewData.id || reviewData.review?.id
      const responseText = replyTexts[reviewId]?.trim()
      if (!reviewId || !responseText) return

      dispatch(postReviewResponse({ reviewId, response: responseText }))
         .then(() => {
            setEditingReviews((prev) => ({ ...prev, [reviewId]: false }))
            setReplyTexts((prev) => ({ ...prev, [reviewId]: '' }))
            setTab(2)
            const status =
               tab === 0 ? 'все' : tab === 1 ? 'неотвеченные' : 'отвеченные'
            dispatch(fetchReviewsByStatus(status))
         })
         .catch(console.error)

      if (onReply) {
         onReply({
            ...reviewData,
            review: { ...reviewData.review, response: responseText },
         })
      }
   }

   const handleDeleteClick = (reviewId) => {
      setReviewToDelete(reviewId)
      setModalOpen(true)
   }

   const handleConfirmDelete = useCallback(() => {
      if (!reviewToDelete) {
         showToast({ message: 'Ошибка: ID отзыва не найден.', type: 'error' })
         setModalOpen(false)
         return
      }

      dispatch(deleteReview(reviewToDelete))
         .then(() => {
            showToast({ message: 'Отзыв успешно удалён✅', type: 'success' })
            setModalOpen(false)
            setReviewToDelete(null)
            const status =
               tab === 0 ? 'все' : tab === 1 ? 'неотвеченные' : 'отвеченные'
            dispatch(fetchReviewsByStatus(status))
         })
         .catch(() => {
            showToast({ message: 'Не удалось удалить отзыв', type: 'error' })
            setModalOpen(false)
            setReviewToDelete(null)
         })
   }, [dispatch, reviewToDelete, tab])

   const handleCloseModal = () => {
      setModalOpen(false)
      setReviewToDelete(null)
      setSelectedImage(null)
   }

   const truncateText = (text, maxWords = 5) => {
      if (!text) return ''
      const words = text.split(' ')
      return words.length > maxWords
         ? words.slice(0, maxWords).join(' ') + '...'
         : text
   }

   const handleTabChange = (_, newValue) => {
      setTab(newValue)
      setExpandedRow(null)
      setCurrentPage(1)
   }

   const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1)
   }

   const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
   }

   const handleImageClick = (imageSrc) => {
      if (imageSrc) {
         setSelectedImage(imageSrc)
         setModalOpen(true)
      }
   }

   return (
      <MainContainer>
         <StyledTabs value={tab} onChange={handleTabChange}>
            <Tab label={`Все отзывы(${allCount})`} />
            <Tab
               label={
                  <TabLabelContainer>
                     Неотвеченные
                     {unansweredCount > 0 && (
                        <UnansweredCount component="span">
                           +{unansweredCount}
                        </UnansweredCount>
                     )}
                  </TabLabelContainer>
               }
               sx={{
                  ...(unansweredCount > 0 && {
                     backgroundColor: '#4CAF50',
                     color: '#fff',
                     '&:hover': { backgroundColor: '#45a049' },
                  }),
               }}
            />
            <Tab label={`Отвеченные (${answeredCount})`} />
         </StyledTabs>

         <StyledTableContainer component={Paper}>
            <Table>
               <StyledTableHead>
                  <TableRow>
                     <TableCell>№</TableCell>
                     <TableCell>Фото</TableCell>
                     <TableCell>Название товара</TableCell>
                     <TableCell>Комментарий</TableCell>
                     <TableCell>Оценка</TableCell>
                     <TableCell>Пользователь</TableCell>
                  </TableRow>
               </StyledTableHead>
               <TableBody>
                  {currentReviews.length > 0 ? (
                     currentReviews.map((item, index) => {
                        const id = item.id || item.review?.id
                        const isExpanded = expandedRow === id
                        const commentWords =
                           item.review?.comment?.split(' ') || []
                        const reviewDate = new Date(item.review?.createdAt)
                        const formattedDate = `${reviewDate.toLocaleDateString('ru-RU')} - ${reviewDate.toLocaleTimeString(
                           'ru-RU',
                           {
                              hour: '2-digit',
                              minute: '2-digit',
                           }
                        )}`

                        return (
                           <React.Fragment key={id}>
                              <StyledTableRow>
                                 <TableCell>
                                    {indexOfFirstReview + index + 1}
                                 </TableCell>
                                 <TableCell>
                                    <ProductAvatar
                                       src={
                                          item.product?.image ||
                                          '/default-product-image.jpg'
                                       } 
                                       alt={item.product?.name}
                                       onClick={() =>
                                          handleImageClick(item.product?.image)
                                       }
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <ProductName variant="body2">
                                       {item.product?.name}
                                    </ProductName>
                                    <ProductModel variant="caption">
                                       {item.product?.brand}
                                    </ProductModel>
                                    <br />
                                    <ProductArticle variant="caption">
                                       Арт. {item.product?.article}
                                    </ProductArticle>
                                 </TableCell>
                                 <TableCell>
                                    <ExpandableComment>
                                       <Typography variant="body2">
                                          {isExpanded
                                             ? item.review?.comment
                                             : truncateText(
                                                  item.review?.comment
                                               )}
                                       </Typography>
                                       {commentWords.length > 5 && (
                                          <Typography
                                             variant="body2"
                                             sx={{
                                                display: isExpanded
                                                   ? 'block'
                                                   : 'none',
                                                mt: 1,
                                                ml: 0,
                                                maxWidth: '100%',
                                             }}
                                          >
                                             {isExpanded &&
                                                commentWords.slice(5).join(' ')}
                                          </Typography>
                                       )}
                                       {isExpanded &&
                                          item.review?.images?.length > 0 && (
                                             <ReviewImages>
                                                {item.review.images
                                                   .slice(0, 5)
                                                   .map((img, idx) => (
                                                      <ReviewImage
                                                         key={idx}
                                                         src={
                                                            img ||
                                                            '/default-review-image.jpg'
                                                         } 
                                                         alt={`Review Image ${idx + 1}`}
                                                         onClick={() =>
                                                            handleImageClick(
                                                               img
                                                            )
                                                         }
                                                      />
                                                   ))}
                                             </ReviewImages>
                                          )}

                                       <ReviewDate
                                          variant="caption"
                                          display="block"
                                          sx={{ mt: 1 }}
                                       >
                                          {formattedDate}
                                       </ReviewDate>
                                    </ExpandableComment>
                                 </TableCell>
                                 <TableCell>
                                    <StyledRating
                                       value={item.review?.rating || 0}
                                       readOnly
                                       size="small"
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <UserInfoContainer>
                                       <ClickableAvatar
                                          src={
                                             item.user?.profile ||
                                             '/default-user-profile.jpg'
                                          } 
                                          alt={item.user?.fullName}
                                          onClick={() =>
                                             handleImageClick(
                                                item.user?.profile
                                             )
                                          }
                                          $hasProfile={!!item.user?.profile}
                                       />
                                       <UserDetails>
                                          <UserName variant="body2">
                                             {item.user?.fullName}
                                          </UserName>
                                          <UserEmail variant="caption">
                                             {item.user?.email}
                                          </UserEmail>
                                       </UserDetails>
                                    </UserInfoContainer>
                                 </TableCell>
                                 <TableCell align="right">
                                    <ActionsContainer>
                                       <IconButton
                                          size="small"
                                          onClick={() => handleDeleteClick(id)}
                                       >
                                          <StyledDeleteIcon
                                             src={Icons.deleteb}
                                             alt=""
                                          />
                                       </IconButton>
                                       <IconButton
                                          size="small"
                                          onClick={() => toggleExpanded(id)}
                                       >
                                          {isExpanded ? (
                                             <img
                                                src={Icons.arrowDown}
                                                alt=""
                                                sx={{
                                                   fontSize: 28,
                                                   color: '#999',
                                                }}
                                             />
                                          ) : (
                                             <img
                                                src={Icons.arrowUp}
                                                alt=""
                                                sx={{
                                                   fontSize: 28,
                                                   color: '#999',
                                                }}
                                             />
                                          )}
                                       </IconButton>
                                    </ActionsContainer>
                                 </TableCell>
                              </StyledTableRow>

                              {expandedRow === id && (
                                 <StyledTableRow>
                                    <TableCell colSpan={7}>
                                       <ExpandedContainer>
                                          <ExpandedContent>
                                             <ReplyContainer>
                                                <ReplySection>
                                                   <ReplySectionTitle variant="body2">
                                                      Ответить на комментарий
                                                   </ReplySectionTitle>
                                                   {item.review?.response &&
                                                   !editingReviews[
                                                      item.review?.id
                                                   ] ? (
                                                      <>
                                                         <ResponseContainer>
                                                            <ResponseText variant="body2">
                                                               {
                                                                  item.review
                                                                     ?.response
                                                               }
                                                            </ResponseText>
                                                         </ResponseContainer>
                                                         <ActionButton
                                                            variant="edit"
                                                            onClick={() =>
                                                               startEditing(
                                                                  item.review
                                                                     ?.id,
                                                                  item.review
                                                                     ?.response
                                                               )
                                                            }
                                                         >
                                                            Редактировать
                                                         </ActionButton>
                                                      </>
                                                   ) : editingReviews[
                                                        item.review?.id
                                                     ] ? (
                                                      <>
                                                         <StyledTextField
                                                            fullWidth
                                                            multiline
                                                            minRows={3}
                                                            maxRows={6}
                                                            placeholder="Добрый день! Благодарим Вас за отзыв..."
                                                            value={
                                                               replyTexts[
                                                                  item.review
                                                                     ?.id
                                                               ] || ''
                                                            }
                                                            onChange={(e) =>
                                                               setReplyTexts(
                                                                  (prev) => ({
                                                                     ...prev,
                                                                     [item
                                                                        .review
                                                                        ?.id]:
                                                                        e.target
                                                                           .value,
                                                                  })
                                                               )
                                                            }
                                                            variant="outlined"
                                                            sx={{
                                                               borderRadius:
                                                                  '4px',
                                                               marginBottom:
                                                                  '16px',
                                                            }}
                                                         />
                                                         <ButtonContainer>
                                                            <CancelButton
                                                               variant="outlined"
                                                               size="medium"
                                                               onClick={() =>
                                                                  cancelEditing(
                                                                     item.review
                                                                        ?.id
                                                                  )
                                                               }
                                                            >
                                                               Отменить
                                                            </CancelButton>
                                                            <SaveButton
                                                               variant="contained"
                                                               size="medium"
                                                               onClick={() =>
                                                                  saveReply(
                                                                     item
                                                                  )
                                                               }
                                                               sx={{
                                                                  marginLeft:
                                                                     '16px',
                                                               }}
                                                            >
                                                               Сохранить
                                                            </SaveButton>
                                                         </ButtonContainer>
                                                      </>
                                                   ) : (
                                                      <ActionButton
                                                         variant="reply"
                                                         onClick={() =>
                                                            startEditing(
                                                               item.review?.id
                                                            )
                                                         }
                                                      >
                                                         Ответить
                                                      </ActionButton>
                                                   )}
                                                </ReplySection>
                                             </ReplyContainer>
                                          </ExpandedContent>
                                       </ExpandedContainer>
                                    </TableCell>
                                 </StyledTableRow>
                              )}

                              {index < currentReviews.length - 1 && (
                                 <TableRow>
                                    <DividerCell colSpan={7}>
                                       <StyledDivider />
                                    </DividerCell>
                                 </TableRow>
                              )}
                           </React.Fragment>
                        )
                     })
                  ) : (
                     <TableRow>
                        <NoReviewsCell colSpan={7}>
                           <Typography variant="body1">
                              Пока отзывы не найдены
                           </Typography>
                        </NoReviewsCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
            <PaginationContainer>
               <StyledPaginationButton
                  variant="contained"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
               >
                  Назад
               </StyledPaginationButton>
               <StyledPaginationButton2
                  variant="contained"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
               >
                  Вперед
               </StyledPaginationButton2>
            </PaginationContainer>
         </StyledTableContainer>

         {reviewToDelete ? (
            <Modal open={modalOpen} onClose={handleCloseModal}>
               <ModalContent>
                  <ModalTitle variant="h6" component="h2">
                     Удаление отзыва ❌
                  </ModalTitle>
                  <ModalText variant="body1">
                     Вы точно хотите удалить этот отзыв?
                  </ModalText>
                  <ModalButtonContainer>
                     <ModalButton
                        variant="contained"
                        onClick={handleCloseModal}
                     >
                        Отмена
                     </ModalButton>
                     <ModalButton
                        variant="contained"
                        onClick={handleConfirmDelete}
                     >
                        Да
                     </ModalButton>
                  </ModalButtonContainer>
               </ModalContent>
            </Modal>
         ) : selectedImage ? (
            <Modal open={modalOpen} onClose={handleCloseModal} name="50%">
               <ImageModalContainer>
                  <EnlargedImage src={selectedImage} alt="Enlarged Profile" />
               </ImageModalContainer>
            </Modal>
         ) : null}
      </MainContainer>
   )
}

export default ReviewsTable

const MainContainer = styled(Box)({
   backgroundColor: '#fff',
   padding: '24px',
})

const StyledTabs = styled(Tabs)(({ theme }) => ({
   borderBottom: 'none',
   marginBottom: theme.spacing(4),
   backgroundColor: 'transparent',
   padding: '8px 20px 9px 20px',
   marginLeft: '95px',
   '& .MuiTabs-flexContainer': { gap: '6px' },
   '& .MuiTabs-indicator': { display: 'none' },
   '& .MuiTab-root': {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '16px',
      minWidth: 'auto',
      minHeight: '36px',
      padding: '5px 16px',
      borderRadius: '4px',
      backgroundColor: '#E8E8E8',
      color: '#666666',
      border: 'none',
      transition: 'all 0.2s ease',
      '&:hover': { backgroundColor: '#DDDDDD' },
      '&.Mui-selected': { backgroundColor: '#CB11AB', color: '#FFFFFF' },
   },
}))

const TabLabelContainer = styled(Box)({ display: 'flex', alignItems: 'center' })
const UnansweredCount = styled(Typography)({
   color: '#03ff0b',
   fontWeight: 'bold',
})

const StyledTableContainer = styled(TableContainer)({
   backgroundColor: '#fff',
   boxShadow: 'none',
   marginLeft: '95px',
})

const StyledTableHead = styled(TableHead)({
   '& .MuiTableCell-head': {
      fontWeight: 500,
      fontSize: '14px',
      color: '#384255',
      border: 'none',
      paddingLeft: '4px',
   },
})

const StyledTableRow = styled(TableRow)({
   '&:hover': { backgroundColor: '#f9f9f9' },
   '& .MuiTableCell-root': {
      border: 'none',
      padding: '6px 6px',
      verticalAlign: 'top',
   },
})

const ProductAvatar = styled(Avatar)({
   width: 40,
   height: 40,
   cursor: 'pointer',
   backgroundColor: '#ccc',
})

const ProductName = styled(Typography)({ fontWeight: 500 })
const ProductModel = styled(Typography)({ color: 'text.secondary' })
const ProductArticle = styled(Typography)({ color: 'text.secondary' })
const ReviewDate = styled(Typography)({
   color: 'text.secondary',
   fontSize: '0.75rem',
   marginTop: '8px',
})

const ExpandableComment = styled(Box)({
   maxWidth: '300px',
   wordWrap: 'break-word',
})

const ReviewImages = styled(Box)({
   display: 'flex',
   gap: '8px',
   marginTop: '8px',
   flexWrap: 'nowrap',
})

const ReviewImage = styled('img')({
   width: 60,
   height: 60,
   borderRadius: '4px',
   objectFit: 'cover',
   backgroundColor: '#f0f0f0',
   cursor: 'pointer',
})

const StyledRating = styled(Rating)({
   color: '#fbbf24',
   '& .MuiRating-iconEmpty': { color: '#e0e0e0' },
})

const UserInfoContainer = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
})
const ClickableAvatar = styled(Avatar)(({ $hasProfile }) => ({
   width: 42,
   height: 42,
   cursor: $hasProfile ? 'pointer' : 'default',
   backgroundColor: '#ccc',
}))
const UserDetails = styled(Box)({})
const UserName = styled(Typography)({ fontWeight: 500 })
const UserEmail = styled(Typography)({ color: 'text.secondary' })

const ActionsContainer = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
   justifyContent: 'flex-end',
})

const StyledDeleteIcon = styled('img')({
   cursor: 'pointer',
   transition: 'filter 0.2s',
   '&:hover': {
      filter:
         'brightness(0) saturate(100%) invert(18%) sepia(98%) saturate(5970%) hue-rotate(0deg) brightness(95%) contrast(108%)',
   },
})

const ExpandedContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-end',
})

const ExpandedContent = styled(Box)({
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '16px',
})

const ReplyContainer = styled(Box)({
   width: '50%',
   marginLeft: 'auto',
})

const ReplySection = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   padding: '16px',
   backgroundColor: '#fff',
   borderRadius: '8px',
   border: '1px solid #e0e0e0',
})
const ReplySectionTitle = styled(Typography)({ fontWeight: 500 })
const ResponseContainer = styled(Box)({
   padding: '16px 6px',
   backgroundColor: '#1c6ebf14',
   borderRadius: '4px',
})
const ResponseText = styled(Typography)({ color: 'primary' })

const ActionButton = styled(Button)(({ variant }) => ({
   position: 'relative',
   textTransform: 'none',
   borderRadius: '6px',
   padding: '6px 10px',
   fontSize: '13px',
   backgroundColor: '#CB11AB',
   color: 'white',
   width: '222px',
   height: '43px',
   marginLeft: '200px',
}))

const StyledTextField = styled(TextField)({
   '& .MuiInputBase-root': {
      maxWidth: '100%',
      minHeight: '80px',
      overflow: 'hidden',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      borderRadius: '4px',
   },
   '& .MuiInputBase-input': { padding: '10px' },
})

const ButtonContainer = styled(Box)({
   display: 'flex',
   gap: '40px',
   justifyContent: 'flex-start',
})

const CancelButton = styled(Button)({
   color: '#CB11AB',
   borderColor: '#CB11AB',
   borderRadius: '4px',
   padding: '8px 96px',
   width: '100px',
})

const SaveButton = styled(Button)({
   backgroundColor: '#CB11AB',
   color: '#fff',
   borderRadius: '4px',
   padding: '8px 84px',
   width: '100px',
   '&:hover': { backgroundColor: '#b01496' },
})

const StyledDivider = styled(Divider)({
   borderColor: '#E0E0E0',
   padding: '0px',
   margin: '0px',
})
const DividerCell = styled(TableCell)({ padding: '0px', borderBottom: 'none' })
const NoReviewsCell = styled(TableCell)({
   textAlign: 'center',
   padding: '20px',
})

const PaginationContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '24px',
   marginBottom: '16px',
})

const StyledPaginationButton = styled(Button)({
   background: 'linear-gradient(45deg, #CB11AB 30%, #B8109A 90%)',
   color: '#fff',
   padding: '7px 20px',
   margin: '10px',
   borderRadius: '30px',
   textTransform: 'none',
   fontWeight: 'bold',
   fontSize: '16px',
   boxShadow: '0 6px 20px rgba(203, 17, 171, 0.4)',
   '&:hover': {
      background: 'linear-gradient(45deg, #A70E89 30%, #9B0D80 90%)',
      boxShadow: '0 8px 25px rgba(203, 17, 171, 0.6)',
      transform: 'translateY(-3px)',
   },
   '&:disabled': {
      background: '#D3D3D3',
      color: '#A9A9A9',
      boxShadow: 'none',
   },
   transition: 'all 0.4s ease-in-out',
})

const StyledPaginationButton2 = styled(Button)({
   background: 'linear-gradient(45deg, #CB11AB 30%, #B8109A 90%)',
   color: '#fff',
   padding: '7px 20px',
   margin: '10px',
   borderRadius: '30px',
   textTransform: 'none',
   fontWeight: 'bold',
   fontSize: '16px',
   marginLeft: '600px',
   boxShadow: '0 6px 20px rgba(203, 17, 171, 0.4)',
   '&:hover': {
      background: 'linear-gradient(45deg, #A70E89 30%, #9B0D80 90%)',
      boxShadow: '0 8px 25px rgba(203, 17, 171, 0.6)',
      transform: 'translateY(-3px)',
   },
   '&:disabled': {
      background: '#D3D3D3',
      color: '#A9A9A9',
      boxShadow: 'none',
   },
   transition: 'all 0.4s ease-in-out',
})

const ModalContent = styled(Box)({
   padding: '32px',
   textAlign: 'center',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: '#fff',
   borderRadius: '8px',
   gap: '16px',
})

const ModalTitle = styled(Typography)({})
const ModalText = styled(Typography)({})
const ModalButtonContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   gap: '16px',
   marginTop: '24px',
})
const ModalButton = styled(Button)({
   backgroundColor: '#e91e63',
   '&:hover': { backgroundColor: '#c2185b' },
})

const ImageModalContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '20px',
})

const EnlargedImage = styled('img')({
   width: '500px',
   height: '500px',
   borderRadius: '50%',
   display: 'block',
   objectFit: 'cover',
   boxShadow: `
    0 4px 10px rgba(0, 0, 0, 0.15),
    0 10px 30px rgba(0, 0, 0, 0.2)
  `,

   '@media (max-width: 600px)': {
      width: '90vw',
      height: '90vw',
      maxWidth: '400px',
      maxHeight: '400px',
   },
})
