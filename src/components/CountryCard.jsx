import React from "react";
import styles from "../styles/CountryCard.module.css";
import Image from "next/image";
import { Card, Skeleton } from "antd";

export default function CountryCard({ country, onClick, onCardClick, isLoading }) {
  return (

    <Card className={styles.card} onClick={() => {
      if (onCardClick) onCardClick(country);
      if (onClick) onClick();
    }}>

      {isLoading ? (
        <Skeleton.Image active className={styles.skeleton} />
      ) : (
        <Image src={country.flags.png}
        alt={`Bandeira de ${country.translations.por.common}`}
        className={styles.flag}
        width={200}
        height={120} />
      )}

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 1 }} titlr={false} />
      ) : (
        <h3 className={styles.name}>{country.translations.por.common}</h3>
      )}
    </Card>
  );
}
