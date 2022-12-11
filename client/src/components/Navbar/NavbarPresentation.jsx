import { PureComponent } from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import IndividualCategory from "./IndividualCategory";
import styles from "./Navbar.module.css";
import logo from "../../images/a-logo.png";
import cartLogo from "../../images/Vector.png";

class NavbarPresentation extends PureComponent {
  render() {
    const { showCartOverlay, showOverlay, categories, currencies, amount } =
      this.props;
    return (
      <nav
        className={styles.navbar}
        onClick={showCartOverlay ? showOverlay : null}
      >
        <ul className={styles.categories}>
          {categories.map((item) => {
            return <IndividualCategory category={item} key={item} />;
          })}
        </ul>
        <div className={styles.greenLogo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.cartLogoContainer}>
          <CustomDropdown currencies={currencies} />
          <div className={styles.someContainer}>
            <div className={styles.cartAmount}>{amount}</div>
            <img onClick={showOverlay} src={cartLogo} alt="cart" />
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarPresentation;
