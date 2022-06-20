import storage from 'local-storage'

import Menu from '../../components/menu'
import Cabeçalho from '../../components/cabecalho'

import { useNavigate } from 'react-router-dom';

import './index.scss';

import { removerConsulta, listarConsultas } from '../../api/consultaApi';
import React, {useEffect, useState} from 'react'

export default function Index() {

    const [consulta, setConsulta] = useState([]);

    const navigate = useNavigate();

    function editarConsulta(id) {
        navigate(`/form/consultar/${id}`);
    }

    function calcularIdade(nasc){
        nasc = new Date(nasc);
        let hoje = new Date();
        
        let idade = -1;
        while (hoje > nasc) {
            idade++;
            nasc.setFullYear(nasc.getFullYear() + 1);
        }
        return idade;
    }


    async function removerConsultaClick(id){
        const resposta = await removerConsulta(id);
        alert('Consulta removido')

        listarTodasConsultas();
    }
    
    async function listarTodasConsultas(){
        const resposta = await listarConsultas();
        console.log(resposta);
        setConsulta(resposta) 
    }

    
    useEffect(() => {
        listarTodasConsultas()
        console.log(consulta)
    }, [])

    const [usuario, setUsuario] = useState('');

    function sairClick() {
        storage.remove('usuario-logado')
        navigate('/login');
    }

    useEffect(() => {
        if(!storage('usuario-logado')) {
            navigate('/login');
        } else {
            const usuarioLogado = storage('usuario-logado');
            setUsuario(usuarioLogado.nome);
        }
        
    }, [])

    return(
        <main className='page-adm'>
            <Menu />
            <div className='container'>
                <Cabeçalho />
                
                <div className='conteudo'>

                    <div className="areacard">
                        <div className='espaçocards'>
                            <div className="agrupar2cards">
                                {consulta.map(item=>
                                    <div className="Card">
                                        <div className="aling1">
                                            <div className="agrup1">
                                                <p>Nome: {item.nome}</p>
                                                <p>idade: {calcularIdade(item.nascimento)}</p>
                                                <div className="alturaxpeso">
                                                    <p>altura: {item.altura}</p>
                                                    <p className="peso">Peso: {item.peso}</p>
                                                </div>
                                                <p>Objetivo: {item.objetivo}</p>
                                                <p>Criado: {item.criado.substr(0, 10)}</p>
                                            </div>
                                            <div className="agrup2">
                                                <div className="icons">
                                                    <img src="/assets/images/iconmonstr-trash-can-5 1.svg" alt="Remover" onClick={()=>removerConsultaClick(item.id)}/>
                                                    <div className="f"></div>
                                                    <img src="/assets/images/iconmonstr-pencil-4 2.svg" alt="Editar" onClick={()=>editarConsulta(item.id)}/> 
                                                </div>
                                                <p>Nº {item.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>    
                        </div>
                    </div>

           
                </div>
            </div>
        </main>
    )
}