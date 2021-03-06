import { con } from "./connection.js";


//inserir consulta ###################################################################################


export async function inserirConsulta(consulta) {
    const comando = `
    INSERT INTO tb_consulta (nm_nome, ds_cpf, dt_nascimento, ds_emailpaciente, ds_contato, ds_genero, vl_altura, vl_peso, ds_fisico, ds_objetivo, ds_habitos, ds_estrategia, dt_criacao)
    VALUES                  ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, sysdate());
    `

    const [resposta] = await con.query(comando, [consulta.nome, consulta.cpf, consulta.nascimento, consulta.emailpaciente, consulta.contato, consulta.genero, consulta.altura, consulta.peso, consulta.fisico, consulta.objetivo, consulta.habitos, consulta.estrategia]);
    consulta.id = resposta.insertId

    return resposta[0];

}

//alterar consulta ###################################################################################

export async function alterarConsulta(id, consulta){
    const comando =  `
    UPDATE tb_consulta
    SET nm_nome             =?,
        ds_cpf              =?,
        dt_nascimento       =?,
        ds_emailpaciente    =?,
        ds_contato          =?,
        ds_genero           =?,
        vl_altura           =?,
        vl_peso             =?,
        ds_fisico           =?,
        ds_objetivo         =?,
        ds_habitos          =?,
        ds_estrategia       =?
     WHERE id_consulta      =?
    `

    const [resp] = await con.query(comando, [consulta.nome, consulta.cpf, consulta.nascimento, consulta.emailpaciente, consulta.contato, consulta.genero, consulta.altura, consulta.peso, consulta.fisico, consulta.objetivo, consulta.habitos, consulta.estrategia, id]);
    return resp.affectedRows;
}

//listar consultas ###################################################################################


export async function listarConsultas(){
    const comando = `
    SELECT id_consulta          id,
           nm_nome              nome,
           ds_cpf               cpf,
           dt_criacao           criado,
           dt_nascimento        nascimento,
           ds_emailpaciente     emailpaciente,
           ds_contato           contato,
           ds_genero            genero,
           vl_altura            altura,
           vl_peso              peso,
           ds_fisico            fisico,
           ds_objetivo          objetivo
      FROM tb_consulta;`;

    const [consulta] = await con.query(comando);
    return consulta;
} 

//listar consulta por id ###################################################################################


export async function listarConsultasid(id){
    const comando = `
    SELECT id_consulta          id,
            nm_nome                 nome,
            ds_cpf                  cpf,
            dt_nascimento           nascimento,
            ds_emailpaciente        emailpaciente,
            ds_contato              contato,
            ds_genero               genero,
            vl_altura               altura,
            vl_peso                 peso,
            ds_fisico               fisico,
            ds_objetivo             objetivo,
            ds_habitos              habitos,
            ds_estrategia          estrategia,
            dt_criacao             criacao
      FROM tb_consulta
     WHERE id_consulta          =?`;

    const [consulta] = await con.query(comando, [id]);
    return consulta[0];
} 

//listar consulta por nome ###################################################################################


export async function listarConsultasnome(nome){
    const comando = `
    SELECT id_consulta          id,
            nm_nome                 nome,
            ds_cpf                  cpf,
            dt_nascimento           nascimento,
            ds_emailpaciente        emailpaciente,
            ds_contato              contato,
            ds_genero               genero,
            vl_altura               altura,
            vl_peso                 peso,
            ds_fisico               fisico,
            ds_objetivo             objetivo,
            ds_habitos              habitos,
            ds_estrategia          estrategia,
            dt_criacao             criacao
      FROM tb_consulta
     WHERE nm_nome              like ?`;

    const [consulta] = await con.query(comando, [ `%${nome}%` ]);
    return consulta;
} 


//deletar consulta ###################################################################################

export async function deletar(id){
    const comando =`
        DELETE FROM     tb_consulta
              WHERE     id_consulta = ?`;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


// consulta cpf #######################################################################################

export async function buscarCpf(cpf){
    const comando = 
    `
    SELECT id_consulta          id,
       nm_nome                 nome,
       ds_cpf                  cpf,
       dt_nascimento           nascimento,
       ds_emailpaciente        emailpaciente,
       ds_contato              contato,
       ds_genero               genero,
       vl_altura               altura,
       vl_peso                 peso,
       ds_fisico               fisico,
       ds_objetivo             objetivo,
       ds_habitos              habitos,
       ds_estrategia          estrategia,
       dt_criacao             criacao
       FROM tb_consulta
       WHERE ds_cpf           	like ?;
    `

    const [resposta] = await con.query(comando, [cpf]);

    return resposta[0];
}