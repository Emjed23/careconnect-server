const Caregiver = require('../Modules/CaregiverSchema');
const Review =require ('../Modules/ReviewSchema');

const AddReview = async (req, res) => {
    try {
      const {ReviewerName,ReviewText} = req.body;
      const newReview = new Review({ReviewerName, ReviewText});
      const savedReview = await newReview.save();
      await Caregiver.findByIdAndUpdate(req.params.id,{$push:{Reviews:newReview}},{new:true})
            res.status(201).json(savedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Review not saved' });
    }
  }
  const GetAllReview = async(req, res)=>{
   try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' Error' });
  }
}
//  const UpdateReviewById= async (req, res) => {
//     try {
//       const {ReviewerName, Review } = req.body;
//       const updatedReview = await Review.findByIdAndUpdate(
//         req.params.id,
//         {ReviewerName, ReviewText},
//         { new: true }
//       );
//       if (!updatedReview) {
//         return res.status(404).json({ error: 'Review not found' });
//       }
//       res.json(updatedReview);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error' });
//     }
//   }
 const  DeleteReviewById= async (req, res) => {
    try {
      const DeletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!DeletedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.json(DeletedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ' Error' });
    }
  }
  module.exports={DeleteReviewById,GetAllReview,AddReview}

