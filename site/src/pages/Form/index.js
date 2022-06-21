import { useEffect, useState } from 'react';
import { alterarCliente, cadastrarCliente, buscarPorId } from '../../api/consultaApi'
import storage, { set } from 'local-storage';

import Menu from '../../components/menu'
import Cabeçalho from '../../components/cabecalho'

import { useParams } from 'react-router-dom'


import './index.scss';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form() {
    const [nome, setNome] = useState('');
    const [emailpaciente, setemailpaciente] = useState('');
    const [cpf, setCpf] = useState('');
    const [peso, setPeso] = useState('');
    const [idade, setidade] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [estrategia, setEstrategia] = useState('');
    const [altura, setAltura] = useState('');
    const [fisico, setFisico] = useState('');
    const [telefone, setTelefone] = useState('');
    const [genero1, setGenero1] = useState('');
    const [genero, setGenero] = useState('');
    const [habitos, setHabitos] = useState('');
    const [id, setId] = useState(0); 

    const { idparam } = useParams();

    useEffect(() => {
        if(idparam) {
            carregarConsulta()
        }
    }, [])

    async function carregarConsulta() {
        const resposta = await buscarPorId(idparam);
        setNome(resposta.nome);
        setemailpaciente(resposta.emailpaciente);
        setCpf(resposta.cpf);
        setPeso(resposta.peso);
        setidade(resposta.idade);
        setObjetivo(resposta.objetivo);
        setEstrategia(resposta.estrategia);
        setAltura(resposta.altura);
        setFisico(resposta.fisico);
        setTelefone(resposta.telefone);
        setGenero1(resposta.genero1);
        setGenero(resposta.genero);
        setHabitos(resposta.habitos);
        setId(resposta.id)
    }

    async function Salvar(){
        try{

            const usuario = storage('usuario').id;

            if(id === 0){
                const r = await cadastrarCliente(nome, cpf, emailpaciente, peso, objetivo, estrategia, altura, fisico, telefone, genero, habitos, usuario);

                setId(r.id);
                toast('Cliente cadastrado com sucesso');
            }else{
                await alterarCliente(id, nome, cpf, emailpaciente, peso, objetivo, estrategia, altura, fisico, telefone, genero, habitos, usuario);

                toast('Cliente Alterado com sucesso');
            }
        }catch(err){
            toast.error(err.message)
        }

    }

    function novoClick() {
        setId(0);
        setNome('');
        setemailpaciente('');
        setCpf(0);
        setPeso(0);
        setidade(0);
        setObjetivo('');
        setEstrategia('');
        setAltura(0);
        setFisico('');
        setTelefone('');
        setGenero1('');
        setGenero('');
        setHabitos('');
    }

    return(

        <main className="page-container">
        <ToastContainer />
        <Menu />
        <div className='container1-cards'>
            <Cabeçalho />
            <div className='aling'>
                <div className='card2'>
                    <div className='cabecalho-card2'>
                        <div className='alihar-cabecalho-card2'>
                            <div className='div-titulo-cabecalho-card2'>
                                <h1 className='titulo'>Cadastrar Paciente</h1>
                            </div>
                        </div>
                    </div>

                    <div className='div-inputs-infoPaciente'>
                        <div className='container1-inputs-infoPaciente'>
                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Nome</div>
                                <div className='alinhar-input-nome'>
                                    <input type="text" className='input-nome-infoPaciente' name="input Nome" value={nome} onChange={e => setNome(e.target.value)}/>  
                                </div>
                            </div>



                            <div className='alinhar-textEinput'>
                                <div className='text-input'>E-mail</div>
                                <div className='alinhar-input-email'>
                                    <input type="text" className='input-email-infoPaciente' name="input email" value={emailpaciente} onChange={e => setemailpaciente(e.target.value)}/>
                                </div>
                            </div>
                            
                            <div className='alinhar-textEinput'>
                                <div className='text-input'>CPF</div>
                                <div className='alinhar-input-cpf'>
                                    <input type="text" className='input-cpf-infoPaciente' name="input cpf" value={cpf} onChange={e => setCpf(e.target.value)}/>
                                </div>
                            </div>

                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Peso</div>
                                <div className='alinhar-input-peso'>
                                    <input type="text" placeholder='Kgs' className='input-peso-infoPaciente' name="input peso" value={peso} onChange={e => setPeso(e.target.value)}/>
                                </div>
                            </div>

                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Idade</div>
                                <div className='alinhar-input-peso'>
                                    <input type="text" className='input-peso-infoPaciente' name="input peso" value={idade} onChange={e => setidade(e.target.value)}/>
                                </div>
                            </div>

                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Objetivo:</div>
                                <div className='alinhar-input-objetivo'>
                                    <input type="text" className='input-objetivo-planodeNutricao' name="input Objetivo" value={objetivo} onChange={e => setObjetivo(e.target.value)}/>
                                </div>
                            </div>
                            <div className='alinhar-textEinput-estrategia'>
                                <div className='text-input'>Estratégia:</div>
                                <div className='alinhar-input-estrategia'>  
                                    <textarea type="text" className='input-estrategia-planodeNutricao' name="input Estrategia" value={estrategia} onChange={e => setEstrategia(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <div className='margin'></div>

                        <div className='container2-inputs'>
                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Altura</div>
                                <div className='alinhar-input-altura'>
                                    <input type="text" className='input-altura-infoPaciente' placeholder='Metros' name="input Altura" value={altura} onChange={e => setAltura(e.target.value)}/>
                                </div>
                            </div>

                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Tipo Físico</div>
                                <div className='alinhar-input-tipoFisico'>
                                    <input type="text" className='input-tipoFisico-infoPaciente' name="input Tipo fisico" value={fisico} onChange={e => setFisico(e.target.value)}/>
                                </div>
                            </div>
                            
                            <div className='alinhar-textEinput'>
                                <div className='text-input'>Telefone</div>
                                <div className='alinhar-input-telefone'>
                                    <input type="text" className='input-telefone-infoPaciente' name="input telefone" value={telefone} onChange={e => setTelefone(e.target.value)}/>
                                </div>
                            </div>

                            <div className='alinhar-textEinputs-genero'>
                                <div className='text-input'>Gênero:</div>

                                <div className='div-inputEtext'>
                                    <div className='alinhar-input-masc'>
                                        <input type="radio" className='input-genero' name="input Genero" checked={genero1} onChange={e => setGenero1(e.target.checked)}/>
                                    </div>
                                    <div className='text-input-masc'>Masc</div>  
                                </div>

                                <div className='div-inputEtext'>
                                    <div className='alinhar-input-fem'>
                                        <input type="radio" className='input-genero' name="input Genero" checked={genero} onChange={e => setGenero(e.target.checked)}/>
                                    </div>
                                    <div className='text-input-fem'>Fem</div>  
                                </div>  
                            </div>
                            <div className='container2-inputs-planodeNutricao'>
                                <div className='text-input-habitosAlimentares'>Hábitos Alimentares</div>
                                <div className='alinhar-input-habitosAlimentares'>
                                    <textarea type="text" className='input-habitosAlimentares-planodeNutricao' name="input Habitos Alimentares" value={habitos} onChange={e => setHabitos(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className='container-planodeNutricao'>

                            <div className='alinhar-button-salvar'>
                                <button onClick={Salvar} className='button'>{id === 0 ? 'Salvar' : 'Alterar'}</button>
                                <button onClick={novoClick} className='button'>Novo</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </main>

    )
}    