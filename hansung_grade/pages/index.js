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
        <div className="container">
            <Title title="한움" />

            {/*<div className="title-container">*/}
            {/*    <div>한성대학교 학생들을 위한 성적 시각화 사이트</div>*/}
            {/*    <div>한움</div>*/}
            {/*</div>*/}

            <div className="content-container">
                {/*<LeftMemu contentType={contentType} setContentType={setContentType} />*/}

                <div className="chart">
                    <div className="chart-title">
                        <div className="chart-title-info">학점</div>
                        {
                            (grade !== "" && grade !== "loading") && (<div className="chart-title-content">{getGradeSimple(grade)}</div>)
                        }
                    </div>
                    <div className="chart-border">
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

            <style jsx>{`
                .container {
                }
                .title-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .content-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .chart {
                    display: flex;
                    flex-direction: column;
                    justify-items: center;
                    margin-top: 5vh;
                }
                .chart-title {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 2vh;
                    margin-left: 2vw;
                }
                .chart-title-info {
                    font-size: 2.5rem;
                    font-weight: bold;
                }
                .chart-title-content {
                    margin-left: 1vw;
                    font-size: 2.5rem;
                    //font-weight: bold;
                }
                .chart-border {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80vw;
                    height: 65vmin;
                    background: white;
                    padding: 1vw;
                    border-radius: 3vmin;
                    box-shadow: 0 10px 50px -3px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}
