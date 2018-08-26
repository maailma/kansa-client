import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

import * as PaymentPropTypes from '../../payments/proptypes'
import MemberTypeList from './MemberTypeList'

const contents = {
  all: {
    title: 'Buy new membership',
    body: (
      <div>
        <p>
          <b>Child</b> members are not eligible to participate in the Hugo
          Awards or Site Selection processes.
        </p>
        <p>
          A <b>Supporting</b> membership of CoNZealand grants you the right to
          participate in the functions of the World Science Fiction Society
          (Hugo Awards and Site Selection), but does not grant general admission
          to the convention.
        </p>
        <p>
          Participants of the New Zealand in 2020 Worldcon Site Selection have been
          automatically granted supporting membership.
        </p>
      </div>
    ),
    memberships: [
      'Adult',
      'Youth',
      'Unwaged',
      '_divider',
      'Child',
      'KidInTow',
      '_divider',
      'Supporter'
    ]
  },

  attend: {
    title: 'New attending membership',
    body: (
      <div>
        <p>
          Persons born on or after 2000 qualify for <b>Young Adult</b>{' '}
          attending memberships of CoNZealand (NZD $225).
        </p>
        <p>
          All attending memberships carry the same rights as supporting
          memberships, in addition to the right of general admission to the
          convention.
        </p>
      </div>
    ),
    memberships: ['Unwaged', 'Youth', 'Adult']
  },

  child: {
    title: 'New child/kid-in-tow membership',
    body: (
      <div>
        <p>
          <b>Child</b> and <b>Kid-in-tow</b> members are not eligible to
          participate in the Hugo Awards or Site Selection processes.
        </p>
      </div>
    ),
    memberships: ['Child', 'KidInTow']
  },

  daypass: {
    title: 'New day pass',
    body: (
      <div>
        <p>
          Day passes do not include guaranteed seating to the Hugo Ceremony
          (Friday) and the Masquerade (Saturday). While we expect to be able to
          seat everyone, those with full attending memberships will have
          precedence for this special event seating.
        </p>
      </div>
    ),
    memberships: ['Adult', 'Youth', 'Child']
  },

  support: {
    title: 'New supporting membership',
    body: (
      <div>
        <p>
          A non-attending membership of CoNZealand which will grant you the
          right to participate in the functions of the World Science Fiction
          Society (Hugo Awards and Site Selection).
        </p>
        <p>
          Participants of the 2020 Worldcon Site Selection have been
          automatically granted supporting membership. Supporting memberships
          may be upgraded to attending memberships.
        </p>
      </div>
    ),
    memberships: ['Supporter']
  },

  upgrade: {
    title: 'Upgrade membership',
    body: (
      <div>
        <p>
          <b>Supporting</b> and other memberships may be upgraded to attending
          memberships for the current difference in membership costs. To upgrade
          your own or someone else's membership, you'll need to be logged in to
          our services.
        </p>
      </div>
    ),
    memberships: ['Upgrade']
  }
}

const NewMemberCard = ({
  category,
  data,
  disabled = false,
  expandable = false,
  onSelectType
}) => {
  const { title, body, memberships } = contents[category]
  return (
    <Card style={{ marginBottom: 24 }}>
      <CardHeader
        actAsExpander={expandable}
        className="action-head"
        showExpandableButton={expandable}
        textStyle={{ paddingRight: 0 }}
        title={title}
        style={{ fontWeight: 600, marginBottom: 16 }}
      />
      <CardText expandable={expandable} style={{ paddingTop: 0 }}>
        {body}
      </CardText>
      <CardActions style={{ marginLeft: 8, paddingTop: 0 }}>
        <MemberTypeList
          category={category}
          data={data}
          disabled={disabled}
          memberTypes={memberships}
          onSelectType={onSelectType}
          style={{ paddingTop: 0 }}
        />
      </CardActions>
    </Card>
  )
}

NewMemberCard.propTypes = {
  category: PropTypes.oneOf(Object.keys(contents)).isRequired,
  data: PaymentPropTypes.data,
  onSelectType: PropTypes.func.isRequired
}

export default NewMemberCard
