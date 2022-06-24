const jwt = require("jsonwebtoken")
const BlogModel = require("../models/blogModel")



const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        // console.log(token)
        if (!token) {
            return res.status(404).send({ status: false, msg: 'Token is Mandatory' })
        }
        try {
            let decodedToken = jwt.verify(token, "functionUp")
        }
        catch (error) {
            return res.status(400).send({ status: false, msg: "invalid token" })
        }
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, data: error.message })
    }

}


const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token, "functionUp")
        let decodedAuthor = decodedToken.userId

        let blogId = req.params.blogId

        //get author Id by searching in database 
        getAuthorId = await BlogModel.findById(blogId)
        
        if (getAuthorId == null) return res.status(404).send({ status: false, msg: "Blog not found" })

        let author = getAuthorId.authorId.toString()

        if (decodedAuthor != author) return res.status(400).send({ status: false, msg: "You are not authorised to perform this action" })
        next();

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

const deleteByquerying = async function (req, res, next) {
    let body = req.body
    if (Object.keys(body).length == 0) return res.status(400).send({ status: false, msg: "Enter your email and password to continue further" })
}

module.exports.authentication = authentication;
module.exports.authorization = authorization
module.exports.deleteByquerying = deleteByquerying

