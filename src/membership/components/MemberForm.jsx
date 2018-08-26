import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Row } from 'react-flexbox-grid'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { disabledColor } from '../../theme/colors'
import * as PaymentPropTypes from '../../payments/proptypes'
import { isAttendingMember } from '../constants'
import messages from '../messages'
import { TextInput } from './form-components'
import PaperPubs, { paperPubsIsValid } from './paper-pubs'
import PreviewBadge from './preview-badge'

export const hintStyle = {
  color: disabledColor,
  fontSize: 13,
  marginBottom: 24
}

const PreviewBadgeButton = ({ member, style }) => (
  <PreviewBadge
    memberId={member.get('id')}
    name={member.get('badge_name') || member.get('preferred_name')}
    subtitle={member.get('badge_subtitle') || member.get('country')}
  >
    <FlatButton label="Preview" primary style={style} />
  </PreviewBadge>
)

export default class MemberForm extends Component {
  static propTypes = {
    data: PaymentPropTypes.data,
    isAdmin: PropTypes.bool,
    lc: PropTypes.string,
    member: ImmutablePropTypes.mapContains({
      paper_pubs: ImmutablePropTypes.map
    }),
    newDaypass: PropTypes.bool,
    newMember: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
  }

  static isValid(member) {
    return (
      Map.isMap(member) &&
      member.get('legal_name', false) &&
      member.get('email', false) &&
      paperPubsIsValid(member.get('paper_pubs'))
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      member: props.member || Map()
    }
  }

  componentDidMount() {
    this.focusRef && this.focusRef.focus()
  }

  componentWillReceiveProps(nextProps) {
    const { member, onChange } = nextProps
    if (!member) {
      this.setState({ member: Map() })
    } else if (!member.equals(this.props.member)) {
      this.setState({ member }, () => {
        onChange(this.isValid, this.changes)
      })
    }
  }

  get changes() {
    const { member, newDaypass, newMember } = this.props
    return this.state.member.filter(
      newDaypass || newMember || !member
        ? value => value
        : (value, key) => {
            let v0 = member.get(key)
            if (typeof value === 'string' && !v0) v0 = ''
            return Map.isMap(value) ? !value.equals(v0) : value !== v0
          }
    )
  }

  getDefaultValue = path =>
    (this.props.member && this.props.member.getIn(path)) || ''
  getValue = path => this.state.member.getIn(path) || ''

  get isValid() {
    return MemberForm.isValid(this.state.member)
  }

  msg(key, params) {
    const { lc = 'en' } = this.props
    const fn = messages[lc][key]
    return fn ? fn(params) : key
  }

  onChange = (path, value) => {
    this.setState(
      {
        member: this.state.member.setIn(path, value)
      },
      () => {
        this.props.onChange(this.isValid, this.changes)
      }
    )
  }

  render() {
    const { data, isAdmin, lc, newDaypass, newMember, tabIndex } = this.props
    const { member } = this.state
    const inputProps = {
      getDefaultValue: this.getDefaultValue,
      getValue: this.getValue,
      lc,
      onChange: this.onChange,
      tabIndex
    }
    return (
      <form>
        <Row>
          <Col xs={12}>
            <TextInput
              {...inputProps}
              inputRef={ref => {
                this.focusRef = ref
              }}
              path="legal_name"
              required
            />
            {!isAdmin && (
              <div style={hintStyle}>{this.msg('legal_name_hint')}</div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <TextInput {...inputProps} path="public_first_name" />
          </Col>
          <Col xs={12} sm={6}>
            <TextInput {...inputProps} path="public_last_name" />
          </Col>
          {!isAdmin && (
            <Col xs={12} style={hintStyle}>
              {this.msg('public_name_hint')}
            </Col>
          )}
        </Row>
        {lc !== 'daypass' &&
          isAttendingMember(member) && (
            <Row style={{ alignItems: 'flex-end' }}>
              <Col xs={12} sm={6}>
                <TextInput
                  hintText={member.get('preferred_name')}
                  multiLine
                  path="badge_name"
                  rowsMax={2}
                  {...inputProps}
                />
              </Col>
              <Col xs={12} sm={isAdmin ? 3 : 6} md={isAdmin ? 4 : 6}>
                <TextInput
                  {...inputProps}
                  path="badge_subtitle"
                  hintText={member.get('country')}
                />
              </Col>
            </Row>
          )}
        <Row>
          <Col xs={12} sm={4}>
            {isAdmin || newDaypass || newMember
              ? [
                  <TextInput
                    {...inputProps}
                    key="input"
                    path="email"
                    required
                  />,
                  !isAdmin && (
                    <div key="hint" style={hintStyle}>
                      {this.msg('new_email_hint')}
                    </div>
                  )
                ]
              : [
                  <TextInput
                    {...inputProps}
                    key="input"
                    path="email"
                    disabled
                  />,
                  <div key="hint" style={hintStyle}>
                    To change the email address associated with this membership,
                    please get in touch with us at{' '}
                    <a href="mailto:registration@conzealand.nz">
                      registration@conzealand.nz
                    </a>
                  </div>
                ]}
          </Col>
          <Col xs={12} sm={8}>
            <TextInput {...inputProps} path="city" required />
            <TextInput {...inputProps} path="state" />
            <TextInput {...inputProps} path="country" required />
            {!isAdmin && (
              <Col xs={12} style={hintStyle}>
                {this.msg('location_hint')}
              </Col>
            )}
          </Col>
        </Row>
      </form>
    )
  }
}
