import styles from "./style.module.scss";
import { shape1, shape2, shape1_morphed, shape2_morphed } from "./paths";
import SVGMorphBackNForth from "../svgMorphBackNForth";

export default function index() {
  return (
    <div className={styles.svgContainer}>
      <svg
        className={styles.svg}
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 144 178"
      >
        <SVGMorphBackNForth paths={[shape1, shape1_morphed, shape1]} />
        <SVGMorphBackNForth paths={[shape2, shape2_morphed, shape2]} />
      </svg>
    </div>
  );
}
