const express=require('express')
const {DeleteReviewById,GetAllReview,AddReview}= require('../Controllers/ReviewController')
// const AdminMiddlewares = require('../Midellwares/AdminMidellwares')

const Router=express.Router()
Router.post('/AddReview/:id',AddReview)
Router.get('/getAllReview',GetAllReview)
// Router.put('/updateReview/:id',AdminMiddlewares,UpdateReviewById)
Router.delete('/deleteReview/:id',DeleteReviewById)

module.exports=Router