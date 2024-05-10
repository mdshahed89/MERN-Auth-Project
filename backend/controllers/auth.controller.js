import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"


export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExisted = await User.findOne({email})
        if(userExisted) return res.send({
            success: false,
            message: "email already used"
        })

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user =  new User({name, email, password: hashedPassword})
        await user.save();

        res.status(201).send({
            success: true, 
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.log(`Error of signUp controller: ${error}`);
    }
}

export const signIn = async ( req, res ) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(404).send({
            success: false,
            message: "user not found"
        })
        const passCompared = bcrypt.compare(password, user.password);
        if(!passCompared){
            res.status(400).send({
                success: false,
                message: "password is wrong"
            })
        }
        else {

            const token = JWT.sign({ _id: user._id }, "gaethtr8h47969a48r7ger8wh8y775d8g4s9", { expiresIn: "7d" })

            if(req.cookies[`${user._id}`]){
                req.cookies[`${user._id}`] = ""
            }

            res.cookie(String(user._id), token, {
                path: "/",
                expires: new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 ),
                httpOnly: true,
                sameSite: "lax"
            })
            
            res.status(200).send({
            success: true,
            message: "user Logged in successfully",
            user
        })
    }
    } catch (error) {
        console.log(`Error in signIn controller`);
    }
}


export const verifyToken = (req, res, next) => {
    try {

        let cookies = req.headers.cookie;
        // cookies = String(cookies)
        const token = cookies.split("=")[1];

        if(!token) return res.status(404).send({
            message: "Token not found"
        })

        JWT.verify(String(token), "gaethtr8h47969a48r7ger8wh8y775d8g4s9", (err, user)=> {
            try {
                if(err) return res.status(400).send(`Error in verifyToken: ${err}`)

            // console.log(user._id);

            req._id = user._id
            } catch (error) {
                console.log(`Error in verify: ${error}`);
            }

        })
        next()
       
    } catch (error) {
        console.log(`error in verifyToken controller: ${error}`);
    }
}

export const getUser = async (req, res, next) => {
    try {
        // const cookies = req.headers.cookie;
        
        // const token = cookies.split("=")[1];

        // if(!token) return res.status(404).send({
        //     message: "Token not found"
        // })
        const userId = req._id;
        let user;
        try {
            user = await User.findById(userId, "-password")
        } catch (error) {
            console.log(`user controller error : user find error: ${error}`);
        }
        if(!user) return res.status(404).send({
            success: false,
            message: "User not found"
        })
        res.status(200).send({
            success: true,
            user
            // token
        })
    } catch (error) {
        console.log(`Error in getUser controller: ${error}`);
    }
}


export const refreshToken = async (req, res, next) => {
    try {
        
        let cookies = req.headers.cookie;
        // console.log(`cookie: ${cookies}`);
        cookies = String(cookies)
        const prevToken = cookies.split("=")[1];

        if(!prevToken) return res.status(404).send({
            message: "prevToken not found"
        })

        JWT.verify(String(prevToken), "gaethtr8h47969a48r7ger8wh8y775d8g4s9", (err, user)=> {
            if(err) return res.status(400).send(`Error in verify prevToken: ${err}`)

            res.clearCookie(`${user._id}`)
            req.cookies[`${user._id}`] = ""

            const token = JWT.sign({ _id: user._id }, "gaethtr8h47969a48r7ger8wh8y775d8g4s9", { expiresIn: "7d" })

            res.cookie(String(user._id), token, {
                path: "/",
                expires: new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 ),
                httpOnly: true,
                sameSite: "lax"
            })

            req._id = user._id;

            next()

        })

    } catch (error) {
        console.log(`Error in refreshToken controller: ${error}`)
    }
}


export const signOut = (req, res) => {
    try {
       
        let cookies = req.headers.cookie;
        // console.log(`cookie: ${cookies}`);
        cookies = String(cookies)
        console.log(cookies);
        const prevToken = cookies.split("=")[1];

        if(!prevToken) return res.status(404).send({
            message: "prevToken not found"
        })

        // res.clearCookie()
        // res.status(200).send({
        //     success: true,
        //     message: "User sign out successfully"
        // })

        JWT.verify(String(prevToken), "gaethtr8h47969a48r7ger8wh8y775d8g4s9", (err, user)=> {
            if(err) return res.status(400).send(`Error in verify prevToken: ${err}`)

            res.clearCookie(`${user._id}`)
            req.cookies[`${user._id}`] = ""

            res.status(200).send({
                success: true,
                message: "User sign out successfully"
            })

        })

    } catch (error) {
        console.log(`Error in signout controller: ${error}`);
    }
}