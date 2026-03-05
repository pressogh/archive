import React, { useState } from "react";
import { Button, Popover, Text, User } from "@nextui-org/react";
import LoginModal from "@/components/LoginModal";
import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";
import { gradeData, infoData } from "@/utils/States";
import SmoothBorder from "@/components/SmoothBorder";
import { InfoPopOver } from "@/components/InfoPopOver";

import styles from "@/styles/Navbar.module.scss";

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
        <nav className={styles.navbar}>
            <LoginModal visible={visible} closeHandler={closeHandler} />
            <div className={styles.container}>
                <div className={styles.gnbMenuLeft}>
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
                <div className={styles.gnbWrap}>
                    <div className={styles.gnbMenuRight}>
                        {
                            info ?
                                <div className={styles.info}>
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
        </nav>
    );
}
