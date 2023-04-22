import prisma from "../../../../../lib/prisma";
import {UserCredentials} from "../../../../../prisma/models/UserCredentials";
import {TokenStructur} from "../../../../../prisma/models/Token";
import {NextApiRequest, NextApiResponse} from "next";

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authenticate = async (email: string, password: string) => {
    if (!(email && password)) {
        return {}
    }
    const user = await prisma.user.findFirst({where: {email: email}})
    if (!user) {
        return {}
    }
    const compare = bcrypt.compareSync(password, user.password);
    if(!compare){
        return {}
    }
    const {password: _, ...userToSend} = user;
    const token = jwt.sign({sub: {...userToSend}}, process.env.JWT_SECRET, {expiresIn: '7d'});
    const userResponse = {
        name:userToSend.name,
        email: userToSend.email,
        token: token
    }
    return userResponse
}
export default async function handle(req: NextApiRequest,
                                     res: NextApiResponse<TokenStructur>) {
    if (req.method != 'POST') {
        res.status(405).json(null)
    } else if (req.body) {
        const {email, password} = req.body as UserCredentials;
        const token = await authenticate(email, password);
        token ? res.status(200).json(token) : res.status(401).json(token)
    } else {
        res.status(404).json(null)
    }
}
