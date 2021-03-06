import React, { Component } from 'react';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import Servico from '../../../services/servico';

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


class editarFuncionario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            nome: "",
            login: "",
            salario: "",
            senha: "",
            dangerAlert: false,
            successAlert: false,
            mensageAlert: "",
            render: false,
          };
        }
    
    componentWillMount(){
      const funcionario = JSON.parse(atob(this.props.match.params.funcionario));

      if(funcionario){
        this.setState({
          id:funcionario['id']
        }, ()=>this.geFuncionario())
      }
    }
    
    async geFuncionario (){
      const {data} = await Servico.post("/get-funcionario-id",{login:this.state.id});
      this.setState({
            login: data.payload.login,
            nome: data.payload.nome,
            salario: data.payload.salario,
      }, () => this.setState({render: true}))
    }

    async editarFuncionario (){
        const {data} = await Servico.post("/editar-funcionario",{
                login:this.props.location.props.item['login'],
                novoLogin: this.state.login,
                nome:this.state.nome, 
                senha: this.state.senha,
                salario: this.state.salario,
        });
        this.setState({
        mensageAlert: data['mensagem']
        }, () => {
                    this.showAlert(data['status'])
                    this.setState({
                      nome: "",
                      login: "",
                      salario: "",
                      senha: "",
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
      return (
                <div>
                  {this.state.render && 
                  <Col xs="12" md="12">
                    <Card>
                      <CardBody><Col xs="3" md="3" style={{ paddingBottom: "20px" }}>
                        <h2>Editar Funcionario</h2>
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
                                <Label htmlFor="nome">Login</Label>
                                <Input type="text" id="login" placeholder="Login do Funcionario" value={this.state.login} onChange={(event) => this.setState({login: event.target.value})}/>
                              </FormGroup>

                              <FormGroup>
                                <Label htmlFor="nome">Nome</Label>
                                <Input type="text" id="nome" placeholder="Nome do Funcionario" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})}/>
                              </FormGroup>

                              <FormGroup>
                                <Label htmlFor="selario">Salario</Label>
                                <Input type="text" id="salario" placeholder="Salario do Funcionario" value={this.state.salario} onChange={(event) => this.setState({salario: event.target.value})}/>
                              </FormGroup>

                              <FormGroup>
                                <Label htmlFor="senha">Senha</Label>
                                <Input type="text" id="senha" placeholder="Senha do Funcionario" value={this.state.senha} onChange={(event) => this.setState({senha: event.target.value})}/>
                              </FormGroup>
                          </Col>
                        </Row>

                        <div className="form-actions">
                          <Button onClick={this.editarFuncionario.bind(this)} type="submit" color="primary">Salvar</Button>
                          <Link style={{ textDecoration: 'none' }} to={{pathname: '/listaFuncionario', state: this.state }}>
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
  
  export default editarFuncionario;
  