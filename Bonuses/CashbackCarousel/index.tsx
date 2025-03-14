import { foundationUserApi, useAppSelector } from "@litres-core/store";
import { Carousel } from "@litres/ui-kit/carousel";
import { useMemo, type CSSProperties } from "react";
import isNumber from "lodash/isNumber";
import { Card } from "./Card";
import styles from "./CashbackCarousel.module.scss";
import type { ICashBackLevel } from "./constants";
import { CASHBACK_LEVELS } from "./constants";

export const CashbackCarousel = () => {
  const isPDA = useAppSelector(state => state.browser.pda);
  const { data: userBonuses, isLoading } =
    foundationUserApi.useGetBonusesQuery();

  let purchaseAmount = 0;
  const cashbackLevels = [
    { threshold: 15, level: 5 },
    { threshold: 11, level: 4 },
    { threshold: 9, level: 3 },
    { threshold: 6, level: 2 },
    { threshold: 3, level: 1 },
  ];

  const currentCashbackPercent = userBonuses?.current_cashback_percent ?? 0;

  // Поиск текущего уровня
  const currentLevel = cashbackLevels?.find(
    ({ threshold }) => currentCashbackPercent >= (threshold ?? 0)
  )?.level;

  if (
    userBonuses &&
    isNumber(userBonuses.current_loyalty_level_range?.next_level_threshold) &&
    isNumber(userBonuses.purchase_amount_for_next_level)
  ) {
    purchaseAmount = userBonuses
      ? userBonuses.current_loyalty_level_range.next_level_threshold -
        userBonuses.purchase_amount_for_next_level
      : 0;
  }

  const levels = useMemo(() => {
    if (currentLevel) {
      return getCashBackLevels(CASHBACK_LEVELS, currentLevel);
    }
    return CASHBACK_LEVELS;
  }, [currentLevel]);

  if (isLoading) {
    return <div className={styles.fakeBlock} />;
  }

  return (
    <div
      className={styles.carousel}
      style={
        {
          "--slide-spacing": "8px",
        } as CSSProperties
      }
    >
      <Carousel
        options={{ loop: false }}
        hasAutoplay={false}
        isEnableButtons={!isPDA}
        containerClassName={styles.carousel_container}
        styleViewPort={{ padding: "10px 0" }}
        dotClassName={styles.dot}
      >
        {levels.map(({ level, min, max, discount }) => {
          return (
            <Card
              level={level}
              currentLevel={currentLevel}
              minValue={min}
              maxValue={max}
              discountPercentage={discount}
              key={level}
              purchaseAmount={purchaseAmount}
              className={styles.card}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

function getCashBackLevels(
  levels: ICashBackLevel[],
  currentLevel: number
): ICashBackLevel[] {
  return levels.slice(currentLevel - 1);
}
