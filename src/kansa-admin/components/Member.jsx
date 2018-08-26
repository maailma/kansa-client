import { Map } from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import { ConfigConsumer, ConfigProvider } from '../../lib/config-context'
import MemberForm from '../../membership/components/MemberForm'
import printBadge from '../printBadge'
import MemberLog from './MemberLog'
import NewInvoice from './NewInvoice'
import Upgrade from './Upgrade'

export const defaultMember = Map({
  legal_name: '',
  email: '',
  badge_name: '',
  badge_subtitle: '',
  public_first_name: '',
  public_last_name: '',
  country: '',
  state: '',
  city: ''
})

export const memberFields = [
  'membership',
  'legal_name',
  'email',
  'badge_name',
  'badge_subtitle',
  'public_first_name',
  'public_last_name',
  'country',
  'state',
  'city'
]

export const membershipTypes = [
  'NonMember',
  'Exhibitor',
  'Helper',
  'Supporter',
  'KidInTow',
  'Child',
  'YoungAdult',
  'Unwaged',
  'Adult'
]

class Member extends PureComponent {
  static propTypes = {
    api: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    locked: PropTypes.bool.isRequired,
    member: ImmutablePropTypes.mapContains({
      id: PropTypes.number,
      legal_name: PropTypes.string,
      email: PropTypes.string,
      badge_name: PropTypes.string,
      badge_subtitle: PropTypes.string,
      public_first_name: PropTypes.string,
      public_last_name: PropTypes.string,
      country: PropTypes.string,
      state: PropTypes.string,
      city: PropTypes.string,
    }),
    printer: PropTypes.string,
    setMember: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired
  }

  state = {
    changes: Map(),
    sent: false,
    valid: true
  }

  componentWillReceiveProps({ api, member, setMember }) {
    if (member && !member.equals(this.props.member)) {
      this.setState({ changes: Map(), sent: false, valid: true })
      if (!this.props.member) {
        api.GET(`people/${member.get('id')}`).then(setMember)
      }
    }
  }

  get actions() {
    const {
      api,
      handleClose,
      locked,
      member,
      printer,
      showMessage
    } = this.props
    const { changes, sent, valid } = this.state
    const hasChanges = changes.size > 0
    const id = member.get('id')
    const membership = member.get('membership')

    const actions = [
      <FlatButton key="close" label="Close" onClick={handleClose} />,
      <FlatButton
        key="ok"
        disabled={sent || !hasChanges || !valid}
        label={sent ? 'Working...' : 'Apply'}
        onClick={() => this.save().then(handleClose)}
      />
    ]

    const daypass = member.get('daypass')
    if (
      printer &&
      membership !== 'Supporter' &&
      (membership !== 'NonMember' || daypass)
    ) {
      let label = daypass ? 'Claim daypass' : 'Print badge'
      if (member.get('badge_print_time')) label = 'Re-' + label
      if (hasChanges) label = 'Save & ' + label
      actions.unshift(
        <FlatButton
          disabled={sent || !valid}
          label={label}
          onClick={() =>
            this.handleBadgePrint().then(() =>
              showMessage(
                `${
                  daypass ? 'Daypass claimed' : 'Badge printed'
                } for ${member.get('preferred_name')}`
              )
            )
          }
          style={{ float: 'left' }}
        />
      )
    }

    return actions
  }

  handleBadgePrint = () => {
    const { api, handleClose, member, printer } = this.props
    const { changes } = this.state
    const prev = member.get('badge_print_time')
    const print =
      !prev ||
      window.confirm(
        [
          'Are you sure?',
          '',
          member.get('daypass')
            ? 'Daypass was already claimed at:'
            : 'Badge was already printed at:',
          new Date(prev).toLocaleString('en-GB', {
            hour12: false,
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric'
          })
        ].join('\n')
      )
    if (!print) return Promise.reject()
    const [pu, pn] = printer.split('#')
    return (member.get('daypass')
      ? Promise.resolve()
      : printBadge(pu, pn, member.merge(changes))
    )
      .catch(err => {
        console.error('Badge print failed!', err)
        window.alert(
          'Badge print failed! ' + (err.message || err.statusText || err.status)
        )
        throw err
      })
      .then(() => api.POST(`people/${member.get('id')}/print`))
      .then(() => (changes.size > 0 ? this.save() : null))
      .then(handleClose)
  }

  handleChange = (valid, changes) => {
    this.setState({ changes, valid })
  }

  save() {
    const { api, member, showMessage } = this.props
    const { changes } = this.state
    this.setState({ sent: true })
    return api
      .POST(`people/${member.get('id')}`, changes.toJS())
      .then(() => showMessage(`Data saved for ${member.get('preferred_name')}`))
      .catch(err => {
        console.error('Member save failed!', err)
        window.alert('Member save failed! ' + err.message)
        throw err
      })
  }

  render() {
    const { handleClose, member } = this.props
    if (!member) return null
    const membership = member.get('membership', 'NonMember')

    // FIXME: The material-ui 0.20 <Dialog> does not allow context to pass
    // through like it should; hence this Consumer/Dialog/Provider hack.
    return (
      <ConfigConsumer>
        {config => (
          <Dialog
            actions={this.actions}
            title={
              <div title={'ID: ' + member.get('id')}>
                <div
                  style={{
                    color: 'rgba(0, 0, 0, 0.3)',
                    float: 'right',
                    fontSize: 11,
                    fontStyle: 'italic',
                    lineHeight: 'normal',
                    textAlign: 'right'
                  }}
                >
                  Last modified
                  <br />
                  {member.get('last_modified')}
                </div>
                {membership === 'NonMember'
                  ? 'Non-member'
                  : /^DP/.test(membership)
                    ? membership.replace(/^DP/, 'Day pass:')
                    : `Member #${member.get('member_number')} (${membership})`}
              </div>
            }
            open
            autoScrollBodyContent
            bodyClassName="memberDialog"
            onRequestClose={handleClose}
          >
            <ConfigProvider value={config}>
              <MemberForm
                isAdmin={true}
                member={member}
                onChange={this.handleChange}
                tabIndex={1}
              />
            </ConfigProvider>
          </Dialog>
        )}
      </ConfigConsumer>
    )
  }
}

export default connect(
  ({ registration }) => ({
    locked: registration.get('locked') || false,
    printer: registration.get('printer')
  }),
  dispatch => ({
    setMember: data => dispatch({ type: 'SET PERSON', data }),
    showMessage: message => dispatch({ type: 'SET MESSAGE', message })
  })
)(Member)
