import { Router } from 'express';
import { alterarConsulta, buscarCpf, deletar, inserirConsulta, listarConsultas, listarConsultasid, listarConsultasnome } from '../repository/consultaRespository.js'; 

const server = Router();



//inserir consulta ###################################################################################

server.post('/consulta', async (req, resp) => {
    try{
        const a = req.body;

        console.log(a);

        if (!a.nome.trim())
            throw new Error('Nome obrigatório')

        if(!a.emailpaciente.trim()) 
            throw new Error('Email obrigatório')

        if(!a.cpf.trim()) 
            throw new Error('CPF obrigatório')
        
        if(!a.nascimento) 
            throw new Error('Nascimento obrigatório')

            if(!a.contato.trim()) 
            throw   new Error('Contato obrigatório')

            if(!a.genero) 
            throw   new Error('Genero obrigatório')

            if(!a.altura.trim()) 
            throw   new Error('Altura obrigatório')

        
            if(!a.peso.trim()) 
            throw   new Error('Peso obrigatório')

            if(!a.peso || isNaN(a.peso))
                throw new Error('Peso precisa ser em numeros')

                if(!a.fisico.trim()) 
                throw   new Error('Fisico obrigatório')

                if(!a.habitos.trim()) 
                throw   new Error('Hábitos obrigatório')

                if(!a.estrategia.trim()) 
                throw   new Error('Estratégia obrigatório')

                if(!a.nascimento.trim()) 
                throw   new Error('Nascimento obrigatório')


        if (!a.altura || isNaN(a.altura))
            throw new Error('Altura inválida')

        

        const c = await inserirConsulta(a);

        resp.send(c)

    }catch(err){
        resp.status(401).send({
            erro: err.message
        })
    }
})


//alterar consulta ###################################################################################

server.put('/consulta/:id', async (req, resp) => {
    try{
        const { id } = req.params;
        const consulta = req.body;

        console.log(consulta);

        const b = await alterarConsulta(id, consulta);
        if(b != 1)
            throw new Error('Consulta não pode ser alterada')
        else
            resp.status(204).send();
            
    }catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


//listar consulta ###################################################################################

server.get('/consultar', async (req, resp) =>{
    try{
        const resposta = await listarConsultas();

        resp.send(resposta);

    }   catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})


//listar consulta por nome ###################################################################################

server.get('/consultar/nome', async (req, resp) =>{
    try{
        const { nome } = req.query;
        const resposta = await listarConsultasnome(nome);

        resp.send(resposta);

    }   catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})


//listar consulta por id ###################################################################################

server.get('/consultar/:id', async (req, resp) =>{
    try{
        const { id } = req.params;
        const resposta = await listarConsultasid(id);

        resp.send(resposta);

    }   catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

//deletar consulta ###################################################################################

server.delete('/deletar/:id', async (req, resp) =>{
    try{
        const { id } = req.params;

        const resposta = await deletar(id);
        if(resposta != 1)
            throw new Error('Consulta não encontrada')

        resp.status(204).send();
    }   catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})



// consulta cpf ############################################################################################

server.get('/consulta2/:cpf', async (req, resp) => {
        try{
            const { cpf } = req.params;

            const resposta = await buscarCpf(cpf);

            resp.send(resposta);

        }catch(err){
            resp.status(400).send({
                erro: err.message
            })
        }
    }
)

export default server;

