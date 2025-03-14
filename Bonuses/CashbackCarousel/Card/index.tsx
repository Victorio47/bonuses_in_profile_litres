import { SpriteIcon } from "@litres-libs/sprite-icons";
import cn from "classnames";
import type { CSSProperties } from "react";
import styles from "./Card.module.scss";

interface ICardProps {
  level: number;
  currentLevel?: number;
  discountPercentage: number;
  purchaseAmount: number;
  minValue: number;
  maxValue?: number;
  className?: string;
}

export const Card = ({
  level = 1,
  currentLevel,
  discountPercentage = 3,
  purchaseAmount,
  minValue = 0,
  maxValue,
  className,
}: ICardProps) => {
  const isFiveLevel = level === 5 && currentLevel === 5;
  const isCurrentLevel = maxValue
    ? maxValue >= purchaseAmount && minValue < purchaseAmount
    : minValue < purchaseAmount;

  const amount = getAmount(minValue, maxValue, purchaseAmount, isCurrentLevel);

  const progressPercentage = getProgressPercentage(
    minValue,
    maxValue,
    purchaseAmount,
    isCurrentLevel,
    isFiveLevel
  );

  const caption = getCaption(
    amount,
    purchaseAmount,
    isCurrentLevel,
    isFiveLevel
  );

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.levelContainer}>
        <div className={styles.level}>Уровень {level}</div>
        {(!isCurrentLevel || !purchaseAmount) && (
          <SpriteIcon
            className={cn(styles.levelContainer_icon, {
              [styles.icon__none]: isFiveLevel,
            })}
            name="lockFilled"
            size={16}
          />
        )}
      </div>
      <div className={styles.caption}>
        <div className={styles.caption_title}>
          {discountPercentage}% начисления за покупки
        </div>
        <div
          className={cn(styles.caption_description, {
            [styles.innactive]: !isCurrentLevel,
          })}
        >
          {caption}
        </div>
      </div>
      <div className={styles.progressContainer}>
        <div
          className={styles.progress}
          style={
            {
              "--progress": `${progressPercentage}%`,
            } as CSSProperties
          }
        />
        <div className={styles.rangeContainer}>
          <div className={styles.price}>{minValue} ₽</div>
          {maxValue && <div className={styles.price}>{maxValue} ₽</div>}
        </div>
      </div>
    </div>
  );
};

function getProgressPercentage(
  min: number,
  max: number | undefined,
  amount: number,
  isCurrentLevel: boolean,
  isFiveLevel: boolean
) {
  if (max && isCurrentLevel) {
    return Math.round((amount / max) * 100);
  }

  if (
    (isCurrentLevel && amount >= min && typeof max === "undefined") ||
    isFiveLevel
  ) {
    return 100;
  }
}

function getAmount(
  min: number,
  max: number | undefined,
  amount: number,
  isCurrentLevel: boolean
) {
  if (isCurrentLevel && max) {
    return (max - amount).toFixed(2);
  } else {
    return (min - amount).toFixed(2);
  }
}

function getCaption(
  nextLevelAmount: string,
  purchaseAmount: number,
  isCurrentLevel: boolean,
  isFiveLevel: boolean
) {
  if (isFiveLevel) {
    return "Самые выгодные условия начисления бонусов";
  }

  if (!purchaseAmount) {
    return "Процент начисления зависит от суммы ваших покупок";
  }

  if (!isCurrentLevel && purchaseAmount) {
    return `Для достижения этого уровня осталось потратить ${nextLevelAmount}₽`;
  }

  if (isCurrentLevel && !!purchaseAmount && nextLevelAmount) {
    return `До следующего уровня осталось потратить ${nextLevelAmount}₽`;
  }
}
