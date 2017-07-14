import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import OpenInNew from 'material-ui/svg-icons/action/open-in-new'

const roles = {
  hugo: {
    title: 'Hugo ceremony',
    desc: 'Positions at the Hugo ceremony include presenter guides (finding presenters in the audience and guiding them to the stage), award escorts (receiving awards from Hugo Admins and carrying them on stage, escorting winners off stage) and finalist section ushers & ramp support (escorting finalists from pre-reception to the venue & support next to the stage during event). Hugos also need runners/problem solvers who are fluent in both Finnish and English and have local knowledge of Helsinki.'
  },
  ex_mimo: {
    title: 'Exhibits MIMO',
    desc: 'Move-In happens mostly on Tuesday and a bit on Wednesday, Move-Out on Sunday. Tasks will involve physical labour but not all of it will involve lifting (also measuring spaces and hanging posters).'
  },
  ex_con: {
    title: 'Exhibits at-con',
    desc: 'At-con jobs for Exhibits include but are not limited to manning various desks, monitoring areas, and acting as liaison for dealers, as well as looking after the craft area and fan lounge.'
  },
  reg: {
    title: 'Registration',
    desc: 'Registration needs custom service -oriented people behind the registration desk to welcome attendees of Worldcon75. Registration volunteers will check IDs, print name stickers and attach them to the badge, which is handed to the attendee.'
  },
  outreach: {
    title: 'Outreach',
    desc: 'Outreach needs press office receptionists, who welcome members of the press, direct them to the interview room and take messages as needed. Outreach also needs people for the Worldcon merchandise table.'
  },
  program: {
    title: 'Program',
    desc: 'Program runners keep track of time, remind participants to use mics, carry mics to audience for questions, help out with tech, make sure there&tilde;s water/cups in the rooms for the participants and count the number of people in the audience.'
  },
  helpdesk: {
    title: 'HelpDesk',
    desc: 'HelpDesk volunteers help members and staff with all kinds of technical questions. Good customer service attitude needed!'
  },
  logistics: {
    title: 'Logistics/MIMO',
    desc: 'For both Move-In/Move-Out and at-con, Turva needs volunteers who can move things around both inside and outside the venue. Volunteers with their own car in the Helsinki area are most welcome, but others are needed as well.'
  },
  turva: {
    title: 'Turva at-con',
    desc: 'Turva at-con volunteers are needed for the cloakroom and the con office.'
  },
  ops: {
    title: 'Ops',
    desc: 'Ops needs radio operators, desk staff and rovers, who wander the convention and ensure that everything goes smoothly.'
  },
  site: {
    title: 'Site Selection',
    desc: 'Site selection needs volunteers to sit at the site selection desk and take payments from voters, and to answer questions about the ballot system. Site selection also needs ballot counters.'
  },
  members: {
    title: 'Member services',
    desc: 'Member services needs volunteers for the info desk, alien/tourist info desk, and access desk, as well as the teen lounge.'
  },
  design: {
    title: 'Design resources',
    desc: ' Design resources needs contributing editors for the con newsletter. Duties include submitting short news pieces and photographs via email, and editing one issue of the newsletter. Proficiency with Adobe Creative Suite is a plus.'
  }
}

const RolesCard = ({ onChange, onSave, style, volunteer }) => (
  <Card style={style}>
    <CardHeader style={{ fontWeight: 600 }} title="Roles Description"/>
    <CardText>
      {Object.keys(roles).map(name => {
        const { desc, title } = roles[name]
        return <p key={name}><b>{title}</b> - {desc}</p>
      })}
    </CardText>
    <CardHeader style={{ fontWeight: 600 }} title="Volunteer Roles"/>
    <CardText>
      {Object.keys(roles).map(name => {
        const { title } = roles[name]
        return (
          <SelectField
            key={name}
            floatingLabelStyle={{ color: '#888', fontSize: 16 }}
            floatingLabelText={title}
            onChange={(ev, key, value) => onChange({ [name]: value })}
            value={volunteer[name]}
          >
            <MenuItem value="yes" primaryText="Definitely" />
            <MenuItem value="if" primaryText="If needed" />
            <MenuItem value="not" primaryText="Absolutely not" />
          </SelectField>
        )
      })}
    </CardText>
  </Card>
)

RolesCard.propTypes = {
  volunteer: PropTypes.shape({
    hugo: PropTypes.string,
    ex_mimo: PropTypes.string,
    ex_con: PropTypes.string,
    reg: PropTypes.string,
    outreach: PropTypes.string,
    program: PropTypes.string,
    helpdesk: PropTypes.string,
    logistics: PropTypes.string,
    turva: PropTypes.string,
    ops: PropTypes.string,
    site: PropTypes.string,
    members: PropTypes.string,
    design: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default RolesCard
