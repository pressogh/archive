import {Card, Text} from "@nextui-org/react";
import {gradeWeight} from "@/utils/Util";

import styles from "@/styles/Tooltip.module.scss";

export const Tooltip = ({ data }) => {
    let lst = data.point.data.subject.slice();
    lst.sort((a, b) => {
        if (gradeWeight[a.grade] < gradeWeight[b.grade]) return 1;
        else return -1;
    })

    return (
        <Card css={{ pl: "10px", pr: "10px" }}>
            <Card.Body>
                <div className={`${styles.tooltipItem} ${styles.title}`}>
                    <Text weight={"bold"}>{ data.point.serieId }</Text>
                    <Text>{data.point.data.y}</Text>
                </div>
                {
                    lst.map((item) => {
                        return (
                            <div key={item?.name} className={styles.tooltipItem}>
                                <div className={styles.tooltipName}>
                                    { item?.name }
                                </div>
                                <div className={styles.tooltipGrade}>
                                    { item?.grade }
                                </div>
                            </div>
                        );
                    })
                }
            </Card.Body>
        </Card>
    )
}
