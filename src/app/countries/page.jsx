"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import CountryCard from "../../components/CountryCard";
import CountryModal from "../../components/CountryModal";
import Loading from "../../components/Loading";
import styles from "./Countries.module.css";
import { Button, Pagination, Skeleton } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const regions = ["africa", "americas", "antarctic", "asia", "europe", "oceania"];

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchCountries = async (region = "") => {
    setIsLoading(true);
    try {
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";
      const response = await axios.get(url);
      setCountries(response.data);
      if (!region) {
        setAllCountries(response.data);
        toast.success("Todos os países carregados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao carregar países:", error);
      toast.error("Erro ao carregar países. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchCountries();
  }, []);

  const resetFilter = () => fetchCountries();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCountries = countries.slice(startIndex, endIndex);


  const handleCardClick = (country) => {
    toast.info(`Você clicou no país: ${country.name.common}`, {
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <Skeleton.Input active size="large" style={{ width: 300, height: 40, margin: "20px 0" }} />
          <Skeleton active paragraph={{ rows: 10 }} />
        </>
      ) : (
        <>
          <ToastContainer
            position="bottom-right"
            autoClose={7500}
            theme="dark"
          />
          <h1>Lista de Países do Mundo</h1>
          <div>
            {regions.map((region) => (
              <Button key={region}
                className={styles.button}
                onClick={() => {
                  setCurrentPage(1);
                  fetchCountries(region);
                }}>
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </Button>

            ))}
            <Button className={styles.buttonReset} onClick={resetFilter}>
              Mostrar Todos
            </Button>
          </div>

          <div className={styles.cardContainer}>
            {isLoading ? (
              <Loading />
            ) : (
              paginatedCountries.map((country, index) => (
                <CountryCard
                  key={index}
                  country={country}
                  isLoading={isLoading}
                  onClick={() => setSelectedCountry(country)}
                  onCardClick={handleCardClick}
                />
              ))
            )}

          </div>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={countries.length}
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
            showSizeChanger
            className={styles.pagination}
          />

          {selectedCountry && (
            <CountryModal
              country={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          )}
        </>
      )}
    </div>

  );

}
