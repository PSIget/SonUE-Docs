import React, { Component } from "react";
import { createPortal } from "react-dom";

export default class Shadow extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.shadowRoot = null;
    this.shadowAttached = false;
  }

  componentDidMount() {
    if (this.shadowAttached) return;
    this.shadowAttached = true;
    this.shadowRoot = this.node.current.attachShadow({ mode: this.props.mode });
    this.forceUpdate();
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <div {...rest} ref={this.node}>
        {this.shadowRoot && createPortal(children, this.shadowRoot)}
      </div>
    );
  }
}
