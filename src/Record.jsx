import React from 'react';
import axios from 'axios';

import {URL} from './constants/constants';

export default class Record extends React.Component {

state = {
    records : []
}
    componentDidMount() {
      // axios call for fetching json data
       this.fetchRecords();
    }

    fetchRecords = async ()=>{
        try {
            let records = await axios.get(URL);
            this.setState({records: records.data});
            this.props.sendRecordsToParent(records.data);
        } catch(e) {
            console.log('some error occured',e);
        }
    }
    render(){
        return (
          <div>
          <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">SNO</th>
      <th scope="col">Name</th>
      <th scope="col">Start date</th>
      <th scope="col">End date</th>
    </tr>
  </thead>
  <tbody>
   {
       this.state.records.map((record,index)=>(
      <tr>
      <th scope="row">{record.id}</th>
      <td>{record.name}</td>
      <td>{record.start}</td>
      <td>{record.end}</td>
    </tr>
       ))
   }
  </tbody>
</table>
</div>
        )
    }
}