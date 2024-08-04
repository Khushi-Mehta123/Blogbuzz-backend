
const Articles = require('../models/ArticleSchema')
const multer = require('multer')
const path = require('path')

const gatAllArticles = async (req, res) => {
  try {
    const articles = await Articles.find().sort({ date: -1 });

    // const allarticles = await Users.aggregate([
    //   { $unwind: `${articles}` },  // If data is stored as an array within each user document
    //   { $sort: { "articles.date": -1 } }
    // ]);

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSingleArticle = async(req, res) => {
  try {
    const { id } = req.params;
    const article = await Articles.findById(id); // findById instead of find
    if (!article) {
      return res.status(404).send({ msg: "Article not found" });
    }
    res.status(200).send(article);
  } catch (error) {
    console.log(error);
  }
};

const PostArticle = async (req, res) => {
    const storage = multer.diskStorage({
      destination: 'ArticlesImages/',
      filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname));
      }
  });

  const upload = multer({ storage: storage }).single('articleImage');

  upload(req, res, async (err) => {
    if (err) {
        console.log(err);
        return res.status(500).send('Something went wrong!');
    }
    
    const fileName = req.file ? path.basename(req.file.path) : null;
    console.log(fileName);
    
    const articleData = {
        title: req.body.title,
        data: req.body.data,
        name: req.body.name,
        email: req.body.email,
        image: fileName,
        category : req.body.category,
    };

    try {
        const newArticle = new Articles(articleData);
        await newArticle.save();
        
        res.status(200).json({ msg: 'Article posted successfully!', datasaved: true });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error saving to database');
    }
});
}


// const PostArticle = async (req, res) => {


//     try {
//       let article = new Articles({
//         title: req.body.title,
//         data: req.body.data,
//         verified: req.body.verified,
//         name : req.body.name,
//         email : req.body.email
//       });

//       let articlesave = await article.save();
  
//       res.status(200).json({
//         msg: "Article Posted!!",
//         UserData: articlesave,
//         status: 'success',
//         datasaved: true  
        
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         msg: "Error posting article",
//         status: 'failure',
//         datasaved: false
//       });
//     }  
// }

const updateArticle = async (req,res) => {
  try {
    const {id : id} = req.params
    console.log(id);
    let article = {
      verified: true,
    };
      const updarticle = await Articles.findByIdAndUpdate({
      _id:id, }, 
        {$set} = article,
        {new : true}
    )
    // console.log(updarticle);
    res.status(200).json(updarticle)

  } catch (error) {
    console.log(error);
  }
}

const deleteArticle = async (req,res) => {
  try {
    const {id : id} = req.params
    const deletedata = await Articles.findOneAndDelete({_id : id})

    res.status(200).json({msg : "Success"})

  } catch (error) {
    console.log(error);
  }
}

module.exports = {gatAllArticles,PostArticle,updateArticle,deleteArticle,getSingleArticle}
