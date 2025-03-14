import React from "react";
import { SmartLink } from "@litres-modules/smart-link";
import { CircleLoaderV2 } from "@litres/ui-kit/circle-loader2";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import cn from "classnames";
import styles from "./BonusStatus.module.scss";

export interface BonusStatusI {
  className?: string;
}

export const BonusStatusPending = ({ className = "" }: BonusStatusI) => {
  return (
    <div
      className={cn(styles.bonusStatus__content, {
        [className]: className,
      })}
    >
      <div className={styles.bonusStatus__statusSign}>
        <CircleLoaderV2 />
      </div>
      <p className={styles.bonusStatus__text}>Подключаем бонусный счёт</p>
      <small className={styles.bonusStatus__subtext}>
        Пожалуйста, вернитесь на эту страницу через некоторое время
      </small>
    </div>
  );
};

export const BonusStatusLoading = ({ className = "" }: BonusStatusI) => {
  return (
    <div
      className={cn(styles.bonusStatus__content, {
        [className]: className,
      })}
    >
      <div className={styles.bonusStatus__statusSign}>
        <CircleLoaderV2 />
      </div>
      <p className={styles.bonusStatus__text}>Загружаем бонусный счёт</p>
      <small className={styles.bonusStatus__subtext}>
        Пожалуйста, подождите
      </small>
    </div>
  );
};

export const BonusStatusError = ({ className = "" }: BonusStatusI) => {
  const href =
    "https://litres.helpdeskeddy.com/ru/knowledge_base/art/697/cat/71/kak-obratitsja-v-sluzbu-tehpodderzki";
  return (
    <div
      className={cn(styles.bonusStatus__content, {
        [className]: className,
      })}
    >
      <div
        className={cn(
          styles.bonusStatus__statusSign,
          styles.bonusStatus__error
        )}
      >
        <SpriteIcon name="alertFilled" size={16} />
      </div>
      <p className={styles.bonusStatus__text}>Что-то пошло не так</p>
      <small className={styles.bonusStatus__subtext}>
        Не удалось подключить бонусную программу. Обратитесь в <br />
        <SmartLink href={href}>службу поддержки</SmartLink> или попробуйте ещё
        раз.
      </small>
    </div>
  );
};
