import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// utils imports
import { hashPassword, comparePassword } from "../utils/auth.js";
const JTW_EXPIRATION = { expiresIn: '1h'};


// Done
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if(!username || !email || !password)
            return res.status("400").send({status: "error", message: "Missing required parameters"});
        
        const newUser = new userModel({
            username,
            email,
            password: await hashPassword(password),
        });
    
        await newUser.save();
    
        return res.status(201).send({
            status: "success",
            message: "user created successfully",
        });
    } catch (error) {
        console.log(error); // dev mode
        if (error.code === 11000) {
            return res.status(409).json({
                status: "error",
                message: "email or username already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}
// Done
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.status("400").send({status: "error", message: "Missing required parameters"});
    
        const user = await userModel.findOne({ email }).select("+password");

        if (!user)
            return res.status(404).send({status: "error", message: "User not found"});
    
        const isCorrectPassword = comparePassword(password,user.password);
    
        if (isCorrectPassword) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
            const token = jwt.sign(
            {
                email: user.email,
                username: user.username,
            },
            jwtSecretKey,
            JTW_EXPIRATION
            );
    
            // Set the JWT as a cookie in the response.
            res.cookie("jwt", token, {
            httpOnly: false, // NOTE: For production, set this to `true` to prevent JavaScript access.
            secure: true, // Ensure the cookie is sent over HTTPS.
            sameSite: "strict", // Prevent cross-site requests.
            maxAge: 3600000, // Cookie lifespan of 1 hour (in milliseconds).
            });
            res.json({ status: "succuss", message: "Logged in successfully", token: token });
        } 
        else {
            // Send a 401 response if the password is incorrect.
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}
// Not Done
export const getSelf = async (req, res) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
        const token = req.headers.authorization.split(" ")[1]; // Extract the token from the `Authorization` header.
        const decoded = await jwt.verify(token, jwtSecretKey); // Verify and decode the token.
        res.send(decoded); // Send the decoded token information as the response.
    } 
    catch (error) {
        console.log(error); // dev mod
        res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
        error: error.message,
    });
    }
}
// Done
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id)
            return res.status("400").send({status: "error", message: "Missing required parameters"});

        const foundUser = await userModel.findById(req.params.id);

        if (!foundUser)
            return res.status(404).send("User not found");

        res.status(200).send({
            status: "succuss",
            user: foundUser
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}
// Done
export const getAllUsers = async (req, res) => {
    try {
        const allFetchedUsers = await userModel.find().select("+password");

        res.status(200).send({
            status: "success",
            message: "Users Found",
            data: allFetchedUsers,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};
