import React from "react";
import { SmartLink } from "@litres-modules/smart-link";
import cn from "classnames";
import styles from "./HowItWorks.module.scss";

interface HowItWorksI {
  className?: string;
}
const steps = [
  "Используйте единый номер телефона в своих аккаунтах Литрес, Читай-городе и Буквоеде, чтобы пользоваться всеми преимуществами единой программы лояльности «Книголов».",
  ", Читай-городе и Буквоеде и получайте до 15% бонусами на счёт. Процент начисления определяется уровнем в программе.",
  "Оплачивайте бонусами до 99% от суммы чека. 1 бонус = 1₽.",
];
const HowItWorks = ({ className = "" }: HowItWorksI) => {
  return (
    <div
      className={cn(styles.howItWorks, {
        [className]: className,
      })}
    >
      <h3 className={styles.howItWorks__title}>Как это работает?</h3>
      <ol className={styles.howItWorks__steps}>
        {steps.map((step, index) => (
          <li key={step} className={styles.howItWorks__step}>
            <span className={styles.howItWorks__number}>{index + 1}</span>
            {index === 1 && (
              <>
                <SmartLink href="/">Покупайте книги в Литрес</SmartLink>{" "}
              </>
            )}
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HowItWorks;
