import SmoothBorder from "@/components/SmoothBorder";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { getGradeSimple } from "@/utils/Util";
import React from "react";

import styles from "@/styles/InfoPopOver.module.scss";

export const InfoPopOver = ({ info, setInfo, grade, setGrade }) => {
    return (
        <div>
            <div className={styles.infoDetail}>
                <div className={styles.infoDetailTitle}>
                    <div className={styles.infoDetailTitleLeft}>
                        <SmoothBorder content={info?.name[0]} size={40} />
                        <div>
                            <div className={styles.infoDetailName}>
                                {info?.name}
                            </div>
                            <div className={styles.infoDetailTrack}>
                                {info?.track1}•{info?.track2}
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.infoDetailTitleRight}
                        onClick={() => {
                            localStorage.removeItem("username");
                            localStorage.removeItem("password");
                            setInfo("");
                            setGrade("");
                            toast.success("로그아웃 되었습니다.");
                        }}
                    >
                        <div className={styles.logoutIcon}>
                            <FiLogOut size={20} color={"#F31260"} />
                        </div>
                    </div>
                    {/*<a href={"https://info.hansung.ac.kr/tonicsoft/jik/register/collage_register_hakjuk_rwd.jsp"}>*/}
                    {/*    <FiExternalLink color={"#cacaca"} size={20} />*/}
                    {/*</a>*/}
                </div>
                <div className={styles.infoDetailContent}>
                    <div className={styles.infoDetailItem}>
                        <div className={styles.infoDetailItemUpText}>{info.grade}</div>
                        <div className={styles.infoDetailItemDownText}>학년</div>
                    </div>
                    <div className={styles.infoDetailItem}>
                        <div className={styles.infoDetailItemUpText}>{getGradeSimple(grade)}</div>
                        <div className={styles.infoDetailItemDownText}>학점</div>
                    </div>
                    <div className={styles.infoDetailItem}>
                        <div className={styles.infoDetailItemUpText}>
                            미지원
                            {/*<FiX size={20} />*/}
                        </div>
                        <div className={styles.infoDetailItemDownText}>비교과</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
