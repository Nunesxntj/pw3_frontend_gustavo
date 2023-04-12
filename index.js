const express = require('express');
const axios = require('axios').default;

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    /* INICIO DAS CONFIGURAÇÕES DO EJS:  */
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    /* FIM DAS CONFIGURAÇÕES DO EJS:  */

    /* INICIO DAS ROTAS DE ACESSO AS PÁGINAS EJS*/
    app.get('/', (req, res)=>{
        res.render('index');
    });
    /* FIM DAS ROTAS DE ACESSO AS PÁGINAS EJS*/

    /* INICIO DAS ROTAS DE CATEGORIA */

    /*CADASTRO*/
    app.get('/categoria', (req, res)=>{
        res.render('categoria/index');
    });

    /*LISTAGEM*/
    app.get('/listagemCarro', (req, res)=>{
    
        /* CONFIGURAÇÃO DA REQUISIÇÃO BACK END VIA AXIOS*/

        /* ROTA DO BACK END */
        const urlListarCarros = 'http://localhost:3000/listarCarro';

        /*
        CHAMADA DO AXIOS PARA A ROTA DO BACK END 
        PARAMETROS DO VERBO:
        1 - ROTA
        2 - .then DE TRATAMENTO DA RESPOSTA
        */
        axios.get(urlListarCarros)
        .then((response)=>{

            console.log(response.data);
            let carros = response.data;
            res.render('categoria/listagemCarro', {carros});

        });
    });

    //EDITAR

app.get('/editarCarro/:cod_carro', (req, res)=>{

    let {cod_carro} = req.params
    
    urlListarCarroPK = `http://localhost:3000/listarCarroPK/${cod_carro}`

    axios.get(urlListarCarroPK)
    .then((response)=>{
        // console.log(response.data);
        let carro = response.data;
        res.render('categoria/editarCarro.ejs', {carro});
    })
    
})


// EDITAR

app.post('/editarCarro', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarCarro'

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.redirect('/listagemCarro')
    })
})

app.get('/excluirCarro/:cod_carro', (req, res)=>{
    console.log(req.params);
 
     let {cod_carro} = req.params;
 
     const urlExcluirCarro = `http://localhost:3000/excluirCarro/${cod_carro}`;
 
     axios.delete(urlExcluirCarro)
     .then((response)=>{
         res.redirect('/listagemCarro');
     });
     
 });
 

/* FIM DAS ROTAS DE CATEGORIA */



    /* FIM DAS ROTAS DE CATEGORIA */

    app.listen(3001, ()=>{
        console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
    });