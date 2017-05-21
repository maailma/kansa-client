import React from 'react';
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import OpenInNew from 'material-ui/svg-icons/action/open-in-new'


const labelStyle = {
  color: '#888',
  fontSize: 16
};

const VolunteerCard = ({ volunteer: { birth, phone, experience, JV, hygiene, firstaid, languages, tshirt , allergies,
  hugo, ex_mimo, ex_con, reg, outreach, program, helpdesk, logistic, turva, ops, site, members, design, notes
 }, onChange, onSave, style }) => <Card style={style}>
  <CardHeader style={{ fontWeight: 600 }} title="Volunteer information"/>
  <CardText>
    
    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Year of Birfth"
      fullWidth={true}
      onChange={ev => onChange({ birth: ev.target.value })}
      value={birth}
    />


    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Phone Number"
      fullWidth={true}
      onChange={ev => onChange({ phone: ev.target.value })}
      value={phone}
    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Previous Con Experience"
      fullWidth={true}
      onChange={ev => onChange({ experience: ev.target.value })}
      value={experience}
      rows={4}

    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Security Officer Licence and expiration date"
      fullWidth={true}
      onChange={ev => onChange({ JV: ev.target.value })}
      value={JV}
    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Hygiene Passport and expiration date"
      fullWidth={true}
      onChange={ev => onChange({ hygiene: ev.target.value })}
      value={hygiene}
    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="First Aid Training"
      fullWidth={true}
      onChange={ev => onChange({ firstaid: ev.target.value })}
      value={firstaid}
      rows={3}
    />
    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="List of Languages"
      fullWidth={true}
      onChange={ev => onChange({ languages: ev.target.value })}
      value={languages}
      rows={3}
    />
    <label style={labelStyle} >(native/fluent/excellent/good/basic)</label>
    <br/>
    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Allergies / Special Diet"
      fullWidth={true}
      onChange={ev => onChange({ allergies: ev.target.value })}
      value={allergies}
      rows={3}
    />

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="T-shirt size"
      onChange={(ev, key, value) => onChange({ tshirt: value })}
      value={tshirt}
    >
      <MenuItem value="S" primaryText="S" />
      <MenuItem value="M" primaryText="M" />
      <MenuItem value="L" primaryText="L" />
      <MenuItem value="XL" primaryText="XL" />
      <MenuItem value="XXL" primaryText="XXL" />
    </SelectField>

    <h3>Volunteer Roles</h3>

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

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Other Notes (Please note here if you have a car you can use for MIMO/during the convention)"
      fullWidth={true}
      onChange={ev => onChange({ notes: ev.target.value })}
      value={notes}
      rows= {4}
    />

  </CardText>

  <CardActions style={{ alignItems: 'center', display: 'flex', padding: 16 }}>
    <RaisedButton
      label="Save"
      onClick={onSave}
      primary={true}
      type="submit"
    />
  </CardActions>

</Card>;

VolunteerCard.propTypes = {
  volunteer: React.PropTypes.shape({
    birth: React.PropTypes.string,
    phone: React.PropTypes.string,
    experience: React.PropTypes.string,
    JV: React.PropTypes.string,
    hygiene: React.PropTypes.string,
    firstaid: React.PropTypes.string,
    languages: React.PropTypes.string,
    tshirt: React.PropTypes.string,
    allergies: React.PropTypes.string,
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
    notes: React.PropTypes.string,
    
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
};

export default VolunteerCard;
