import styles from "@/styles/index.module.scss";
import { getGradeSimple } from "@/utils/Util";
import RandomGraph from "@/components/graph/RandomGraph";
import { Loading } from "@nextui-org/react";
import LineGraph from "@/components/graph/LineGraph";
import { useRecoilState, useRecoilValue } from "recoil";
import { gradeData, infoData, nowGradeData } from "@/utils/States";

import { GraphType } from "@/utils/types";

export const GradeChart = () => {
    const grade = useRecoilValue(gradeData);
    const nowGrade = useRecoilValue(nowGradeData);

    const sortBySemester = (data) => {
        data.sort((a, b) => {
            return a.semester - b.semester;
        });

        return data;
    }

    return (
        <div className={styles.chart}>
            <div className={styles.chartTitle}>
                <div className={styles.chartTitleInfo}>학점</div>
                {
                    (grade !== "" && grade !== "loading") && (
                        <div className={styles.chartTitleContent}>{getGradeSimple(grade)}</div>)
                }
            </div>
            <div className={styles.chartBorder}>
                {
                    (grade === "" && nowGrade === "") ?
                        <RandomGraph /> : (grade === "loading" || nowGrade === "loading") ?
                            <Loading size="xl" /> :
                            <LineGraph
                                data={sortBySemester(nowGrade !== "" ? [nowGrade, ...grade] : [...grade])}
                                type={GraphType.BOTH}
                            />
                }
            </div>
        </div>
    );
}
