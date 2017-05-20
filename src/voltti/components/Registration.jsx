import React from 'react';
import { connect } from 'react-redux'
const { Col, Row } = require('react-flexbox-grid');
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

import { setScene } from '../../app/actions/app'
import { API_ROOT } from '../../constants'
import API from '../../lib/api'

import VolunteerCard from './VolunteerCard'

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
      <Card style={{ marginBottom: '1rem'}}>
        <CardHeader style={{ fontWeight: 600 }} title="Roles Description"/>
        <CardText>
          <p><strong>Hugo ceremony</strong> - Positions at the Hugo ceremony include presenter guides (finding presenters in the audience and guiding them to the stage), award escorts (receiving awards from Hugo Admins and carrying them on stage, escorting winners off stage) and finalist section ushers & ramp support (escorting finalists from pre-reception to the venue & support next to the stage during event). Hugos also need runners/problem solvers who are fluent in both Finnish and English and have local knowledge of Helsinki.
          </p><p><strong>
          Exhibits MIMO</strong> - Move-In happens mostly on Tuesday and a bit on Wednesday, Move-Out on Sunday. Tasks will involve physical labour but not all of it will involve lifting (also measuring spaces and hanging posters).
          </p><p><strong>
          Exhibits at-con</strong> - At-con jobs for Exhibits include but are not limited to manning various desks, monitoring areas, and acting as liaison for dealers, as well as looking after the craft area and fan lounge.
          </p><p><strong>
          Registration</strong> - Registration needs custom service -oriented people behind the registration desk to welcome attendees of Worldcon75. Registration volunteers will check IDs, print name stickers and attach them to the badge, which is handed to the attendee.
          </p><p><strong>
          Outreach</strong> - Outreach needs press office receptionists, who welcome members of the press, direct them to the interview room and take messages as needed. Outreach also needs people for the Worldcon merchandise table.
          </p><p><strong>
          Program</strong> - Program runners keep track of time, remind participants to use mics, carry mics to audience for questions, help out with tech, make sure there&tilde;s water/cups in the rooms for the participants and count the number of people in the audience.
          </p><p><strong>
          HelpDesk</strong> - HelpDesk volunteers help members and staff with all kinds of technical questions. Good customer service attitude needed!
          </p><p><strong>
          Logistics/MIMO</strong> - For both Move-In/Move-Out and at-con, Turva needs volunteers who can move things around both inside and outside the venue. Volunteers with their own car in the Helsinki area are most welcome, but others are needed as well.
          </p><p><strong>
          Turva at-con</strong> - Turva at-con volunteers are needed for the cloakroom and the con office.
          </p><p><strong>
          Ops</strong> - Ops needs radio operators, desk staff and rovers, who wander the convention and ensure that everything goes smoothly.
          </p><p><strong>
          Site Selection</strong> - Site selection needs volunteers to sit at the site selection desk and take payments from voters, and to answer questions about the ballot system. Site selection also needs ballot counters.
          </p><p><strong>
          Member services</strong> - Member services needs volunteers for the info desk, alien/tourist info desk, and access desk, as well as the teen lounge.
          </p><p><strong>
          Design resources</strong> -  Design resources needs contributing editors for the con newsletter. Duties include submitting short news pieces and photographs via email, and editing one issue of the newsletter. Proficiency with Adobe Creative Suite is a plus.
          </p>
          </CardText>
      </Card>
      </Col>
    </Row>)
  }
}

export default connect(
  null, {
    setScene,
  }
)(Registration);
