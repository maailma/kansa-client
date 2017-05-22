import React from 'react'
import Dialog from 'material-ui/Dialog'
import '../../img/unisex-size-chart-gildan.png'
import '../../img/ladyfit-size-chart-gildan.png'
import '../../img/youth-size-chart-gildan.png'

export const TShirtSizes = () => <div>
  <p>
  <h3>Unisez Sizes</h3>
  <img src="../../img/unisex-size-chart-gildan.png" />
  </p>
  <p>
  <h3>Ladyfit Sizes</h3>
  <img src="../../img/ladyfit-size-chart-gildan.png" />
  </p>
  <p>
  <h3>Youth Sizes</h3>
  <img src="../../img/youth-size-chart-gildan.png" />
  </p>
</div>;

export class TShirtDialog extends React.Component {

  state = { open: false };

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
        <TShirtSizes />
      </Dialog>
    </span>;
  }
}
