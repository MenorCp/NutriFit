import { Router } from 'express';
import { login }  from '../repository/loginRepository.js' 

const server = Router();

server.post('/login', async  (req, resp )  => {
    try{
        const { email, senha } = req.body;
        const liz = await login(email, senha)

        if(!liz)
            throw new Error ('Credenciais inválidas')
        resp.send(liz)
    }catch(err){
        resp.status(401).send({
            erro:err.message
        })

    }
})


export default server;