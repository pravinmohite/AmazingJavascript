const express = require('express');
const router = express.Router();

const QuestionType = require('../models/questionType');
const QuestionAnswer = require('../models/questionAnswer');
const UserPost = require('../models/userPost');
const Login = require('../models/login');
let loginEndPoint = "/loginDetails";
let signUpEndPoint = "/signUp";
let defaultItemsPerPage = 10;

/*--------crud for login details-----------*/
router.get(loginEndPoint, (req, res, next) => {
    Login.find((err, existingCredentials) => {
        res.json(existingCredentials);
    })
})

router.post(loginEndPoint, (req, res, next) => {
    Login.find((err, existingCredentials) => {
        let result = existingCredentials.find(function (item) {
            if (req.body.username === item.username && req.body.password === item.password) {
                return item;
            }
        });
        if (!result || result.length == 0) {
            let item = {
                invalidUser: true
            }
            res.json(item);
        }
        else {
            res.json(result);
        }
    })
})

// router.post(loginEndPoint, (req, res, next) => {
//     //logic to add
//     let newLogin = new Login({
//         username: req.body.username,
//         password: req.body.password
//     })
//     newLogin.save((err, questionType) => {
//         if (err) {
//             res.json({ msg: 'failed to add login details' });
//         }
//         else {
//             res.json({ msg: 'login details added successfully' });
//         }
//     })
// })

router.post(signUpEndPoint, (req, res, next) => {
    //logic to add
    let newLogin = new Login({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    })
    newLogin.save((err, questionType) => {
        if (err) {
            res.json({ msg: 'failed to register' });
        }
        else {
            res.json(req.body);
        }
    })
})

router.delete(loginEndPoint + '/:id', (req, res, next) => {
    Login.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
})

router.patch(loginEndPoint + '/:id', (req, res, next) => {
    Login.updateOne({ _id: req.params.id }, {
        $set: {
            username: req.body.username,
            password: req.body.password
        }
    }, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
})

/*----------Sign Up-------------- */
router.post(signUpEndPoint, (req, res, next) => {
    //logic to add
    let newLogin = new Login({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    newLogin.save((err, signUpDetails) => {
        if (err) {
            res.json({ msg: 'failed to add login details' });
        }
        else {
            res.json(req.body);
        }
    })
})

/*----------End Sign Up---------- */

/*----crud for question types-----------------*/

router.get('/questionType', (req, res, next) => {
    QuestionType.find((err, questionTypes) => {
        res.json(questionTypes);
    })
})


router.post('/questionType', (req, res, next) => {
    //logic to add
    let newQuestionType = new QuestionType({
        questionType: req.body.questionType,
    })
    newQuestionType.save((err, questionType) => {
        if (err) {
            res.json({ msg: 'failed to add question type' });
        }
        else {
            res.json({ msg: 'question type added successfully' });
        }
    })
})

router.delete('/questionType/:id', (req, res, next) => {
    QuestionType.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
})

router.patch('/questionType/:id', (req, res, next) => {
    QuestionType.updateOne({ _id: req.params.id }, {
        $set: {
            questionType: req.body.questionType
        }
    }, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
})

/*----crud for question answer list-----------------*/

router.get('/questionAnswer', (req, res, next) => {
    //res.send('retrieving the question answer list');
    QuestionAnswer.find((err, questionAnswerList) => {
        res.json(questionAnswerList);
    })
})

router.post('/questionAnswer', (req, res, next) => {
    //logic to add
    let newQuestionAnswer = new QuestionAnswer({
        question: req.body.question,
        answer: req.body.answer,
        questionType: req.body.questionType,
        rank: req.body.rank

    })
    newQuestionAnswer.save((err, questionAnswer) => {
        if (err) {
            res.json({ msg: 'failed to add question answer' });
        }
        else {
            res.json({ msg: 'question answer added successfully' });
        }
    })
})

router.delete('/questionAnswer/:id', (req, res, next) => {
    QuestionAnswer.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
})

router.patch('/questionAnswer/:id', (req, res, next) => {

    QuestionAnswer.updateOne({ _id: req.params.id }, {
        $set: {
            question: req.body.question,
            answer: req.body.answer,
            questionType: req.body.questionType,
            rank: req.body.rank
        }
    }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });

});

/*----end crud for question answer list-----------------*/

/*----start get question answer by type --------------*/

router.get('/questionAnswerByType/:type', (req, res, next) => {
    QuestionAnswer.find((err, questionAnswerList) => {
        let result = questionAnswerList.filter((item)=>{
           if(item.questionType.toLowerCase() === req.params.type.toLocaleLowerCase()) {
               return item;
           }
        })
        if (!result || result.length == 0) {
            let item = {
                invalidQuestion: true
            }
            res.json(item);
        }
        else {
            res.json(result);
        }
    })
})


/*----end get question answer by type ----------------*/

/*----start get question answer by experience/rank --------------*/

router.get('/questionAnswerByExperience/:experience/:type?', (req, res, next) => {
    QuestionAnswer.find((err, questionAnswerList) => {
        let result = questionAnswerList.filter((item)=>{
           let difference = Math.abs(item.rank - req.params.experience);
           if(req.params.type != 'undefined' && req.params.type != null) {
            if((difference == 1 || item.rank == req.params.experience)  && item.questionType.toLowerCase() === req.params.type.toLocaleLowerCase()) {
                return item;
            }
           } 
           else if(difference == 1 || item.rank == req.params.experience) {
              return item;
           }
        })
        if (!result || result.length == 0) {
            let item = {
                invalidQuestion: true
            }
            res.json(item);
        }
        else {
            res.json(result);
        }
    })
})


/*----end get question answer by type ----------------*/

/*----start get question answer by experience/rank --------------*/

checkExperience =(item, experience)=> {
    if(experience == undefined || experience == null) {
        return true;
    }
    let difference = Math.abs(item.rank - experience);
    if(difference == 1 || item.rank == experience) {
        return true;
    }
    return false;
}

checkQuestionType =(item, questionType)=> {
    if(!questionType) {
        return true;
    }
    if(item.questionType.toLowerCase() === questionType.toLocaleLowerCase()) {
        return true;
    }
    return false;
}

checkSearchTerm =(item, searchTerm)=> {
    if(!searchTerm) {
        return true;
    }
    if(
        item.question.toLowerCase().indexOf(searchTerm.toLocaleLowerCase())>-1 ||
        item.answer.toLowerCase().indexOf(searchTerm.toLocaleLowerCase())>-1
    ) {
        return true;
    }
    return false;
}

checkPageNumberSize =(result, reqBody)=> {
    if(!reqBody.currentPage && !reqBody.itemsPerPage) {
        reqBody.currentPage = 1;
        reqBody.itemsPerPage = defaultItemsPerPage;
    }
    let finalResult = result.slice((reqBody.currentPage-1) * reqBody.itemsPerPage, reqBody.currentPage * reqBody.itemsPerPage);
    return finalResult;
}

router.post('/questionAnswerServerSide', (req, res, next) => {
    QuestionAnswer.find((err, questionAnswerList) => {
        let result = questionAnswerList.filter((item)=>{
           if(
               checkExperience(item, req.body.experience) &&
               checkQuestionType(item, req.body.questionType) &&
               checkSearchTerm(item, req.body.searchTerm) 
            ) {
                return item;
            }
        })
        if (!result || result.length == 0) {
            let totalItems = result.length;
            const serverSideObj= {
                result,
                totalItems: totalItems
            }
            res.json(serverSideObj);
        }
        else {
            let totalItems = result.length;
            result = checkPageNumberSize(result, req.body);
            const serverSideObj= {
                result,
                totalItems: totalItems
            }
            res.json(serverSideObj);
        }
    })
})


/*----end get question answer by type ----------------*/

/*----crud for question answer by params-----------------*/

router.get('/questionAnswerByParams/:question', (req, res, next) => {
    QuestionAnswer.find((err, questionAnswerList) => {
        let result = questionAnswerList.find((item) => {
            if (item.question.toLowerCase().indexOf(req.params.question.toLowerCase())>-1) {
                return item;
            }
        })
        if (!result || result.length == 0) {
            let item = {
                invalidQuestion: true
            }
            res.json(item);
        }
        else {
            res.json(result);
        }
    })
})

router.post('/questionAnswerByParams', (req, res, next) => {
    //logic to add
    let newQuestionAnswer = new QuestionAnswer({
        question: req.body.question,
        answer: req.body.answer,
        questionType: req.body.questionType,
        rank: req.body.rank

    })
    newQuestionAnswer.save((err, questionAnswer) => {
        if (err) {
            res.json({ msg: 'failed to add question answer' });
        }
        else {
            res.json({ msg: 'question answer added successfully' });
        }
    })
})

router.delete('/questionAnswerByParams/:id', (req, res, next) => {
    QuestionAnswer.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
})

router.patch('/questionAnswerByParams/:id', (req, res, next) => {

    QuestionAnswer.updateOne({ _id: req.params.id }, {
        $set: {
            question: req.body.question,
            answer: req.body.answer,
            questionType: req.body.questionType,
            rank: req.body.rank
        }
    }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });

});

/*----end crud for question answer list-----------------*/

/*----get related(random) question answer -----*/

router.get('/relatedQuestionAnswer/:count', (req, res, next) => {

    QuestionAnswer.find((err, questionAnswerList) => {
        const array = questionAnswerList;
        const n = req.params.count ? req.params.count : 5; // number of elements we want to get
        const shuffledArray = array.sort(() => 0.5 - Math.random()); // shuffles array
        const randomItems = shuffledArray.slice(0, n); // gets first n elements after shuffle
        if (!randomItems || randomItems.length == 0) {
            let item = {
                noRelatedQuestionFound: true
            }
            res.json(item);
        }
        else {
            res.json(randomItems);
        }
    })
})

/*----end get related(random) question answer ---*/

//update question answer

module.exports = router;