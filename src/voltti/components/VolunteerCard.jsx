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

const VolunteerCard = ({ volunteer: { birth, phone, experience, JV, hygiene, firstaid, languages, tshirt , allergies, notes
 }, onChange, onSave, style }) => <Card style={style}>
  <CardHeader style={{ fontWeight: 600 }} title="Volunteer Details"/>
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
      <MenuItem disabled primaryText="Unisex" />
      <MenuItem value="uS" primaryText="S" />
      <MenuItem value="uM" primaryText="M" />
      <MenuItem value="uL" primaryText="L" />
      <MenuItem value="uXL" primaryText="XL" />
      <MenuItem value="u2XL" primaryText="2XL" />
      <MenuItem value="u3XL" primaryText="3XL" />
      <MenuItem value="u4XL" primaryText="4XL" />
      <MenuItem value="u5XL" primaryText="5XL" />
     <MenuItem disabled primaryText="Ladyfit" />
      <MenuItem value="lS" primaryText="S" />
      <MenuItem value="lM" primaryText="M" />
      <MenuItem value="lL" primaryText="L" />
      <MenuItem value="lXL" primaryText="XL" />
      <MenuItem value="l2XL" primaryText="2XL" />
      <MenuItem disabled primaryText="Youth" />
      <MenuItem value="yS" primaryText="S" />
      <MenuItem value="yM" primaryText="M" />
      <MenuItem value="yL" primaryText="L" />
      <MenuItem value="yXL" primaryText="XL" />
 
    </SelectField>
     Link to seizes table

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Other Notes (Please note here if you have a car you can use for MIMO/during the convention)"
      fullWidth={true}
      onChange={ev => onChange({ notes: ev.target.value })}
      value={notes}
      rows= {4}
    />
  </CardText>
  <CardHeader style={{ fontWeight: 600 }} title="Hours and Dates"/>


  <CardText>
-- Hours
-- Tuesday August 8 (MIMO only) 
-- Wednesday August 9 
-- Thursday August 10 
-- Friday August 11 
-- Saturday August 12 
-- Sunday August 13 
-- Monday August 14 (MIMO only)

-- Tue8, Wed9, Thu10, Fri11, Sat12, Sun13, Mon14
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
    // hugo: React.PropTypes.string,
    // ex_mimo: React.PropTypes.string,
    // ex_con: React.PropTypes.string,
    // reg: React.PropTypes.string,
    // outreach: React.PropTypes.string,
    // program: React.PropTypes.string,
    // helpdesk: React.PropTypes.string,
    // logistic: React.PropTypes.string,
    // turva: React.PropTypes.string,
    // ops: React.PropTypes.string,
    // site: React.PropTypes.string,
    // members: React.PropTypes.string,
    // design: React.PropTypes.string,
    notes: React.PropTypes.string,
    
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
};

export default VolunteerCard;
