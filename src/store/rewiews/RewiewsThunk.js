import axiosInstance from "../../configs/axiosInstans"

export const fetchReviews = async (status) => {
   try {
      const response = await axiosInstance(`/v1/reviews/list?status=${status}`)
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
   } catch (error) {
      console.error('Error fetching reviews:', error)
      return []
   }
}

export const submitReply = async (reviewId, replyText) => {
   try {
      const response = await axiosInstance('/v1/reviews/reply', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ reviewId, reply: replyText }),
      })
      if (!response.ok) throw new Error('Failed to submit reply')
      return await response.json()
   } catch (error) {
      console.error('Error submitting reply:', error)
      throw error
   }
}

export const deleteReview = async (reviewId) => {
   try {
      const response = await axiosInstance(`/v1/reviews/remove/${reviewId}`, {
         method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete review')
      return await response.json()
   } catch (error) {
      console.error('Error deleting review:', error)
      throw error
   }
}
