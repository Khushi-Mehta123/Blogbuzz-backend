

const express = require('express')
const router = express.Router()

const {gatAllArticles,PostArticle,updateArticle,deleteArticle,getSingleArticle} = require('../functions/Articles')

router.route('/').get(gatAllArticles)

router.route('/').post(PostArticle)

router.route('/:id').put(updateArticle).delete(deleteArticle).get(getSingleArticle)


module.exports = router
