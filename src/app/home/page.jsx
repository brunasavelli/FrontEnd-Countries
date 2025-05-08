"use client"

import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Button, Skeleton } from "antd";
import { useState, useEffect } from "react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

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
                    <Skeleton.Avatar active size={300} shape="circle" className={styles.image} />
                    <Skeleton.Input active size="large" style={{ width: 300, height: 40, margin: "20px 0" }} />
                    <Skeleton active paragraph={{ rows: 6 }} />
                </>
            ) : (
                <>
                    <Image 
                    src={"/images/maiko.png"} 
                    className={styles.image} 
                    alt="Maiko Xikixiki" 
                    width={200} 
                    height={200}
                    priority/>
                    <h1 className={styles.title}> Maiko Xikixiki Bahia</h1>
                    <div className={styles.description}>
                        <p>Tá perdido no código? Relaxa e vem de Maiko, que vamos te mostrar a usar:</p>
                        <ul className={styles.list}>
                            <li>Next.js (App Router)</li>
                            <li>CSS Modules</li>
                            <li>React Components</li>
                            <li>React Hooks</li>
                            <li>PreLoad</li>
                            <li>PreFetch</li>
                            <li>Fetch Axios</li>
                            <li>LocalStorage</li>
                            <li>React Toastify</li>
                            <li>AntD</li>
                            <li>Skeleton</li>
                        </ul>
                    </div>
                    <Link href="/countries" prefetch={false} replace={true} scroll={false}>
                        <Button type="primary" className={styles.button}>Acessar Países</Button>
                    </Link>
                </>
            )}

        </div>
    );
}
