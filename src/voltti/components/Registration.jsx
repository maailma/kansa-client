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

  static getInitialState(id) {
    return {
      people_id: parseInt(id),

      // personal info
      birth:'', phone:'', experience:'', jv: '', hygiene: '', firstaid: '',
      languages:'', tshirt: '', allergies: '',

      // roles
      hugo: '', ex_mimo: '', ex_con: '', reg: '', outreach: '', program: '',
      helpdesk: '', logistics: '', turva: '', ops: '', site: '', members: '',
      design: '',

      notes: '',
      hours: 0,
      day_in: false, day_1: false, day_2: false, day_3: false, day_4: false, day_5: false, day_out: false
    }
  }

  constructor(props) {
    super(props)
    const { id } = props.params
    this.state = Registration.getInitialState(id)
    this.api = new API(`${API_ROOT}voltti/${id}/`)
    this.api.GET('volunteer').then(volunteer => {
      if (volunteer && volunteer.people_id > 0) {
        this.setState(volunteer);
        console.log('voltti', volunteer);
      }
    })
  }

  componentDidMount() {
    this.props.setScene({ title: 'Volunteer Registration', dockSidebar: false });
  }

  componentWillReceiveProps({ params: { id } }) {
    if (id !== this.props.params.id) {
      this.api = new API(`${API_ROOT}voltti/${id}/`)
      this.api.GET('volunteer').then(volunteer => {
        this.setState(
          volunteer && volunteer.people_id > 0 ? volunteer
          : Registration.getInitialState(id)
        )
        console.log('voltti', volunteer)
      })
    }
  }

  handleSubmit = () => {
    this.api.POST('volunteer', this.state).then(res => {
      console.log('POST VOLUNTEER', this.state, res)
    });
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
          onSave={this.handleSubmit}
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
          onSave={this.handleSubmit}
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
