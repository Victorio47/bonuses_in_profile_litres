import React, { useEffect, useState } from "react";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import { getDeclination } from "@litres/utils";
import { Button } from "@litres/ui-kit/button";
import { AddNewPhonePopup } from "@litres/auth/user";
import { loyaltyApi } from "@litres-core/store";
import { useUserInfo } from "@features/UserProfile/hooks";
import Brands from "@features/UserProfile/Bonuses/Brands";
import BonusesTitle from "@features/UserProfile/Bonuses/BonusesTitle";
import {
  BonusStatusError,
  BonusStatusLoading,
  BonusStatusPending,
} from "@features/UserProfile/Bonuses/BonusStatus";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";

import styles from "./Bonuses.module.scss";
import { CashbackCarousel } from "./CashbackCarousel";

const Bonuses = () => {
  const [isOpenPhoneForm, setIsOpenPhoneForm] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [
    registerLoyalty,
    {
      isLoading: isLoadingRegisterLoyalty,
      isSuccess: isSuccessRegisterLoyalty,
      isError: isErrorRegisterLoyalty,
    },
  ] = loyaltyApi.endpoints.registerLoyalty.useMutation();
  const {
    availableBonuses: bonuses,
    burnBonuses,
    bonusesExpirationDaysLeft,
    isLoading,
    isNewBonuses,
    isUserPhoneVerified,
    fetchBonuses,
    bonusesError,
    isLoyaltyUser,
  } = useUserInfo();

  const isError = !!bonusesError;

  useEffect(() => {
    if ((isNewBonuses && isUserPhoneVerified && isPending) || isLoyaltyUser) {
      fetchBonuses().then(() => {
        setIsPending(false);
      });
    }
  }, []);

  if (!isNewBonuses) {
    return null;
  }

  const getBonuses = () => {
    setIsPending(true);
    fetchBonuses().then(() => {
      setIsPending(false);
      closePhoneForm();
    });
  };

  const onClickReceiveBonuses = () => {
    if (!isLoyaltyUser && isUserPhoneVerified) {
      if (!isLoadingRegisterLoyalty) {
        registerLoyalty().then(() => {
          if (isSuccessRegisterLoyalty) {
            getBonuses();
          }
        });
      }
    } else if (isError) {
      getBonuses();
    } else if (!isLoading) {
      setIsOpenPhoneForm(true);
    }
  };

  const closePhoneForm = () => {
    setIsOpenPhoneForm(false);
  };

  const isShowingTitle =
    bonuses !== undefined &&
    isUserPhoneVerified &&
    !isLoading &&
    !isError &&
    !isPending;
  const isShowingExpiration =
    burnBonuses !== undefined &&
    isUserPhoneVerified &&
    !isLoading &&
    !isPending &&
    !isError &&
    bonusesExpirationDaysLeft > 0;

  const isShowingDescription =
    !isUserPhoneVerified || isError || !isLoyaltyUser;

  const isShowGetBonuses =
    (!isUserPhoneVerified && !isLoading && !isPending) ||
    isError ||
    !isLoyaltyUser;

  const isShowingLetsGoToShop =
    isLoyaltyUser && isUserPhoneVerified && !isError;

  const getTextForBonuses = (bonuses: number) =>
    getDeclination(bonuses, ["бонус", "бонуса", "бонусов"]);

  return (
    <div className={styles.bonuses}>
      <div className={styles.bonuses__inner}>
        <div className={styles.bonuses__content}>
          <BonusesTitle isBigMargin={Boolean(isShowingTitle)} />
          {isShowingTitle && (
            <div className={styles.bonuses__amount}>
              <SpriteIcon name="bonusSpark" size={40} />
              <p>
                {bonuses} {getTextForBonuses(bonuses)}
              </p>
            </div>
          )}
          {isShowingExpiration && (
            <p className={styles.bonuses__expiration}>
              <SpriteIcon name="fire" width={12} height={12} />
              {burnBonuses} {getTextForBonuses(burnBonuses)}{" "}
              {getDeclination(burnBonuses, ["сгорит", "сгорят", "сгорят"])}{" "}
              через {bonusesExpirationDaysLeft}{" "}
              {getDeclination(bonusesExpirationDaysLeft, [
                "день",
                "дня",
                "дней",
              ])}
            </p>
          )}

          {isShowingDescription && (
            <p className={styles.bonuses__description}>
              Копите и тратьте бонусы в Литрес, Читай-городе и Буквоеде
            </p>
          )}
          <Brands />
          {isLoading && !isPending && (
            <BonusStatusLoading className={styles.bonuses__status} />
          )}
          {isPending && (
            <BonusStatusPending className={styles.bonuses__status} />
          )}
          {(isError || isErrorRegisterLoyalty) && !isPending && !isLoading && (
            <BonusStatusError className={styles.bonuses__status} />
          )}
          {isShowGetBonuses && (
            <>
              <Button
                className={styles.bonuses__getBonuses}
                size="medium"
                fullWidth
                text="Получать бонусы"
                mode="primary"
                onClick={onClickReceiveBonuses}
              />
              {isOpenPhoneForm && (
                <AddNewPhonePopup
                  onClose={closePhoneForm}
                  onSuccess={getBonuses}
                  subTitle="Чтобы использовать бонусы, добавьте номер телефона"
                />
              )}
            </>
          )}
        </div>
        <CashbackCarousel />
        <div className={styles.bonuses__background} />
      </div>

      {isShowingLetsGoToShop && (
        <Button
          className={styles.bonuses__goToShoping}
          size="medium"
          fullWidth
          text="Перейти к покупкам"
          mode="primary"
          href="/recommend/"
        />
      )}
      <HowItWorks className={styles.bonuses__howItWorks} />
      <FAQ />
    </div>
  );
};

export default Bonuses;
