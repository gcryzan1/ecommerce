import React, { Component } from 'react';
import ProductList from '../../componentes/productList';
import { UncontrolledTooltip, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Servico from '../../../services/servico';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ProductsActions } from "../../../../store/ducks/carrinho";


class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            render: false,
          };
        } 
    
    componentWillMount(){
        this.getProducts()
    }

    async getProducts (){
      const {data} = await Servico.get("/produto-por-categoria");
      this.setState({
          data: data.payload
      }, ()=>console.log(this.state.data))
    }   
 
    render() {
      return (
              <div>
                {Object.keys(this.state.data).map((categoria, index) =>
                  <div style={{margin: '10px'}}>
                    <ProductList
                        adicionarCarrinho={this.handleSubmit}
                        categoria={categoria}
                        products={this.state.data[categoria]}
                    />
                  </div>
                )}
              </div>
                
      );
    }
  }
  const mapStateToProps = state => ({
    carrinho: state.carrinho
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(ProductsActions, dispatch);
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(home);

  