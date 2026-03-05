import React, { useState } from "react";
import { Button, Popover, Text, User } from "@nextui-org/react";
import LoginModal from "@/components/LoginModal";
import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";
import { gradeData, infoData } from "@/utils/States";
import SmoothBorder from "@/components/SmoothBorder";
import { FiLogOut } from "react-icons/fi";
import { getGradeSimple } from "@/utils/Util";
import { toast } from "react-toastify";

export const InfoPopOver = ({ info, setInfo, grade, setGrade }) => {
    return (
        <div>
            <div className="info-detail">
                <div className="info-detail-title">
                    <div className="info-detail-title-left">
                        <SmoothBorder content={info?.name[0]} size={40} />
                        <div>
                            <div className="info-detail-name">
                                {info?.name}
                            </div>
                            <div className="info-detail-track">
                                {info?.track1}•{info?.track2}
                            </div>
                        </div>
                    </div>
                    <div
                        className="info-detail-title-right"
                        onClick={() => {
                            localStorage.removeItem("username");
                            localStorage.removeItem("password");
                            setInfo("");
                            setGrade("");
                            toast.success("로그아웃 되었습니다.");
                        }}
                    >
                        <div className="logout-icon">
                            <FiLogOut size={20} color={"#F31260"} />
                        </div>
                    </div>
                    {/*<a href={"https://info.hansung.ac.kr/tonicsoft/jik/register/collage_register_hakjuk_rwd.jsp"}>*/}
                    {/*    <FiExternalLink color={"#cacaca"} size={20} />*/}
                    {/*</a>*/}
                </div>
                <div className="info-detail-content">
                    <div className="info-detail-item">
                        <div className="info-detail-item-up-text">{info.grade}</div>
                        <div className="info-detail-item-down-text">학년</div>
                    </div>
                    <div className="info-detail-item">
                        <div className="info-detail-item-up-text">{getGradeSimple(grade)}</div>
                        <div className="info-detail-item-down-text">학점</div>
                    </div>
                    <div className="info-detail-item">
                        <div className="info-detail-item-up-text">
                            미지원
                            {/*<FiX size={20} />*/}
                        </div>
                        <div className="info-detail-item-down-text">비교과</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .info-detail {
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    min-width: 200px;
                    width: 340px;
                }
                .info-detail-title {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    width: 100%;
                    border-bottom: 1px dotted rgba(219, 219, 219, 1);
                    padding-bottom: 2vh;
                    margin-bottom: 2vh;
                }
                .info-detail-title-left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    width: 100%;
                }
                .info-detail-title-right {
                    display: flex;
                    align-self: flex-start;
                }
                .info-detail-name {
                    margin-left: 1vw;
                    font-weight: bold;
                    font-size: 22px;
                }
                .info-detail-track {
                    margin-left: 1vw;
                    font-size: 12px;
                }
                .info-detail-grade {
                    font-weight: lighter;
                    font-size: 1.5vw;
                }
                .info-detail-content {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }
                .info-detail-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .info-detail-item-up-text {
                    font-weight: bold;
                    font-size: 22px;
                }
                .info-detail-item-down-text {
                    //font-weight: bold;
                    font-size: 16px;
                }
                .logout-icon {
                  filter: drop-shadow(1px 2px 2px rgba(255, 0, 0, 0.5));
                  transition: 0.2s;
                }
                .logout-icon:hover {
                    transform: scale(1.25);
                    transition: 0.2s;
                }
            `}</style>
        </div>
    )
}

export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useRecoilState(infoData);
    const [grade, setGrade] = useRecoilState(gradeData);

    const handler = () => {
        setVisible(true);
    };

    const closeHandler = () => {
        setVisible(false);
    }

    return (
        <nav className="navbar">
            <LoginModal visible={visible} closeHandler={closeHandler} />
            <div className="container">
                <div className="gnb-menu-left">
                    <Link href="/">
                        <Text
                            h1
                            size={50}
                            css={{
                                textGradient: "90deg, $blue500 -20%, $pink500 50%",
                                marginLeft: "30px"
                            }}
                        >
                            한움
                        </Text>
                    </Link>
                </div>
                <div className="gnb-wrap">
                    <div className="gnb-menu-right">
                        {
                            info ?
                                <div className="info">
                                    <Popover
                                        placement="bottom"
                                    >
                                        <Popover.Trigger>
                                            <div>
                                                <SmoothBorder content={info?.name[0]} size={50} />
                                            </div>
                                        </Popover.Trigger>
                                        <Popover.Content>
                                            <InfoPopOver info={info} setInfo={setInfo} grade={grade} setGrade={setGrade} />
                                        </Popover.Content>
                                    </Popover>
                                </div>
                                :
                            <Button auto color="primary" onClick={handler}>
                                로그인
                            </Button>
                        }

                    </div>
                </div>
            </div>

            <style jsx>{`
                .navbar {
                    margin-top: 1vh;
                }
                .container {
                    display: flex;
                    justify-content: space-between;
                }
                .title {
                    display: flex;
                    justify-content: center;
                }
                .gnb-wrap {
                    display: flex;
                    align-self: center;
                }
                .gnb-menu-right {
                    margin-right: 10vw;
                }
                .gnb-menu-left {
                    margin-left: 10vw;
                }
                .info {
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;
                }
            `}</style>
        </nav>
    );
}
