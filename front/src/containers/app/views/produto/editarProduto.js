import React, { Component } from 'react';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader, Badge, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import Servico from '../../../services/servico';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import {
    Button,
    CardFooter,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label
  } from 'reactstrap';

  var styles = theme => ({
    card: {
      maxWidth: 350,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9 
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });
  
class editarProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            isLoading: false,
            categoria: null,
            nome: "",
            descricao: "",
            url: "",
            preco: null,
            categoriaSelecionada: null,
            dangerAlert: false,
            successAlert: false,
            mensageAlert: "",
            render: false
          };
        }
    
    componentWillMount(){
      const produto = JSON.parse(atob(this.props.match.params.produto));

      if(produto){
        this.setState({
          id:produto['id']
        }, ()=>this.getProduct())
      }
      this.procurarCategorias()
    }

    async getProduct (){
      const {data} = await Servico.post("/get-produto-id",{id:this.state.id});
      this.setState({
          nome : data.payload['nome'],
          descricao : data.payload['descricao'],
          preco : data.payload['preco'],
          url : data.payload['url'],
          categoriaSelecionada : data.payload['categoria'],
      }, () => this.setState({render: true}))
     
    }

    async procurarCategorias (){
      const {data} = await Servico.post("/procurar-categorias",{nome:""});
      this.setState({
        categoria: data.payload
      })
    }

    async editarProduto (){
        const {data} = await Servico.post("/editar-produto",{
                id:this.props.location.props.item['id'],
                nome:this.state.nome, 
                descricao: this.state.descricao, 
                preco: this.state.preco, 
                url: this.state.url, 
                categoria_id: this.state.categoriaSelecionada
        });
        this.setState({
        mensageAlert: data['mensagem']
        }, () => {
                    this.showAlert(data['status'])
                    this.setState({
                      nome: "",
                      descricao: "",
                      preco: "",
                      categoriaSelecionada: null,
                    })
                })
    }   
    
    showAlert(alert){ 
      if(alert){
          this.setState({
              successAlert: true
          }, () => setTimeout(() => this.setState({successAlert: false}), 5000))
      }else{
          this.setState({
              dangerAlert: true
          }, () => setTimeout(() => this.setState({dangerAlert: false}), 5000))           
      }
  }


    render() {
      const { classes } = this.props;
      return (
                <div>
                 {this.state.render && <Col xs="12" md="12">
                    <Card>
                      <CardBody><Col xs="3" md="3" style={{ paddingBottom: "20px" }}>
                        <h2>Editar Produto</h2>
                        </Col> 

                        <Col xs="12" md="12">
                            {this.state.successAlert && 
                                <Alert color="success">
                                    {this.state.mensageAlert}
                                </Alert>
                            }
                            {this.state.dangerAlert && 
                                <Alert color="danger">
                                    {this.state.mensageAlert}
                                </Alert>
                            }
                        </Col>
                        <Row>                          
                          <Col xs="12" md="6">
                            <FormGroup>
                              <Label htmlFor="nome">Nome</Label>
                              <Input type="text" id="nome" placeholder="Nome do Produto" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor="descricao">Descrição</Label>
                              <Input type="textarea" id="descricao" placeholder="Descrição do Produto" value={this.state.descricao} onChange={(event) => this.setState({descricao: event.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor="preco">Preço</Label>
                              <Input type="text" id="preco" placeholder="Preco do Produto: somente numeros" value={this.state.preco} onChange={(event) => this.setState({preco: event.target.value})}/>
                            </FormGroup>
                          </Col>
                          <Col xs="12" md="6">
                            <FormGroup>
                              <Col md="3">
                                <Label htmlFor="Categorias">Categorias</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" value={this.state.categoriaSelecionada} onChange={(event) => this.setState({categoriaSelecionada: event.target.value})}>
                                  <option>Categoria</option>
                                  { this.state.categoria != null ? 
                                    this.state.categoria.map((categoria, id) => 
                                    <option key={id} value={categoria['id']}>{categoria['nome']}</option>
                                  ): null}
                                </Input>
                              </Col>
                            </FormGroup>

                            <FormGroup>
                              <Col md="3">
                                <Label htmlFor="Imagem  ">Imagem</Label>
                              </Col>
                              <Col xs="12" md="9">
                              <div className="controls">
                                  <Input placeholder="Url" id="appendedInputButton" size="16" type="text" value={this.state.url} onChange={(event) => this.setState({url: event.target.value})}/>
                              </div>
                              </Col>
                            </FormGroup>

                            
                              <Col xs="12" md="9">
                                <Card className={classes.card}>
                                  <CardMedia
                                    className={classes.media}
                                    image={this.state.url}
                                  />
                              </Card> 
                              </Col>
                            
                          </Col>
                        </Row>

                        <div className="form-actions">
                          <Button onClick={this.editarProduto.bind(this)} type="submit" color="primary">Salvar</Button>
                          <Link style={{ textDecoration: 'none' }} to={{pathname: '/listaProdutos', state: this.state }}>
                            <Button color="secondary">Voltar</Button> 
                          </Link>   
                        </div>
                      </CardBody>
                    </Card>
                  </Col> }
                </div>
      );
    }
  }
  
    editarProduto.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(editarProduto);