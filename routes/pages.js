const express = require("express");
const router = express.Router();
const infos = require("./link")
const userContoller = require("../controllers/users");
const axios = require('axios');
router.get("/",(req,res) => {
   
    res.render("index");

});
router.get("/register",(req,res) => {
   
    res.render("register");

});

// router.get("/forgot",(req,res) => {
   
//     res.render("forgot");

// });
router.get("/profile", userContoller.isLoggedIn, (req,res) => {
   
    if (req.user) {
        res.render("profile", { user: req.user });
      } else {
    res.render("./");
      }
});
router.get("/home", userContoller.isLoggedIn, (req,res) => {
   
    if (req.user) {
        res.render("home", { user: req.user });
      } else {
    res.render("./");
      }

});
router.get("/delete",(req,res) => {
   
  res.render("delete");

});
router.get("/forgot",(req,res) => {
   
  res.render("forgot");

});
router.get('/sciencenews', userContoller.isLoggedIn, (req, res) => {
  const SCIENCENEWS_API_URL = process.env.SCIENCE_API_URL;
  if (req.user) {
    
  
  axios.get(SCIENCENEWS_API_URL)
    .then(response => {
      // Process the response and pass the necessary data to the view
      res.render('sciencenews', { headlines: response.data.articles });
    })
    .catch(error => {
      console.error(error);
      // Handle any errors that occur during the API request
      res.render('error'); // Render an error view if the API request fails
    });}
    else {
      res.render("./");
        }
});
router.get('/technews', userContoller.isLoggedIn, (req, res) => {
  const TECHNEWS_API_URL = process.env.TECHNOLOGY_API_URL;
  if (req.user) {
    
  axios.get(TECHNEWS_API_URL)
    .then(response => {
      // Process the response and pass the necessary data to the view
      res.render('technews', { headlines: response.data.articles });
    })
    .catch(error => {
      console.error(error);
      // Handle any errors that occur during the API request
      res.render('error'); // Render an error view if the API request fails
    });
  }
    else {
      res.render("./");
        }
});
router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token;
  res.render("reset-password", { token });
});


router.get("/slideshare", userContoller.isLoggedIn, (req,res) => {
   
    if (req.user) {
        res.render("slideshare", { user: req.user });
      } else {
    res.render("./");
      }

});
router.get("/displayBooks", userContoller.isLoggedIn, (req,res) => {
    if (req.user) {
        res.render("displayBooks", { user: req.user });
      } else {
    res.render("./");
      }

});
router.get("/video", userContoller.isLoggedIn, (req,res) => {
  if (req.user) {
      res.render("home.ejs", { user: req.user });
    } else {
  res.render("./");
    }

});
router.get("/video/:videoid", userContoller.isLoggedIn, (req,res) => {
  if (req.user) {
    const id = req.params.videoid;
    //console.log(id);
    for(let i = 0;i<infos.length ; i++)
    {
        if(infos[i][0] == id)
        {
            res.render("video.ejs" , {link:infos[i][1] , description : infos[i][2]})
        }
    }
    } else {
  res.render("./");
    }

});




module.exports = router;