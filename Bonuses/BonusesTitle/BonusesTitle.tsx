import React from "react";
import { SmartLink } from "@litres-modules/smart-link";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import cn from "classnames";
import styles from "./BonusesTitle.module.scss";
interface BonusesTitleI {
  isBigMargin?: boolean;
}
const BonusesTitle = ({ isBigMargin = false }: BonusesTitleI) => {
  return (
    <div
      className={cn(styles.bonusesTitle, {
        [styles.bonusesTitle_marginBig]: isBigMargin,
      })}
    >
      <SmartLink className={styles.bonusesTitle__backLink} href="/me/profile/">
        <SpriteIcon name="arrowBack" size={24} />
      </SmartLink>
      <h2>Бонусный счёт</h2>
    </div>
  );
};

export default BonusesTitle;
