import PropTypes from 'prop-types'
import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class NominationSignature extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    setName: PropTypes.func.isRequired
  }

  state = { name: '' }

  render() {
    const { open, setName } = this.props
    const { name } = this.state
    return (
      <Dialog
        actions={
          <FlatButton
            disabled={!name}
            label="OK"
            onClick={() => setName(name)}
          />
        }
        autoScrollBodyContent
        modal
        open={open}
      >
        <p>
          You have received this link because you are a member of Worldcon 76 in San Jos&eacute;, 
          Dublin 2019, an Irish Worldcon, and/or CoNZealand. This is your personal
          nominations ballot.
        </p>
        <p>
          Please choose up to five nominees in each category. We recommend that
          you nominate whatever works and creators you have personally read or
          seen that were your favorites from 2018.
        </p>
        <p>
          The deadline for nominations is YY 2019 at 11:59pm GMT.
          You can make as many changes as you
          like up until then. Your current ballot will be emailed to you an hour
          after you stop making changes.
        </p>
        <p>
          If you have difficulties accessing the online ballot, or you have more
          general questions on the Hugo process, you can e-mail{' '}
          <a href="mailto:hugohelp@dublin2019.com">hugohelp@dublin2019.com</a> for
          assistance. See{' '}
          <a href="http://www.dublin2019.com/wsfs/hugo/" target="_blank">
            here
          </a>{' '}
          for more information about the Hugo Awards.
        </p>
        <p>
          Thank you for participating! To start nominating, please enter your
          name here:
        </p>

        <form
          onSubmit={ev => {
            ev.preventDefault()
            setName(name)
          }}
        >
          <TextField
            floatingLabelText="Signature"
            onChange={event => this.setState({ name: event.target.value })}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '0 8px',
              boxSizing: 'content-box'
            }}
            underlineStyle={{ width: 256 }}
            value={name}
          />
        </form>
      </Dialog>
    )
  }
}
