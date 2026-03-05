import React, { useEffect, useState } from "react";
import {Card, Loading, Text, Switch} from "@nextui-org/react";
import Title from "@/components/Title";

import { useRecoilState } from "recoil";
import { gradeData, infoData, nowGradeData } from "@/utils/States";
import {getGrade, getInfo, getNowGrade} from "@/utils/Api";
import LineGraph from "@/components/graph/LineGraph";
import RandomGraph from "@/components/graph/RandomGraph";
import LeftMemu from "@/components/LeftMemu";
import { getGradeSimple } from "@/utils/Util";

import styles from "@/styles/index.module.scss";

export default function Home() {
    const [grade, setGrade] = useRecoilState(gradeData);
    const [nowGrade, setNowGrade] = useRecoilState(nowGradeData);
    const [info, setInfo] = useRecoilState(infoData);
    const [contentType, setContentType] = useState(false);

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

    const sortBySemester = (data) => {
        data.sort((a, b) => {
            return a.semester - b.semester;
        });

        return data;
    }

    return (
        <div>
            <Title title="한움" />

            {/*<div className="title-container">*/}
            {/*    <div>한성대학교 학생들을 위한 성적 시각화 사이트</div>*/}
            {/*    <div>한움</div>*/}
            {/*</div>*/}

            <div className={styles.contentContainer}>
                {/*<LeftMemu contentType={contentType} setContentType={setContentType} />*/}

                <div className={styles.chart}>
                    <div className={styles.chartTitle}>
                        <div className={styles.chartTitleInfo}>학점</div>
                        {
                            (grade !== "" && grade !== "loading") && (<div className={styles.chartTitleContent}>{getGradeSimple(grade)}</div>)
                        }
                    </div>
                    <div className={styles.chartBorder}>
                        {
                            (grade === "" && nowGrade === "") ?
                                <RandomGraph /> : (grade === "loading" || nowGrade === "loading") ?
                                    <Loading size="xl" /> :
                                    <LineGraph
                                        data={sortBySemester(nowGrade !== "" ? [nowGrade, ...grade] : [...grade])}
                                        type={"BothGPA"}
                                    />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
