import { Box, Typography, Button, Checkbox } from '@mui/material';
import styled from '@emotion/styled';
import { Icons } from '../../../assets/icons';

const CartCard = ({
  image,
  name,
  rating = 4,
  reviews,
  inStock,
  code,
  quantity,
  price,
  onIncrease,
  onDecrease,
  onRemove,
  onFavorite,
  isLiked = false,
  selected,
  onSelect,
}) => {
  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} src={i + 1 <= rating ? Icons.starFul : Icons.starEmpty} alt="star" />
    ));

  return (
    <CardContainer>
      <Checkbox checked={selected} onChange={onSelect} />
      <ProductImage src={image} alt={name} />
      <InfoSection>
        <Title>{name}</Title>
        <RatingBox>
          <Typography color="textSecondary" fontSize={12}>Рейтинг</Typography>
          {renderStars()}
          <Typography fontSize={13} color="textSecondary">({reviews})</Typography>
        </RatingBox>
        <Availability>В наличии ({inStock})</Availability>
        <ProductCode>Код товара: {code}</ProductCode>
      </InfoSection>
      <ActionSection>
        <Box display="flex" gap={18}>
          <QuantityBox>
            <CircleButton onClick={onDecrease}>-</CircleButton>
            <Typography mx={1}>{quantity}</Typography>
            <CircleButton onClick={onIncrease}>+</CircleButton>
          </QuantityBox>
          <PriceText>{price.toLocaleString()} с</PriceText>
        </Box>
      </ActionSection>
      <BottomButtons>
        <SmallButton size="small" onClick={onFavorite}>
          <LikeIcon src={Icons.likeW} alt="" />
          В избранное
        </SmallButton>
        <SmallButton onClick={onRemove}>
          <DeleteIcon src={Icons.deleteb} alt="" />
          Удалить
        </SmallButton>
      </BottomButtons>
    </CardContainer>
  );
};

export default CartCard;

const CardContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 980px;
  max-height: 150px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 16px;
  border: 1px solid #ffffff;
  gap: 16px;
  width: 1029px;
`;

const ProductImage = styled('img')`
  width: 106px;
  height: 121px;
`;

const InfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 400;
  width: 300px;
  height: 54px;
`;

const RatingBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 155px;
  height: 15px;
`;

const StarIcon = styled('img')`
  width: 16px;
  height: 16px;
`;

const Availability = styled(Typography)`
  color: #3cde14;
  font-size: 12px;
  width: 88px;
  height: 15px;
`;

const ProductCode = styled(Typography)`
  color: #888;
  font-size: 14px;
  width: 146px;
  height: 20px;
`;

const ActionSection = styled(Box)`
  display: flex;
  padding-top: 32px;
`;

const QuantityBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 89px;
  height: 28px;
  position: relative;
  left: 100px;
`;

const CircleButton = styled(Button)`
  width: 28px;
  height: 28px;
  border: 1px solid #000;
  border-radius: 50px;
  font-weight: bold;
  font-size: 16px;
`;

const PriceText = styled(Typography)`
  font-weight: 700;
  font-size: 18px;
  width: 94px;
  height: 20px;
`;

const BottomButtons = styled(Box)`
  display: flex;
  padding-top: 96px;
  padding-right: 80px;
  width: 300px;
  height: 20px;
  gap: 5px;
  position: relative;
  right: 120px;
`;

const SmallButton = styled(Button)`
  height: 20px;
  font-size: 12px;
  font-weight: 400;
  text-transform: none;
  width: 120px;
  color: #909cb5;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeIcon = styled('img')`
  width: 16px;
  height: 16px;
  filter: ${({ isLiked }) => isLiked ? 'none' : 'grayscale(100%) brightness(0.5)'};
`;

const DeleteIcon = styled('img')`
  width: 16px;
  height: 16px;
`;