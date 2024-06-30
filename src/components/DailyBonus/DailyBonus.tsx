import { useAppDispatch, useAppSelector } from "../../store";
import { closeDailyBonus } from "../../store/reducers/dailyBonus";

import classNames from "classnames/bind";
import styles from "./DailyBonus.module.scss";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import Button from "../Button/Button";
import { useState } from "react";
const cn = classNames.bind(styles);

const DailyBonus = () => {
   const dispatch = useAppDispatch();
   const isDailyBonusOpen = useAppSelector((state) => state.dailyBonus.isOpen);
   const isGreetingOpen = useAppSelector((state) => state.greeting.isOpen);

   // Состояние прелоудреа
   const isLoading = useAppSelector((state) => state.preloader.isLodaing);

   const [moneyAnimActive, setMoneyAnimACtive] = useState(false);

   function recieveCoins() {
      setMoneyAnimACtive(true);

      setTimeout(() => {
         setMoneyAnimACtive(false);
         dispatch(closeDailyBonus());
      }, 500);
   }

   // True, если прелоадер, приветсвенные попапы уже отключены
   const canShow = !isLoading && isDailyBonusOpen && !isGreetingOpen;

   return (
      <div className={cn("dailyBonus", canShow && "_open")}>
         <div className={cn("dailyBonus__body")}>
            {/* Popup's Border */}
            <img
               src="img/dailyBonus/border.svg"
               className={cn("dailyBonus__border")}
            />

            {/* Надпись на popup-border */}
            <strong className={cn("dailyBonus__label")}>Daily bonus</strong>

            {/* Иконка закрытия попапа */}
            <img
               src="img/global/closeIcon.svg"
               className={cn("dailyBonus__close")}
               onClick={() => dispatch(closeDailyBonus())}
               alt="Закрыть"
            />

            <div className={cn("dailyBonus__content", "content")}>
               <p className={cn("content__title")}>
                  Collect coins for logging into <br /> the game every day
                  without missing <br /> a day
               </p>

               <div className={cn("content__grid")}>
                  <BonusBlock dayNumber={1} bonusAmount={10} recieved />
                  <BonusBlock dayNumber={2} bonusAmount={20} currentDay />
                  <BonusBlock dayNumber={3} bonusAmount={50} />
                  <BonusBlock dayNumber={4} bonusAmount={100} />
                  <BonusBlock dayNumber={5} bonusAmount={200} />
                  <BonusBlock dayNumber={6} bonusAmount={300} />
                  <BonusBlock dayNumber={7} bonusAmount={500} />
                  <BonusBlock dayNumber={8} bonusAmount={800} />
                  <BonusBlock dayNumber={9} bonusAmount={1000} />
                  <BonusBlock dayNumber={10} bonusAmount={2000} />
               </div>

               <Button
                  size="big"
                  className={cn("content__recieve-btn")}
                  onClick={recieveCoins}>
                  <CoinWhiteBg
                     className={cn("content__recieve-btn-coin")}
                     size="small"
                  />
                  <span className="textShadow">Collect 20</span>
               </Button>

               <img
                  className={cn(
                     "content__money-anim",
                     moneyAnimActive && "_acitve"
                  )}
                  src="img/pages/home/money.svg"
                  alt=""
               />
            </div>
         </div>
      </div>
   );
};

export default DailyBonus;

interface IBonusBlock {
   dayNumber: number;
   bonusAmount: number;
   recieved?: boolean;
   currentDay?: boolean;
}

const BonusBlock = ({
   dayNumber,
   bonusAmount,
   recieved,
   currentDay,
}: IBonusBlock) => {
   return (
      <div
         className={cn("bonusBlock", (recieved || currentDay) && "_available")}>
         <img
            src="img/dailyBonus/day-border.svg"
            className={cn("bonusBlock__border")}
         />

         <div className={cn("bonusBlock__content")}>
            <div className={cn("bonusBlock__dayNumber")}>
               <span className="textShadow"> Day {dayNumber}</span>
               {recieved && <img src="img/global/checkbox/green.svg" />}
            </div>
            <CoinWhiteBg className={cn("bonusBlock__dayCoin")} />
            <span className={cn("bonusBlock__bonusAmount") + " textShadow"}>
               {bonusAmount}
            </span>
         </div>
      </div>
   );
};