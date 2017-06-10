import React from 'react'
import Dialog from 'material-ui/Dialog'

import unisexImg from '../img/unisex-size-chart-gildan.png'
import ladyfitImg from '../img/ladyfit-size-chart-gildan.png'
import youthImg from '../img/youth-size-chart-gildan.png'

export class TShirtDialog extends React.Component {

  state = { open: false }

  render() {
    return <span>
      {React.Children.map(
        this.props.children,
        (child) => React.cloneElement(child, {
          onTouchTap: () => this.setState({ open: true })
        })
      )}
      <Dialog
        autoScrollBodyContent={true}
        modal={false}
        onRequestClose={() => this.setState({ open: false })}
        open={this.state.open}
        title="T-Shirt Size Details"
      >
        <h3>Unisex Sizes</h3>
        <img src={unisexImg} />
        <h3>Ladyfit Sizes</h3>
        <img src={ladyfitImg} />
        <h3>Youth Sizes</h3>
        <img src={youthImg} />
      </Dialog>
    </span>
  }
}
