import React from 'react';
import { connect } from 'react-redux'
const { Col, Row } = require('react-flexbox-grid');
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { setScene } from '../../app/actions/app'
import { API_ROOT } from '../../constants'
import API from '../../lib/api'

import VolunteerCard from './VolunteerCard'
import RolesCard from './RolesCard'

const labelStyle = {
  color: '#888',
  fontSize: 16
};

class Registration extends React.Component {

  static propTypes = {
    setScene: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const member = props.params.id;
    this.state = {
      api: new API(`${API_ROOT}voltti/${member}/`),
      people_id: parseInt(member),
      birth:'', 
      phone:'', 
      experience:'',
      JV: '', 
      hygiene: '',
      firstaid: '', 
      languages:'',
      tshirt: '',
      allergies: '',
      hugo: '',
      ex_mimo: '',
      ex_con: '', 
      reg: '',
      outreach: '',
      program: '',
      helpdesk: '',
      logistic: '', 
      turva: '',
      ops: '', 
      site: '', 
      members: '',
      design: '',
      notes: '',
      hours: 0,
      Tue8: false, 
      Wed9: false, 
      Thu10: false, 
      Fri11: false, 
      Sat12: false, 
      Sun13: false, 
      Mon14: false

    };
    const volunteer = this.state.api;
    volunteer.GET('volunteer').then(volunteer => {
            if (volunteer && volunteer.people_id > 0) {
              this.setState(volunteer);
              console.log('voltti', volunteer);
    }
    });

  }

  componentDidMount() {
    this.props.setScene({ title: 'Volunteer Registration', dockSidebar: false });

  }

  handleSubmit() {
    const volunteer = Object.assign({}, this.state, {
      api: undefined,
    });
    this.state.api.POST('volunteer', volunteer).then(res => console.log('POST VOLUNTEER', volunteer, res));
  }

  saveVolunteer(i, id, work) {
    const volunteer = this.state.api;
    if (id) {
      volunteer.POST(`volunteer`, volunteer).then(res => {
        console.log('POST VOLUNTEER', res);
      });
    } 
  }

  render() {

    return (<Row>
      <Col
        xs={12} sm={6}
        md={5} mdOffset={1}
        lg={4} lgOffset={2}
      >
        <VolunteerCard
          volunteer={this.state}
          onChange={update => this.setState(update)}
          onSave={() => this.handleSubmit()}
          style={{ marginBottom: '1rem' }}
        />
      </Col>
      <Col
        xs={12} sm={6}
        md={5} 
        lg={4} 
      >
        <RolesCard
          volunteer={this.state}
          onChange={update => this.setState(update)}
          onSave={() => this.handleSubmit()}
          style={{ marginBottom: '1rem' }}
        />
      </Col>
    </Row>)
  }
}

export default connect(
  null, {
    setScene,
  }
)(Registration);
