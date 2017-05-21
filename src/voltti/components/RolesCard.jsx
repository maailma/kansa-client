import React from 'react';
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import OpenInNew from 'material-ui/svg-icons/action/open-in-new'


const labelStyle = {
  color: '#888',
  fontSize: 16
};

const RolesCard = ({ volunteer: { hugo, ex_mimo, ex_con, reg, outreach, program, helpdesk, logistic, turva, ops, site, members, design
 }, onChange, onSave, style }) => <Card style={style}>
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
    <CardHeader style={{ fontWeight: 600 }} title="Volunteer Roles"/>
      <CardText>
    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Hugo ceremony"
      onChange={(ev, key, value) => onChange({ hugo: value })}
      value={hugo}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Exhibtion MIMO"
      onChange={(ev, key, value) => onChange({ ex_mimo: value })}
      value={ex_mimo}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

      <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Exhibition at con"
      onChange={(ev, key, value) => onChange({ ex_con: value })}
      value={ex_con}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Registration"
      onChange={(ev, key, value) => onChange({ reg: value })}
      value={reg}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Outreach"
      onChange={(ev, key, value) => onChange({ outreach: value })}
      value={outreach}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Programme"
      onChange={(ev, key, value) => onChange({ program: value })}
      value={program}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Help Desk"
      onChange={(ev, key, value) => onChange({ helpdesk: value })}
      value={helpdesk}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Logistics"
      onChange={(ev, key, value) => onChange({ logistic: value })}
      value={logistic}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Turva at con"
      onChange={(ev, key, value) => onChange({ turva: value })}
      value={turva}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Ops"
      onChange={(ev, key, value) => onChange({ ops: value })}
      value={ops}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Site Selection"
      onChange={(ev, key, value) => onChange({ site: value })}
      value={site}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Member Services"
      onChange={(ev, key, value) => onChange({ members: value })}
      value={members}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Design resources"
      onChange={(ev, key, value) => onChange({ design: value })}
      value={design}
    >
      <MenuItem value="yes" primaryText="Definitely" />
      <MenuItem value="if" primaryText="If needed" />
      <MenuItem value="not" primaryText="Absolutely not" />
    </SelectField>

  </CardText>
  </Card>
;

RolesCard.propTypes = {
  volunteer: React.PropTypes.shape({
    hugo: React.PropTypes.string,
    ex_mimo: React.PropTypes.string,
    ex_con: React.PropTypes.string,
    reg: React.PropTypes.string,
    outreach: React.PropTypes.string,
    program: React.PropTypes.string,
    helpdesk: React.PropTypes.string,
    logistic: React.PropTypes.string,
    turva: React.PropTypes.string,
    ops: React.PropTypes.string,
    site: React.PropTypes.string,
    members: React.PropTypes.string,
    design: React.PropTypes.string,
    
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
};

export default RolesCard;
