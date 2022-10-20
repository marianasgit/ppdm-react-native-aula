import React, {useEffect, useState}  from "react";

import { ScrollView, 
            View, 
            Text, 
            StyleSheet, 
            Image, 
            TouchableOpacity } from "react-native";

import apiLivraria from '../service/apiLivraria';
import capaLivro150 from '../assets/livros/lor150.png';

import COLORS from "../const/colors"; 

const Detalhes = ({ route, navigation }) => {

    const {cod_livro} = route.params;

    const[livro, setLivro] = useState({
        cod_livro:'',
        titulo:'',
        descricao:'',
        imagem:'',
    });

    useEffect(
        ()=>{
            apiLivraria.get(`/listarLivros/${cod_livro}`)
            .then(
                (livro)=>{
                    //console.log(livro.data[0])
                    setLivro(livro.data[0])
                }
            )
        }
    );

    const excluir = () => {
        try {
  
          apiLivraria.delete(`/excluirLivros/${livro.cod_livro}`)
          navigation.navigate('Listagem');
  
        } catch (error) {}
      }

    return(

        <ScrollView>

            <View style={estilos.container}>

                <View style={estilos.post}>
                    <Image style={estilos.imagem} source={capaLivro150}/>
                    <Text style={estilos.titulo}>{livro.titulo}</Text>
                    <Text style={estilos.descricao}>{livro.descricao}</Text>
                </View>

                <View style={estilos.botoes}>
                    
                    <TouchableOpacity
                        style={estilos.botao}
                        onPress={() => {navigation.navigate('Editar', {cod_livro:livro.cod_livro})}}>
                        <Text style={[estilos.textoBotao, 
                                     {backgroundColor:COLORS.green}]}>EDITAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={estilos.botao}
                        onPress={()=>{excluir()}}>
                        <Text style={[estilos.textoBotao, 
                                     {backgroundColor:COLORS.red}]}>EXCLUIR</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </ScrollView>

    );

}

const estilos = StyleSheet.create({


    
    container:{
        alignItems:'center'
    },
    post:{
        width:'95%',
        alignItems:'center',
        backgroundColor:'#CCC',
        padding:15,
        marginVertical:5,
        borderRadius:5,
        elevation:5,
    },
    imagem:{
        borderRadius:5,
        marginVertical:16,
        marginLeft:16
    },
    titulo:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold'
    },
    descricao:{
        width:'100%',
        fontSize:16,
        textAlign:'justify'
    },
    botoes:{
        flex:1,
        flexDirection:'row',
        padding:10,
        justifyContent:'center'
    },
    botao:{
        width:'50%',
        marginHorizontal: 1,
    },
    textoBotao:{
        padding:10,
        textAlign:'center',
        color:COLORS.white,
        fontWeight:'bold',
        fontSize:16,
    }

});

export default Detalhes