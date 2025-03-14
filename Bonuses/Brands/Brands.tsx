import React from "react";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import { Icon } from "@litres/ui-kit/icon";
import styles from "./Brands.module.scss";

const Brands = () => {
  return (
    <div className={styles.brands}>
      <Icon name="litres" path="loyalty" />
      <SpriteIcon name="spark" size={16} className={styles.brands__spark} />
      <Icon name="chitaiGorod" path="loyalty" />
      <SpriteIcon name="spark" size={16} className={styles.brands__spark} />
      <Icon name="bukvoed" path="loyalty" />
    </div>
  );
};

export default Brands;
