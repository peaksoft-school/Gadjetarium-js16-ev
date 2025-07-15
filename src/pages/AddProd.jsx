import {
   Box,
   Typography,
   TextField,
   Button,
   MenuItem,
   Select,
   InputLabel,
   FormControl,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, useRef } from 'react'
import DatePicker from '../components/UI/DatePicker'
import { Icons } from '../assets/icons'
import Popover from '@mui/material/Popover'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../store/products/productThunk'
import { fileUploadInstance } from '../configs/fileAxiosInstance'
import {
   categories,
   subcategories,
   brands,
   memoryOptions,
   ramOptions,
   simOptions,
   colorPalette,
} from '../utils/productDictionaries'

const AddProd = () => {
   const [step, setStep] = useState(1)
   // Step 1
   const [category, setCategory] = useState('') // id
   const [subcategory, setSubcategory] = useState('') // теперь это id (число)
   const [brand, setBrand] = useState('') // id
   const [warranty, setWarranty] = useState('')
   const [name, setName] = useState('')
   const [date, setDate] = useState(null)
   const [showBrandModal, setShowBrandModal] = useState(false)
   const [brandImage, setBrandImage] = useState(null)
   const brandImageInputRef = useRef()
   // Динамические продукты
   const [products, setProducts] = useState([
      {
         color: '',
         memory: '',
         ram: '',
         sim: '',
         images: [],
         imagePreviews: [],
         attributes: {}, // добавлено
      },
   ])
   // Для динамических характеристик (attributes) каждого продукта
   const [attributesList, setAttributesList] = useState([
      [{ key: '', value: '' }],
   ])
   // Step 2
   const [price, setPrice] = useState('')
   const [count, setCount] = useState('')
   // Step 3
   const [videoUrl, setVideoUrl] = useState('')
   const [pdfFile, setPdfFile] = useState(null)
   const [description, setDescription] = useState('')
   const pdfInputRef = useRef()
   const [mainImages, setMainImages] = useState([]) // массив файлов

   // Для popover цвета
   const [colorAnchorEls, setColorAnchorEls] = useState([null])

   // Синхронизация длины colorAnchorEls с products
   const syncColorAnchors = (newProducts) => {
      setColorAnchorEls((prev) => {
         const arr = Array(newProducts.length).fill(null)
         // Сохраняем уже открытые popover если есть
         for (let i = 0; i < arr.length; i++) {
            if (prev[i]) arr[i] = prev[i]
         }
         return arr
      })
   }

   // Для таблицы шага 2 (пример)
   const productRows = products.map((p, idx) => ({
      brand,
      name,
      category,
      subcategory,
      warranty,
      date: date
         ? date.format
            ? date.format('DD.MM.YYYY')
            : date.toLocaleDateString?.() || date
         : '',
      count,
      price,
      ...p,
   }))

   const handleBrandChange = (e) => {
      if (e.target.value === 'Создать') {
         setShowBrandModal(true)
         setBrand('')
      } else {
         setBrand(e.target.value)
      }
   }

   // Обновим handleProductChange, чтобы при изменении memory, ram, sim обновлять и attributes
   const handleProductChange = (idx, field, value) => {
      setProducts((prev) =>
         prev.map((p, i) => {
            if (i !== idx) return p
            let updated = { ...p, [field]: value }
            // Если изменяется один из атрибутов, обновляем attributes
            if (field === 'memory') {
               updated.attributes = {
                  ...p.attributes,
                  'Объем памяти': value,
               }
            } else if (field === 'ram') {
               updated.attributes = {
                  ...p.attributes,
                  'Оперативная память': value,
               }
            } else if (field === 'sim') {
               updated.attributes = {
                  ...p.attributes,
                  'Кол-во SIM-карт': value,
               }
            }
            return updated
         })
      )
   }
   const handleAddProduct = () => {
      setProducts((prev) => {
         const newProducts = [
            ...prev,
            {
               color: '',
               memory: '',
               ram: '',
               sim: '',
               images: [],
               imagePreviews: [],
               price: '',
               count: '',
               description: '',
               attributes: {}, // добавлено
            },
         ]
         syncColorAnchors(newProducts)
         return newProducts
      })
      setAttributesList((prev) => [...prev, [{ key: '', value: '' }]])
   }
   const handleRemoveProduct = (idx) => {
      setProducts((prev) => {
         const newProducts = prev.filter((_, i) => i !== idx)
         syncColorAnchors(newProducts)
         return newProducts
      })
      setAttributesList((prev) => prev.filter((_, i) => i !== idx))
   }
   const handleImageChange = (idx, files) => {
      const arr = Array.from(files).slice(0, 10 - products[idx].images.length)
      const previews = arr.map((file) => URL.createObjectURL(file))
      setProducts((prev) =>
         prev.map((p, i) =>
            i === idx
               ? {
                    ...p,
                    images: [...p.images, ...arr],
                    imagePreviews: [...p.imagePreviews, ...previews],
                 }
               : p
         )
      )
   }
   const handleRemoveImage = (prodIdx, imgIdx) => {
      setProducts((prev) =>
         prev.map((p, i) =>
            i === prodIdx
               ? {
                    ...p,
                    images: p.images.filter((_, j) => j !== imgIdx),
                    imagePreviews: p.imagePreviews.filter(
                       (_, j) => j !== imgIdx
                    ),
                 }
               : p
         )
      )
   }
   const handlePdfChange = (e) => {
      const file = e.target.files[0]
      if (file && file.type === 'application/pdf') {
         setPdfFile(file)
      }
   }

   // Открытие палитры для конкретного продукта
   const handleOpenColorPicker = (idx, event) => {
      setColorAnchorEls((prev) => {
         const arr = [...prev]
         arr[idx] = event.currentTarget
         return arr
      })
   }
   const handleCloseColorPicker = (idx) => {
      setColorAnchorEls((prev) => {
         const arr = [...prev]
         arr[idx] = null
         return arr
      })
   }

   // Обработка изменения характеристик
   const handleAttributeChange = (prodIdx, attrIdx, field, value) => {
      setAttributesList((prev) =>
         prev.map((attrs, i) =>
            i === prodIdx
               ? attrs.map((attr, j) =>
                    j === attrIdx ? { ...attr, [field]: value } : attr
                 )
               : attrs
         )
      )
   }
   const handleAddAttribute = (prodIdx) => {
      setAttributesList((prev) =>
         prev.map((attrs, i) =>
            i === prodIdx ? [...attrs, { key: '', value: '' }] : attrs
         )
      )
   }
   const handleRemoveAttribute = (prodIdx, attrIdx) => {
      setAttributesList((prev) =>
         prev.map((attrs, i) =>
            i === prodIdx ? attrs.filter((_, j) => j !== attrIdx) : attrs
         )
      )
   }

   const dispatch = useDispatch()

   // Функция генерации артикула
   function generateArticle() {
      return Math.floor(100000000 + Math.random() * 900000000).toString() // 9-значный
   }

   // Функция для загрузки файла на сервер через fileUploadInstance
   async function uploadFile(file) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fileUploadInstance.post('/api/files/upload', formData)
      return res.data // сервер возвращает ссылку
   }

   // Функция для отправки данных через redux
   const handleSubmit = async () => {
      let imageUrl = ''
      if (mainImages[0]) {
         try {
            imageUrl = await uploadFile(mainImages[0])
         } catch (e) {
            alert('Ошибка загрузки фото: ' + e.message)
            return
         }
      }
      // Для каждого варианта загружаем все фото и собираем ссылки
      const productTypes = await Promise.all(
         products.map(async (prod, idx) => {
            let imageLinks = []
            if (prod.images && prod.images.length > 0) {
               imageLinks = await Promise.all(
                  prod.images.map(async (file) => {
                     // Если это уже ссылка (string, начинается с http), не загружать повторно
                     if (typeof file === 'string' && file.startsWith('http'))
                        return file
                     try {
                        const link = await uploadFile(file)
                        console.log(
                           'Загружена ссылка для варианта',
                           idx,
                           ':',
                           link
                        )
                        return link
                     } catch (e) {
                        return ''
                     }
                  })
               )
               // Удаляем пустые строки, если загрузка не удалась
               imageLinks = imageLinks.filter(Boolean)
            }
            // Если массив пустой — подставить главное фото
            if (imageLinks.length === 0 && imageUrl) {
               imageLinks = [imageUrl]
            }
            return {
               article: generateArticle(),
               color: prod.color || '',
               count: Number(prod.count) || 0,
               images: imageLinks,
               price: Number(prod.price) || 0,
               description: prod.description || '',
               attributes: {
                  ...(prod.attributes || {}),
                  ...(attributesList[idx] || []).reduce((acc, cur) => {
                     if (cur.key) acc[cur.key] = cur.value
                     return acc
                  }, {}),
               },
            }
         })
      )
      const payload = {
         categoryId: Number(category) || 0,
         brandId: Number(brand) || 0,
         sudCategoryId: Number(subcategory) || 0,
         name: name || '',
         warranty: parseFloat(warranty) || 0,
         videoUrl: videoUrl || '',
         pdfUrl: pdfFile && pdfFile.name ? pdfFile.name : '',
         imageUrl, // ссылка на главное фото
         // images: mainImages.map((f) => f.name), // убрано из payload
         productTypes,
      }
      console.log('Отправляемый payload:', payload)
      dispatch(saveProduct(payload))
   }

   return (
      <PageWrapper>
         <Typography variant="body2" color="#888" mb={2} sx={{ mt: 1, ml: 1 }}>
            Товары › Добавление товара
         </Typography>
         <Typography variant="h5" fontWeight={700} mb={2} sx={{ ml: 1 }}>
            Добавление товара
         </Typography>
         <Divider />
         <StepperRow>
            <StepCircle active={step === 1}>1</StepCircle>
            <StepLabel active={step === 1}>Добавление товара</StepLabel>
            <StepDivider />
            <StepCircle active={step === 2}>2</StepCircle>
            <StepLabel active={step === 2}>
               Установка цены и количества товара
            </StepLabel>
            <StepDivider />
            <StepCircle active={step === 3}>3</StepCircle>
            <StepLabel active={step === 3}>Описание и обзор</StepLabel>
         </StepperRow>
         {step === 1 && (
            <>
               <FormRow sx={{ mb: 0 }}>
                  <FormCol>
                     <FormControl
                        fullWidth
                        required
                        margin="dense"
                        sx={{ mb: 2 }}
                     >
                        <InputLabel>Выберите категорию *</InputLabel>
                        <Select
                           value={category}
                           label="Выберите категорию *"
                           onChange={(e) => setCategory(e.target.value)}
                           size="small"
                        >
                           {categories.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                 {opt.label}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                     <FormControl
                        fullWidth
                        required
                        margin="dense"
                        sx={{ mb: 2 }}
                     >
                        <InputLabel>Бренд *</InputLabel>
                        <Select
                           value={brand}
                           label="Бренд *"
                           onChange={handleBrandChange}
                           size="small"
                           renderValue={(selected) => {
                              const b = brands.find((b) => b.value === selected)
                              return b ? (
                                 <span
                                    style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       gap: 8,
                                    }}
                                 >
                                    <img
                                       src={b.imageUrl}
                                       alt={b.label}
                                       width={22}
                                       height={22}
                                       style={{ borderRadius: 4 }}
                                    />
                                    {b.label}
                                 </span>
                              ) : (
                                 ''
                              )
                           }}
                        >
                           {brands.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                 <span
                                    style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       gap: 8,
                                    }}
                                 >
                                    <img
                                       src={opt.imageUrl}
                                       alt={opt.label}
                                       width={22}
                                       height={22}
                                       style={{ borderRadius: 4 }}
                                    />
                                    {opt.label}
                                 </span>
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                     <TextField
                        label="Название товара *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="dense"
                        required
                        size="small"
                        placeholder="Введите название товара"
                        sx={{ mb: 2 }}
                     />
                  </FormCol>
                  <FormCol>
                     <FormControl
                        fullWidth
                        required
                        margin="dense"
                        sx={{ mb: 2 }}
                     >
                        <InputLabel>Выберите подкатегорию *</InputLabel>
                        <Select
                           value={subcategory}
                           label="Выберите подкатегорию *"
                           onChange={(e) => setSubcategory(e.target.value)}
                           size="small"
                        >
                           {subcategories.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                 {opt.label}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                     <TextField
                        label="Гарантия (месяцев) *"
                        value={warranty}
                        onChange={(e) => setWarranty(e.target.value)}
                        fullWidth
                        margin="dense"
                        required
                        size="small"
                        placeholder="Введите гарантию товара"
                        sx={{ mb: 2 }}
                     />
                     <TextField
                        type="date"
                        label="Дата выпуска *"
                        value={date || ''}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        margin="dense"
                        required
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Введите дату выпуска"
                        sx={{ mb: 2 }}
                     />
                  </FormCol>
               </FormRow>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: 2,
                     mb: 1,
                     ml: 1,
                  }}
               >
                  <ProductLabel>Продукт 1</ProductLabel>
                  <Button
                     variant="text"
                     sx={{
                        color: '#CB11AB',
                        fontWeight: 600,
                        fontSize: 16,
                        minWidth: 0,
                        p: 0,
                     }}
                     onClick={handleAddProduct}
                     startIcon={
                        <img
                           src={Icons.plus}
                           alt="plus"
                           width={20}
                           height={20}
                        />
                     }
                  >
                     Добавить продукт
                  </Button>
               </Box>
               {products.map((prod, idx) => (
                  <ProductBlock key={idx}>
                     <Box
                        display="flex"
                        gap={2}
                        flexWrap="wrap"
                        alignItems="center"
                     >
                        {/* ColorPicker */}
                        <FormControl
                           fullWidth
                           margin="dense"
                           sx={{ maxWidth: 220, mb: 2 }}
                        >
                           <InputLabel shrink>Основной цвет</InputLabel>
                           <ColorPickerField
                              onClick={(e) => handleOpenColorPicker(idx, e)}
                           >
                              <ColorPreview color={prod.color} />
                              <ColorText>
                                 {prod.color ? prod.color : 'Основной цвет'}
                              </ColorText>
                              <ColorArrow>▼</ColorArrow>
                           </ColorPickerField>
                           <Popover
                              open={Boolean(colorAnchorEls[idx])}
                              anchorEl={colorAnchorEls[idx]}
                              onClose={() => handleCloseColorPicker(idx)}
                              anchorOrigin={{
                                 vertical: 'bottom',
                                 horizontal: 'left',
                              }}
                              transformOrigin={{
                                 vertical: 'top',
                                 horizontal: 'left',
                              }}
                              PaperProps={{ sx: { p: 2, borderRadius: 2 } }}
                           >
                              <ColorPaletteGrid>
                                 {colorPalette.map((color, i) => (
                                    <ColorSquare
                                       key={color + i}
                                       color={color}
                                       active={prod.color === color}
                                       onClick={() => {
                                          handleProductChange(
                                             idx,
                                             'color',
                                             color
                                          )
                                          handleCloseColorPicker(idx)
                                       }}
                                    />
                                 ))}
                              </ColorPaletteGrid>
                           </Popover>
                        </FormControl>
                        <FormControl
                           fullWidth
                           margin="dense"
                           sx={{ maxWidth: 220, mb: 2 }}
                        >
                           <InputLabel>Объем памяти</InputLabel>
                           <Select
                              value={prod.memory}
                              label="Объем памяти"
                              onChange={(e) =>
                                 handleProductChange(
                                    idx,
                                    'memory',
                                    e.target.value
                                 )
                              }
                              size="small"
                           >
                              {memoryOptions.map((opt) => (
                                 <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                        <FormControl
                           fullWidth
                           margin="dense"
                           sx={{ maxWidth: 220, mb: 2 }}
                        >
                           <InputLabel>Оперативная память</InputLabel>
                           <Select
                              value={prod.ram}
                              label="Оперативная память"
                              onChange={(e) =>
                                 handleProductChange(idx, 'ram', e.target.value)
                              }
                              size="small"
                           >
                              {ramOptions.map((opt) => (
                                 <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                        <FormControl
                           fullWidth
                           margin="dense"
                           sx={{ maxWidth: 220, mb: 2 }}
                        >
                           <InputLabel>Кол-во SIM-карт</InputLabel>
                           <Select
                              value={prod.sim}
                              label="Кол-во SIM-карт"
                              onChange={(e) =>
                                 handleProductChange(idx, 'sim', e.target.value)
                              }
                              size="small"
                           >
                              {simOptions.map((opt) => (
                                 <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </Box>
                     {/* Внутри ProductBlock на первой странице (step === 1) после select-ов памяти, RAM и SIM-карт: */}
                     <FormControl
                        fullWidth
                        margin="dense"
                        sx={{ maxWidth: 220, mb: 2 }}
                     >
                        <TextField
                           label="Processor"
                           value={prod.attributes?.Processor || ''}
                           onChange={(e) => {
                              const value = e.target.value
                              setProducts((prev) =>
                                 prev.map((p, i) =>
                                    i === idx
                                       ? {
                                            ...p,
                                            attributes: {
                                               ...p.attributes,
                                               Processor: value,
                                            },
                                         }
                                       : p
                                 )
                              )
                           }}
                           size="small"
                        />
                     </FormControl>
                     <FormControl
                        fullWidth
                        margin="dense"
                        sx={{ maxWidth: 220, mb: 2 }}
                     >
                        <TextField
                           label="Дисплей"
                           value={prod.attributes?.['Дисплей'] || ''}
                           onChange={(e) => {
                              const value = e.target.value
                              setProducts((prev) =>
                                 prev.map((p, i) =>
                                    i === idx
                                       ? {
                                            ...p,
                                            attributes: {
                                               ...p.attributes,
                                               ['Дисплей']: value,
                                            },
                                         }
                                       : p
                                 )
                              )
                           }}
                           size="small"
                        />
                     </FormControl>
                  </ProductBlock>
               ))}
               <Button
                  variant="contained"
                  sx={{
                     mt: 3,
                     background: '#CB11AB',
                     borderRadius: 2,
                     minWidth: 120,
                     ml: 1,
                  }}
                  onClick={() => setStep(2)}
               >
                  Далее
               </Button>
               {showBrandModal && (
                  <BrandModal
                     onClose={() => setShowBrandModal(false)}
                     brandImage={brandImage}
                     setBrandImage={setBrandImage}
                     brandImageInputRef={brandImageInputRef}
                  />
               )}
               {/* Блок загрузки фото товара (gallery, до 10 фото) */}
               <Box mt={2} mb={2}>
                  <Typography
                     fontSize={18}
                     fontWeight={500}
                     mb={1}
                     color="#384255"
                  >
                     Добавьте фото
                  </Typography>
                  <StyledPhotoDropZone
                     onClick={() =>
                        document.getElementById('main-photos-input').click()
                     }
                     onDragOver={(e) => e.preventDefault()}
                     onDrop={(e) => {
                        e.preventDefault()
                        const files = Array.from(e.dataTransfer.files).slice(
                           0,
                           10 - mainImages.length
                        )
                        setMainImages((prev) =>
                           [...prev, ...files].slice(0, 10)
                        )
                     }}
                  >
                     <input
                        id="main-photos-input"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => {
                           const files = Array.from(e.target.files).slice(
                              0,
                              10 - mainImages.length
                           )
                           setMainImages((prev) =>
                              [...prev, ...files].slice(0, 10)
                           )
                        }}
                     />
                     {mainImages.length === 0 ? (
                        <Box
                           display="flex"
                           flexDirection="column"
                           alignItems="center"
                           justifyContent="center"
                           width="100%"
                        >
                           <PhotoIconBox>
                              <svg
                                 width="48"
                                 height="48"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <rect
                                    width="48"
                                    height="48"
                                    rx="8"
                                    fill="#BDBDBD"
                                    fillOpacity="0.12"
                                 />
                                 <path
                                    d="M16 32h16M24 16v16"
                                    stroke="#BDBDBD"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                 />
                              </svg>
                           </PhotoIconBox>
                           <Typography
                              fontSize={16}
                              color="#384255"
                              mt={2}
                              mb={1}
                              align="center"
                           >
                              Нажмите или перетащите сюда файл
                           </Typography>
                           <Typography
                              fontSize={15}
                              color="#384255"
                              align="center"
                           >
                              • Минимальное разрешение — 450×600
                              <br />• Максимальное количество — 10 фото
                           </Typography>
                        </Box>
                     ) : (
                        <PhotoPreviewRow>
                           {mainImages.map((file, idx) => (
                              <PhotoPreviewBox key={idx}>
                                 <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    width={60}
                                    height={60}
                                    style={{
                                       objectFit: 'cover',
                                       borderRadius: 6,
                                    }}
                                 />
                                 <RemoveImgBtn
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       setMainImages((prev) =>
                                          prev.filter((_, i) => i !== idx)
                                       )
                                    }}
                                 >
                                    <img
                                       src={Icons.deleteb}
                                       alt="Удалить"
                                       width={16}
                                       height={16}
                                    />
                                 </RemoveImgBtn>
                              </PhotoPreviewBox>
                           ))}
                           {mainImages.length < 10 && (
                              <AddPhotoBtn
                                 onClick={() =>
                                    document
                                       .getElementById('main-photos-input')
                                       .click()
                                 }
                              >
                                 <img
                                    src={Icons.photo}
                                    alt="add"
                                    width={24}
                                    height={24}
                                 />
                              </AddPhotoBtn>
                           )}
                        </PhotoPreviewRow>
                     )}
                  </StyledPhotoDropZone>
               </Box>
            </>
         )}
         {step === 2 && (
            <>
               <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Бренд</TableCell>
                           <TableCell>Категория</TableCell>
                           <TableCell>Подкатегория</TableCell>
                           <TableCell>Название</TableCell>
                           <TableCell>Гарантия</TableCell>
                           <TableCell>Дата выпуска</TableCell>
                           <TableCell>Кол-во товара</TableCell>
                           <TableCell>Цена</TableCell>
                           <TableCell>Цвет</TableCell>
                           <TableCell>Память</TableCell>
                           <TableCell>RAM</TableCell>
                           <TableCell>SIM</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {products.map((row, idx) => (
                           <TableRow key={idx}>
                              <TableCell>{brand}</TableCell>
                              <TableCell>{category}</TableCell>
                              <TableCell>{subcategory}</TableCell>
                              <TableCell>{name}</TableCell>
                              <TableCell>{warranty}</TableCell>
                              <TableCell>
                                 {date
                                    ? date.format
                                       ? date.format('DD.MM.YYYY')
                                       : date.toLocaleDateString?.() || date
                                    : ''}
                              </TableCell>
                              <TableCell>
                                 <TextField
                                    value={row.count || ''}
                                    onChange={(e) =>
                                       handleProductChange(
                                          idx,
                                          'count',
                                          e.target.value
                                       )
                                    }
                                    type="number"
                                    size="small"
                                    sx={{ width: 60 }}
                                    placeholder="Кол-во"
                                 />
                              </TableCell>
                              <TableCell>
                                 <TextField
                                    value={row.price || ''}
                                    onChange={(e) =>
                                       handleProductChange(
                                          idx,
                                          'price',
                                          e.target.value
                                       )
                                    }
                                    type="text"
                                    size="small"
                                    sx={{ width: 100 }}
                                    placeholder="Цена"
                                 />
                              </TableCell>
                              <TableCell>
                                 <ColorDot
                                    color={row.color}
                                    active
                                    style={{ border: '2px solid #888' }}
                                 />
                              </TableCell>
                              <TableCell>{row.memory}</TableCell>
                              <TableCell>{row.ram}</TableCell>
                              <TableCell>{row.sim}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
               <Box display="flex" justifyContent="space-between">
                  <Button
                     variant="outlined"
                     sx={{ borderRadius: 2, minWidth: 120 }}
                     onClick={() => setStep(1)}
                  >
                     Назад
                  </Button>
                  <Button
                     variant="contained"
                     sx={{
                        background: '#CB11AB',
                        borderRadius: 2,
                        minWidth: 120,
                     }}
                     onClick={() => setStep(3)}
                  >
                     Далее
                  </Button>
               </Box>
            </>
         )}
         {step === 3 && (
            <>
               <Box mb={3}>
                  <TextField
                     label="Загрузите видеообзор"
                     value={videoUrl}
                     onChange={(e) => setVideoUrl(e.target.value)}
                     fullWidth
                     margin="normal"
                     placeholder="Вставьте ссылку на видеообзор"
                  />
                  <Box mt={2}>
                     <PdfDropZone onClick={() => pdfInputRef.current.click()}>
                        <input
                           ref={pdfInputRef}
                           type="file"
                           accept="application/pdf"
                           hidden
                           onChange={handlePdfChange}
                        />
                        {pdfFile ? (
                           <PdfFileName>{pdfFile.name}</PdfFileName>
                        ) : (
                           <DropText>Нажмите для выбора PDF-файла</DropText>
                        )}
                     </PdfDropZone>
                  </Box>
                  <TextField
                     label="Описание"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     fullWidth
                     margin="normal"
                     multiline
                     minRows={6}
                     placeholder="Введите описание о товаре"
                     required
                  />
               </Box>
               <Box display="flex" justifyContent="space-between">
                  <Button
                     variant="outlined"
                     sx={{ borderRadius: 2, minWidth: 120 }}
                     onClick={() => setStep(2)}
                  >
                     Назад
                  </Button>
                  <Button
                     variant="contained"
                     sx={{
                        background: '#CB11AB',
                        borderRadius: 2,
                        minWidth: 120,
                     }}
                     onClick={handleSubmit}
                  >
                     Добавить
                  </Button>
               </Box>
               <Typography fontWeight={600} fontSize={17} mb={2} mt={3}>
                  Дополнительная информация
               </Typography>
               {products.map((prod, idx) => (
                  <Box key={idx} mb={3}>
                     <Typography fontWeight={500} fontSize={15} mb={1}>
                        Продукт {idx + 1}
                     </Typography>
                     {/* Динамические атрибуты */}
                     {attributesList[idx] &&
                        attributesList[idx].map((attr, attrIdx) => (
                           <Box
                              key={attrIdx}
                              display="flex"
                              gap={1}
                              alignItems="center"
                              mb={1}
                           >
                              <TextField
                                 label="Информация"
                                 value={attr.key}
                                 onChange={(e) =>
                                    handleAttributeChange(
                                       idx,
                                       attrIdx,
                                       'key',
                                       e.target.value
                                    )
                                 }
                                 size="small"
                                 sx={{ maxWidth: '280px' }}
                              />
                              <Button
                                 variant="text"
                                 color="error"
                                 sx={{ minWidth: 0, p: 0, fontSize: 18 }}
                                 onClick={() =>
                                    handleRemoveAttribute(idx, attrIdx)
                                 }
                                 disabled={attributesList[idx].length === 1}
                              >
                                 ×
                              </Button>
                           </Box>
                        ))}
                     <Button
                        variant="text"
                        sx={{
                           color: '#CB11AB',
                           fontWeight: 500,
                           fontSize: 15,
                           minWidth: 0,
                           p: 0,
                        }}
                        onClick={() => handleAddAttribute(idx)}
                     >
                        + Добавить характеристику
                     </Button>
                  </Box>
               ))}
            </>
         )}
      </PageWrapper>
   )
}

const BrandModal = ({
   onClose,
   brandImage,
   setBrandImage,
   brandImageInputRef,
}) => (
   <ModalOverlay>
      <ModalBox>
         <Typography
            variant="h6"
            mb={2}
            sx={{ textAlign: 'center', fontWeight: 700 }}
         >
            Добавление бренда
         </Typography>
         <Box
            sx={{
               width: 140,
               height: 140,
               border: '1.5px dashed #ccc',
               borderRadius: 2,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               mb: 2,
               cursor: 'pointer',
               background: '#fafafa',
               mx: 'auto',
               position: 'relative',
            }}
            onClick={() => brandImageInputRef.current.click()}
         >
            <input
               ref={brandImageInputRef}
               type="file"
               accept="image/*"
               hidden
               onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setBrandImage(URL.createObjectURL(file))
               }}
            />
            {brandImage ? (
               <img
                  src={brandImage}
                  alt="brand"
                  style={{
                     width: '100%',
                     height: '100%',
                     objectFit: 'contain',
                     borderRadius: 8,
                  }}
               />
            ) : (
               <Typography
                  color="#888"
                  sx={{ textAlign: 'center', fontSize: 15 }}
               >
                  Нажмите для добавления фотографии
               </Typography>
            )}
         </Box>
         <TextField
            label="Название бренда"
            fullWidth
            margin="normal"
            size="small"
         />
         <Box display="flex" gap={2} mt={2}>
            <Button
               variant="outlined"
               onClick={onClose}
               sx={{
                  borderRadius: 2,
                  flex: 1,
                  color: '#CB11AB',
                  borderColor: '#CB11AB',
               }}
            >
               Отменить
            </Button>
            <Button
               variant="contained"
               sx={{ background: '#CB11AB', borderRadius: 2, flex: 1 }}
            >
               Отправить
            </Button>
         </Box>
      </ModalBox>
   </ModalOverlay>
)

// Styled Components
const PageWrapper = styled(Box)`
   max-width: 1100px;
   margin: 40px auto;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
   padding: 32px 40px 40px 40px;
`
const Divider = styled('div')`
   height: 1px;
   background: #eee;
   margin: 16px 0 32px 0;
`
const StepperRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 16px;
   margin-bottom: 32px;
`
const StepCircle = styled('div')(
   ({ active }) => `
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${active ? '#CB11AB' : '#E0E0E0'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
`
)
const StepLabel = styled('div')(
   ({ active }) => `
  font-size: 16px;
  font-weight: 500;
  color: ${active ? '#CB11AB' : '#888'};
`
)
const StepDivider = styled('div')`
   width: 40px;
   height: 2px;
   background: #e0e0e0;
`
const FormRow = styled(Box)`
   display: flex;
   gap: 32px;
   margin-bottom: 16px;
`
const FormCol = styled(Box)`
   flex: 1;
`
const ProductBlock = styled(Box)`
   background: #fafafa;
   border-radius: 10px;
   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
   padding: 24px;
   margin-bottom: 24px;
   border: 1px solid #eee;
`
const ColorPaletteRow = styled(Box)`
   display: flex;
   flex-wrap: wrap;
   gap: 6px;
   margin-bottom: 8px;
`
const ColorDot = styled('div')(
   ({ color, active }) => `
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${color};
  border: ${active ? '3px solid #CB11AB' : '2px solid #ddd'};
  cursor: pointer;
  transition: border 0.2s;
`
)
const StyledPhotoDropZone = styled(Box)`
   min-height: 180px;
   background: #f3f4f8;
   border: 2px dashed #bdbdbd;
   border-radius: 12px;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 24px;
   cursor: pointer;
   margin-bottom: 8px;
   transition: border 0.2s;
   &:hover {
      border-color: #cb11ab;
   }
`
const PhotoIconBox = styled(Box)`
   display: flex;
   align-items: center;
   justify-content: center;
`
const PhotoPreviewRow = styled(Box)`
   display: flex;
   gap: 8px;
   flex-wrap: wrap;
`
const PhotoPreviewBox = styled(Box)`
   position: relative;
   width: 60px;
   height: 60px;
`
const RemoveImgBtn = styled('div')`
   position: absolute;
   top: -8px;
   right: -8px;
   background: #fff;
   border-radius: 50%;
   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
   cursor: pointer;
   padding: 2px;
`
const AddPhotoBtn = styled(Box)`
   width: 60px;
   height: 60px;
   background: #f0f0f0;
   border-radius: 8px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
`
const PdfDropZone = styled(Box)`
   min-height: 60px;
   background: #f7f7f7;
   border: 2px dashed #cb11ab;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
   padding: 16px;
   cursor: pointer;
   margin-bottom: 8px;
`
const PdfFileName = styled('div')`
   color: #222;
   font-size: 15px;
   font-weight: 500;
`
const ModalOverlay = styled('div')`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.15);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 1000;
`
const ModalBox = styled(Box)`
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
   padding: 32px 24px;
   min-width: 340px;
`
const ColorPaletteGrid = styled(Box)`
   display: grid;
   grid-template-columns: repeat(12, 24px);
   gap: 6px;
   margin-bottom: 8px;
`
const ColorSquare = styled('div')(
   ({ color, active }) => `
  width: 24px;
  height: 24px;
  background: ${color};
  border: ${active ? '3px solid #CB11AB' : '1px solid #ddd'};
  cursor: pointer;
  transition: border 0.2s;
`
)
const ProductLabel = styled('div')`
   font-size: 15px;
   font-weight: 600;
   color: #222;
`

const ColorPickerField = styled(Box)`
   display: flex;
   align-items: center;
   height: 40px;
   border: 1px solid #e3e4e8;
   border-radius: 8px;
   background: #fff;
   padding: 0 12px;
   cursor: pointer;
   transition: border 0.2s;
   margin-top: 8px;
   &:hover,
   &:focus {
      border-color: #cb11ab;
   }
`
const ColorPreview = styled('div')(
   ({ color }) => `
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: ${color || '#F3F3F3'};
  border: 1.5px solid #E3E4E8;
  margin-right: 10px;
  box-sizing: border-box;
`
)
const ColorText = styled('div')`
   flex: 1;
   color: #222;
   font-size: 15px;
   font-weight: 400;
`
const ColorArrow = styled('div')`
   color: #bdbdbd;
   font-size: 18px;
   margin-left: 8px;
   user-select: none;
`
const DropText = styled('div')``

export default AddProd
