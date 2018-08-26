import IBAN from 'iban'
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'react-flexbox-grid'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { TextInput } from '../../membership/components/form-components'
import SelectIbanCountry, { ibanCountries } from './select-iban-country'
import StripeDirectDebit from './stripe-direct-debit'

const orgName = TITLE

export default class StripeDirectDebitForm extends React.Component {
  static propTypes = {
    amount: PropTypes.number,
    onCharge: PropTypes.func.isRequired,
    person: ImmutablePropTypes.map
  }

  constructor(props) {
    super(props)
    const { person } = props
    this.state = {
      city: (person && person.get('city')) || '',
      country: (person && ibanCountries[person.get('country')]) || '',
      iban: '',
      name: (person && person.get('legal_name')) || '',
      postal_code: ''
    }
  }

  componentWillReceiveProps({ person }) {
    if (person && !person.equals(this.props.person)) {
      this.setState({
        city: person.get('city') || '',
        country: ibanCountries[person.get('country')] || '',
        name: person.get('legal_name') || ''
      })
    }
  }

  render() {
    const { amount, onCharge } = this.props
    const { city, country, iban, name, postal_code } = this.state
    const disabled =
      !city || !country || !IBAN.isValid(iban) || !name || !postal_code
    let label = 'Confirm payment'
    if (amount) label += ' of NZD $' + (amount / 100).toFixed(2)
    return (
      <form>
        <Row>
          <Col xs={12}>
            <TextInput
              getDefaultValue={() =>
                (IBAN.isValid(iban) && IBAN.printFormat(iban)) || ''
              }
              getValue={() => IBAN.printFormat(iban)}
              label="IBAN"
              onChange={(_, iban) => {
                iban = iban.replace(/ /g, '')
                const update = { iban }
                if (IBAN.isValid(iban))
                  update.country = iban.substr(0, 2).toUpperCase()
                this.setState(update)
              }}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} style={{ marginBottom: 20 }}>
            <TextInput
              getValue={() => name}
              label="Account owner name"
              onChange={(_, name) => this.setState({ name })}
              required
            />
            <SelectIbanCountry
              floatingLabelFixed
              floatingLabelText="Country (Required)"
              fullWidth
              onChange={(ev, idx, country) => this.setState({ country })}
              value={country}
            />
            <TextInput
              getValue={() => city}
              label="City"
              onChange={(_, city) => this.setState({ city })}
              required
            />
            <TextInput
              getValue={() => postal_code}
              label="Postal code"
              onChange={(_, postal_code) => this.setState({ postal_code })}
              required
            />
          </Col>
          <Col xs={12} md={6}>
            <p>
              By providing your IBAN and confirming this payment, you are
              authorizing {orgName} and Stripe, our payment service provider, to
              send instructions to your bank to debit your account and your bank
              to debit your account in accordance with those instructions. You
              are entitled to a refund from your bank under the terms and
              conditions of your agreement with your bank. A refund must be
              claimed within 8 weeks starting from the date on which your
              account was debited.
            </p>
            <StripeDirectDebit
              iban={iban}
              onCharge={onCharge}
              owner={{ name, address: { city, postal_code, country } }}
            >
              <RaisedButton label={label} disabled={disabled} primary />
            </StripeDirectDebit>
          </Col>
        </Row>
      </form>
    )
  }
}
