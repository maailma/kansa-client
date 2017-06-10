import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import OpenInNew from 'material-ui/svg-icons/action/open-in-new'
import { TShirtDialog } from './tshirtdialog'

const labelStyle = {
  color: '#888',
  fontSize: 16
}

const VolunteerCard = ({ volunteer: { birth, phone, experience, jv,
  hygiene, firstaid, languages, tshirt ,allergies, notes, hours,
  day_in, day_1, day_2, day_3, day_4, day_5, day_out
 }, onChange, onSave, style }) => <Card style={style}>
  <CardHeader style={{ fontWeight: 600 }} title="Volunteer Details"/>
  <CardText>

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Year of Birfth"
      fullWidth={true}
      onChange={(_, birth) => onChange({ birth })}
      value={birth}
    />


    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Phone Number"
      fullWidth={true}
      onChange={(_, phone) => onChange({ phone })}
      value={phone}
    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Previous Con Experience"
      fullWidth={true}
      onChange={(_, experience) => onChange({ experience })}
      value={experience}
      rows={4}

    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Security Officer Licence and expiration date"
      fullWidth={true}
      onChange={(_, jv) => onChange({ jv })}
      value={jv}
    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Hygiene Passport and expiration date"
      fullWidth={true}
      onChange={(_, hygiene) => onChange({ hygiene })}
      value={hygiene}
    />

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="First Aid Training"
      fullWidth={true}
      onChange={(_, firstaid) => onChange({ firstaid })}
      value={firstaid}
      rows={3}
    />
    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="List of Languages"
      fullWidth={true}
      onChange={(_, languages) => onChange({ languages })}
      value={languages}
      rows={3}
    />
    <label style={labelStyle} >(native/fluent/excellent/good/basic)</label>
    <br/>
    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Allergies / Special Diet"
      fullWidth={true}
      onChange={(_, allergies) => onChange({ allergies })}
      value={allergies}
      rows={3}
    />

    <SelectField
      floatingLabelStyle={labelStyle}
      floatingLabelText="T-shirt size"
      onChange={(ev, key, tshirt) => onChange({ tshirt })}
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

    <TShirtDialog>
      <span style={{ cursor: 'pointer', textDecoration: 'underline', paddingLeft: 10, position: 'relative', top: -7 }}>
        <strong>T-shirt size details</strong>
        <OpenInNew style={{ color: '#888', height: 16, marginLeft: 2, position: 'relative', top: 3 }} />
      </span>
    </TShirtDialog>

    <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="Other Notes (Please note here if you have a car you can use for MIMO/during the convention)"
      fullWidth={true}
      onChange={(_, notes) => onChange({ notes })}
      value={notes}
      rows= {4}
    />
  </CardText>
  <CardHeader style={{ fontWeight: 600 }} title="Hours and Dates"/>
  <CardText>
  <TextField
      floatingLabelStyle={labelStyle}
      floatingLabelText="How many hours are you willing to work, in total?"
      fullWidth={true}
      onChange={(_, hours) => onChange({ hours })}
      value={hours}
      type='number'
    />
    <label style={labelStyle}>
      If you register as a volunteer by <strong>July 31</strong>, you will get your volunteer t-shirt for <strong>15</strong> hours of work. If you register on <strong>August 1</strong> or later, you will need 20 hours of work for the t-shirt.
      <br/>
      (If you wish to work for more than 20 hours, come to the Volunteers desk at the convention for extra work.)
    </label>
    <hr/>

    <Checkbox
      checked={day_in}
      label = 'On Tuesday August 8 (MIMO only)'
      labelStyle={labelStyle}
      onCheck={(_, day_in) => onChange({ day_in })}
      style={{ width: '100%' }}
    />
    <Checkbox
      label = 'On Wednesday August 9'
      checked={day_1}
      labelStyle={labelStyle}
      onCheck={(_, day_1) => onChange({ day_1 })}
      style={{ width: '100%' }}
    />
    <Checkbox
      label='On Thursday August 10'
      checked={day_2}
      labelStyle={labelStyle}
      onCheck={(_, day_2) => onChange({ day_2 })}
      style={{ width: '100%' }}
    />
    <Checkbox
      label='On Friday August 11'
      checked={day_3}
      labelStyle={labelStyle}
      onCheck={(_, day_3) => onChange({ day_3 })}
      style={{ width: '100%' }}
    />
    <Checkbox
      label='On Saturday August 12'
      checked={day_4}
      labelStyle={labelStyle}
      onCheck={(_, day_4) => onChange({ day_4 })}
      style={{ width: '100%' }}
    />
    <Checkbox
      label='On Sunday August 13'
      checked={day_5}
      labelStyle={labelStyle}
      onCheck={(_, day_5) => onChange({ day_5 })}
      style={{ width: '100%' }}
    />
    <Checkbox
      label='On Moday August 14 (MIMO only)'
      checked={day_out}
      labelStyle={labelStyle}
      onCheck={(_, day_out) => onChange({ day_out })}
      style={{ width: '100%' }}
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

</Card>

VolunteerCard.propTypes = {
  volunteer: PropTypes.shape({
    birth: PropTypes.string,
    phone: PropTypes.string,
    experience: PropTypes.string,
    jv: PropTypes.string,
    hygiene: PropTypes.string,
    firstaid: PropTypes.string,
    languages: PropTypes.string,
    allergies: PropTypes.string,
    tshirt: PropTypes.string,
    // hugo: PropTypes.string,
    // ex_mimo: PropTypes.string,
    // ex_con: PropTypes.string,
    // reg: PropTypes.string,
    // outreach: PropTypes.string,
    // program: PropTypes.string,
    // helpdesk: PropTypes.string,
    // logistic: PropTypes.string,
    // turva: PropTypes.string,
    // ops: PropTypes.string,
    // site: PropTypes.string,
    // members: PropTypes.string,
    // design: PropTypes.string,
    hours: PropTypes.number,

  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default VolunteerCard
