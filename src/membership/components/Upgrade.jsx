import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Subheader from 'material-ui/Subheader'
import { Col, Row } from 'react-flexbox-grid'

import { setScene, showMessage } from '../../app/actions/app'
import getMemberPrice from '../../lib/get-member-price'
import { buyUpgrade, getPurchaseData } from '../../payments/actions'
import StripeCheckout from '../../payments/components/stripe-checkout'
import * as PaymentPropTypes from '../../payments/proptypes'
import * as MemberPropTypes from '../proptypes'
import MemberLookupSelector from './MemberLookupSelector'
import MemberTypeList from './MemberTypeList'
import PaperPubs, { paperPubsIsValid } from './paper-pubs'

const UPGRADE_TARGET_TYPES = ['Adult', 'YoungAdult', 'Unwaged', 'Child']

class Upgrade extends Component {
  static propTypes = {
    buyUpgrade: PropTypes.func.isRequired,
    data: PaymentPropTypes.data,
    email: PropTypes.string,
    getPurchaseData: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired,
    people: MemberPropTypes.people,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    setScene: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired
  }

  static getNextState(props) {
    const nextState = {}
    const id = Number(props.params.id)
    const person =
      id && props.people && props.people.find(p => p.get('id') === id)
    if (person) {
      const pm = (nextState.prevMembership = person.get('membership'))
      nextState.membership = UPGRADE_TARGET_TYPES.indexOf(pm) !== -1 ? pm : null
      const cap = (nextState.canAddPaperPubs = !person.get('paper_pubs'))
      if (!cap) nextState.paperPubs = null
    } else {
      nextState.canAddPaperPubs = false
      nextState.membership = null
      nextState.paperPubs = null
    }
    return nextState
  }

  constructor(props) {
    super(props)
    this.state = Object.assign(
      {
        canAddPaperPubs: false,
        membership: null,
        paperPubs: null,
        prevMembership: null,
        sent: false
      },
      Upgrade.getNextState(props)
    )
  }

  componentDidMount() {
    const { data, getPurchaseData, setScene } = this.props
    if (!data) getPurchaseData()
    setScene({ title: 'Upgrade Membership', dockSidebar: false })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.setState(Upgrade.getNextState(nextProps))
    }
  }

  get amount() {
    const { data } = this.props
    const { membership, paperPubs, prevMembership } = this.state
    return getMemberPrice(data, prevMembership, membership, paperPubs)
  }

  get description() {
    const { data } = this.props
    const { membership, paperPubs, prevMembership } = this.state
    const parts = []
    if (membership !== prevMembership) parts.push(`Upgrade to ${membership}`)
    if (paperPubs) parts.push(data.getIn(['paper_pubs', 'label']))
    return parts.join(' + ') || 'Member upgrade'
  }

  get disabledCheckout() {
    const { paperPubs, prevMembership, sent } = this.state
    return (
      sent ||
      !prevMembership ||
      this.amount <= 0 ||
      !paperPubsIsValid(paperPubs)
    )
  }

  get id() {
    return Number(this.props.params.id) || 0
  }

  get person() {
    const { people } = this.props
    const id = this.id
    return (id && people && people.find(p => p.get('id') === id)) || null
  }

  onSelectMember = ({ membership, person_id }) => {
    if (person_id !== this.id) {
      this.setState({ prevMembership: membership })
      this.props.replace(person_id ? `/upgrade/${person_id}` : '/upgrade')
    }
  }

  onPaperPubsChange = ([pp, key], value) => {
    if (key) {
      this.setState({ paperPubs: this.state.paperPubs.set(key, value) })
    } else {
      this.setState({ paperPubs: value })
    }
  }

  onPurchase = (amount, token) => {
    const { buyUpgrade, email, push, showMessage } = this.props
    const { membership, paperPubs } = this.state
    showMessage(`Charging ${email} NZD ${amount / 100} for upgrade...`)
    buyUpgrade(this.id, membership, paperPubs, amount, email, token, () => {
      showMessage('Payment successful!')
      push('/')
    })
  }

  renderActions() {
    const { prevMembership, sent } = this.state
    const amount = this.amount
    const disabled = this.disabledCheckout
    return (
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 16,
          paddingBottom: 16
        }}
      >
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.5)',
            paddingTop: 8,
            paddingRight: 16
          }}
        >
          {prevMembership && amount > 0 ? `Total: NZD $${amount / 100}` : ''}
        </div>
        <StripeCheckout
          amount={amount}
          currency="NZD"
          description={this.description}
          disabled={disabled}
          email={this.props.email}
          onCheckout={token => this.onPurchase(amount, token)}
          onClose={() => this.setState({ sent: false })}
        >
          <FlatButton
            label={sent ? 'Working...' : 'Pay by card'}
            disabled={disabled}
            onClick={() => this.setState({ sent: true })}
            style={{ flexShrink: 0 }}
            tabIndex={2}
          />
        </StripeCheckout>
      </CardActions>
    )
  }

  render() {
    const { data, people } = this.props
    if (!people) return null
    const {
      canAddPaperPubs,
      membership,
      paperPubs,
      prevMembership
    } = this.state
    return (
      <Row>
        <Col
          xs={12}
          sm={10}
          smOffset={1}
          lg={8}
          lgOffset={2}
          style={{ paddingTop: 20 }}
        >
          <Card>
            <CardText>
              <Row>
                <Col xs={12} sm={6}>
                  <Subheader>Membership to upgrade:</Subheader>
                  <MemberLookupSelector
                    onChange={this.onSelectMember}
                    people={people}
                    selectedPersonId={this.id}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Subheader>Upgrade to:</Subheader>
                  <MemberTypeList
                    canAddPaperPubs={canAddPaperPubs}
                    data={data}
                    memberTypes={UPGRADE_TARGET_TYPES}
                    onSelectType={membership => this.setState({ membership })}
                    prevType={prevMembership}
                    selectedType={membership}
                  />
                </Col>
              </Row>
              {canAddPaperPubs ? (
                <PaperPubs
                  data={data}
                  getValue={([pp, key]) =>
                    key ? paperPubs.get(key) : paperPubs
                  }
                  onChange={this.onPaperPubsChange}
                  tabIndex={1}
                />
              ) : null}
            </CardText>
            {this.renderActions()}
          </Card>
        </Col>
      </Row>
    )
  }
}

export default connect(
  ({ purchase, user }) => ({
    data: purchase.get('data'),
    email: user.get('email'),
    people: user.get('people')
  }),
  {
    buyUpgrade,
    getPurchaseData,
    push,
    replace,
    setScene,
    showMessage
  }
)(Upgrade)
