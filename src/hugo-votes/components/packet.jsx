import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

import { midGray } from '../../theme'
import { packet as packetPropType } from '../proptypes'

const Packet = ({ formats }) => {
  if (!formats || formats.length === 0) return null
  const first = formats.shift()
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flexGrow: 1
    }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ color: midGray, marginRight: 12 }}>Download packet</div>
        <FlatButton
          download href={first.get('url')}
          label={first.get('label')}
          style={{ lineHeight: '33px' }}
        />
      </div>
      {formats.map((fmt, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FlatButton
            download href={fmt.get('url')}
            label={fmt.get('label')}
            style={{ lineHeight: '33px' }}
          />
        </div>
      ))}
    </div>
  )
}

Packet.propTypes = {
  formats: PropTypes.arrayOf(packetPropType)
}

export default Packet
