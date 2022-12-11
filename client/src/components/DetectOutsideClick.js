import React, { PureComponent } from "react";

/**
 * Component that closes the dropdown if you click outside outside of it
 */
export default class DetectOutsideClick extends PureComponent {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { openDropdown } = this.props;
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      openDropdown();
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
