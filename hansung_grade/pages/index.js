import React, { useEffect, useState } from "react";
import Title from "@/components/Title";

import { useRecoilState } from "recoil";
import { gradeData, infoData, nowGradeData } from "@/utils/States";
import {getGrade, getInfo, getNowGrade} from "@/utils/Api";

import styles from "@/styles/index.module.scss";
import { GradeStatus } from "@/components/GradeStatus";
import { GradeChart } from "@/components/GradeChart";

export default function Home() {
    const [grade, setGrade] = useRecoilState(gradeData);
    const [info, setInfo] = useRecoilState(infoData);

    useEffect(() => {
        if (!info) {
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            if (username !== null && password !== null) {
                getInfo(username, password)
                    .then((data) => {
                        setInfo(data);
                    });
            }
        }
    }, [grade]);

    useEffect(() => {
        if (!grade) {
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            if (username !== null && password !== null) {
                getGrade(username, password)
                    .then((data) => {
                        setGrade(data);
                    });
            }
        }
    }, [grade]);

    // useEffect(() => {
    //     if (!nowGrade) {
    //         const username = localStorage.getItem("username");
    //         const password = localStorage.getItem("password");
    //
    //         if (username !== null && password !== null) {
    //             getNowGrade(username, password)
    //                 .then((data) => {
    //                     setNowGrade(data);
    //                 });
    //         }
    //     }
    // }, [nowGrade]);

    return (
        <div>
            <Title title="한움" />

            <div className={styles.contentContainer}>
                {/*<LeftMemu contentType={contentType} setContentType={setContentType} />*/}

                <GradeChart />
                {/*<GradeStatus />*/}
            </div>
        </div>
    );
}
