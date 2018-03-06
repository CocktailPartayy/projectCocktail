import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productID: '',
      lcboAddress: [],
      iid: '',
      location: ''
    }
  }

  componentDidMount() {
    axios.get(`${config.apiURLP}`, {
      params: {
        access_key: config.apiKey,
        q: 'vodka', // from search
      }
    }).then((productID) => {
    const product = productID.data.result[0].id;
    console.log(product)
      this.setState({
        productID: product
      })
    });

    axios.get(`${config.apiURLS}`, {
      params: {
        access_key: config.apiKey,
        q: `${this.state.productID}`,
        geo: 'mississauga', // add in location
      }
    }).then(({data}) => {
      const lcbo = data.result;
      console.log(lcbo);
      const id = lcbo[0].id
      this.setState({
        lcboAddress: lcbo,
        iid: id
      })
    })

    axios.get('http://lcboapi.com/inventories', {
      params: {
        access_key: config.apiKey,
        store_id: '568',
        product_id: '257238'
      }
    }).then(({data}) => {
      console.log(data.result[0].quantity);
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.lcboAddress.map((address) => {
            return <Address add={address.address_line_1} key={address.id} />
          })}
        </ul>
      </div>
    )
  }
}

const Address = (props) => {
  return (
    <li>{props.add}</li>
  );
};


ReactDOM.render(<App />, document.getElementById('app'));
