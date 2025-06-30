import { axiosInstance } from '../configs/axiosInstans';
import { setFavorites, setLoading, setError } from '../store/favoriteSlice';

export const fetchFavorites = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axiosInstance.get('/api/favorites');
    dispatch(setFavorites(response.data || []));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch favorites';
    console.error(
      'Error fetching favorites:',
      error.response?.status,
      errorMessage
    );
    dispatch(setError(errorMessage));
  }
};