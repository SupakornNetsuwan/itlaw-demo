import type { RequestHandler } from "express"
import { z } from "zod"
import findUser from "auth/ldap/ldapFindUser"
import CustomError from "utils/customError"

const schema = z.object({
    email: z.string({ invalid_type_error: "Email must be a string type" }).min(8, { message: "Email is required" }).transform(email => email.split("@")[0]),
    password: z.string({ invalid_type_error: "Password must be a string type" }).min(1, { message: "Password is required" }),
}).readonly()

const signIn: RequestHandler = async (req, res) => {
    try {
        const { email, password } = schema.parse(req.body)
        const user = await findUser(email, password)
        res.send(user)
    } catch (error) {
        res.status(500).json({ message: "Unknown error occured", error: new CustomError(error).message })
    }

}

export default signIn