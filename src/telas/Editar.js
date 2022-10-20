import React, { useState, useEffect } from "react";
import {  Text, 
          View, 
          StyleSheet, 
          SafeAreaView, 
          ScrollView } from "react-native";

import Input from "../componentes/Input";
import Button from "../componentes/Button";

import COLORS from '../const/colors';
import apiLivraria from '../service/apiLivraria';

const Editar = ({ route, navigation }) => {

    /***** CAPTURA DE DADOS COM USO DE STATE *****/
    //CRIAÇÃO DA ESTRUTURA DE STATE QUE ARMAZENA
    //OS DADOS DIGITADOS
    const [inputs, setInputs] = React.useState({
      titulo:'',
      descricao:'',
      capa:'',
    });

    const {cod_livro} = route.params;

    useEffect(
      () => {
        apiLivraria.get(`/listarLivros/${cod_livro}`)
        .then(
          (data) => {
            setInputs(data.data[0])
          }
        )
      },
      []
    );

    //FUNÇÃO QUE MANIPULA A ENTRADA DE DADOS NA
    //STATE NO MÉTODO onChangeText
    const handlerOnChange = (text, input)=>{

      setInputs((prevState)=>(

        console.log(prevState),
        //console.log(input + ' ' + text)
        
        //INJEÇÃO DE DADOS NA STATE
        {...prevState, [input]:text}

      ));

    }
   
    /***** VALIDAÇÃO DOS DADOS DE CADASTRO *****/

    //STATE DE ERRO DE PREENCHIMENTO
    const [errors, setErrors] = React.useState({});

    //FUNÇÃO HANDLER QUE CONFIGURA AS MENSAGENS DE ERRO NA STATE
    const handlerErrors = (errorMesage, input)=>{
      setErrors((prevState)=>({...prevState, [input]:errorMesage}));
    }

    //FUNÇÃO DE VALIDAÇÃO
    const validate = ()=>{

      let validate = true;

      if (!inputs.titulo) {
        validate = false;
        handlerErrors('Informe o título do livro.', 'titulo');
        // console.log('TITULO EM BRANCO.');
      }

      if (!inputs.descricao) {
        validate = false;
        handlerErrors('Informe a descrição do livro.', 'descricao');
        // console.log('DESCRIÇÃO EM BRANCO.');
      }

      if (!inputs.capa) {
        validate = false;
        handlerErrors('Informe a capa do livro.', 'capa');
        // console.log('CAPA EM BRANCO.');
      }

      if(validate){
        //ENVIA OS DADOS PARA A API CADASTRAR.
        editar();
        console.log('LIVRO EDITADO');
      }

      console.log(errors);

    }

    const editar = () => {

        try {
          const response = apiLivraria.put('/alterarLivros', 
          {
            titulo: inputs.titulo,
            descricao: inputs.descricao,
            imagem: inputs.capa,
            cod_livro: inputs.cod_livro
          });
          navigation.goBack();

        } catch(error){}

    }

    //const nome = 'TELA DE CADASTRO';
    return(

      <SafeAreaView style={estilos.safe}>
        <ScrollView style={estilos.scroll}>

          <Text style={estilos.textTitle}>
            CADASTRO DE LIVRO
          </Text>

          <View style={estilos.viewForm}>

            <Input 
                  label="TITULO"
                  iconName="book-outline"
                  error={errors.titulo}
                  onFocus={()=>{handlerErrors(null, 'titulo')}}
                  value={inputs.titulo}
                  onChangeText = {(text)=>handlerOnChange(text, 'titulo')} />
            
            <Input 
                  label="DESCRIÇÃO" 
                  iconName="card-text-outline"
                  error={errors.descricao}
                  onFocus={()=>{handlerErrors(null, 'descricao')}}
                  value={inputs.descricao}
                  onChangeText = {(text)=>handlerOnChange(text, 'descricao')}/>
            
            <Input 
                  label="CAPA" 
                  iconName="image-outline"
                  error={errors.capa}
                  onFocus={()=>{handlerErrors(null, 'capa')}}
                  value={inputs.capa}
                  onChangeText = {(text)=>handlerOnChange(text, 'capa')}/>
            
            <Button 
                  title="Editar"
                  onPress={validate}/>

          </View>
        </ScrollView>
      </SafeAreaView>    
    );
  
  }

  const estilos = StyleSheet.create({
    safe:{
      flex:1,
      backgroundColor:COLORS.white,
    },
    scroll:{
      paddingTop:50,
      paddingHorizontal:20,
    },
    textTitle:{
      color:COLORS.black,
      fontSize:25,
      fontWeight:"bold",
    },
    viewForm:{
      marginVertical:20,
    },

  });

  export default Editar;