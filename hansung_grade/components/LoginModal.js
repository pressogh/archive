import React, { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Password } from "@/components/icons/Password";
import { StudentNumber } from "@/components/icons/StudentNumber";
import { getGrade, getInfo } from "@/utils/Api";

import { useRecoilState } from 'recoil';
import { gradeData, username, password, infoData } from "@/utils/States";


export default function LoginModal({ visible, closeHandler }) {
    const [id, setId] = useRecoilState(username);
    const [passwd, setPassword] = useRecoilState(password);
    const [grade, setGradeData] = useRecoilState(gradeData);
    const [info, setInfoData] = useRecoilState(infoData);

    const [rememberMe, setRememberMe] = useState(false);

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginButtonClick = async () => {
        closeHandler();
        setGradeData("loading");
        setGradeData(await getGrade(id, passwd));
        setInfoData(await getInfo(id, passwd, rememberMe));
    }

    return (
        <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleLoginButtonClick();
                }
            }}
        >
            <Modal.Header>
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "90deg, $blue500 -20%, $pink500 50%",
                    }}
                    weight="bold"
                >
                    한움
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="학번"
                    contentLeft={<StudentNumber fill="currentColor" />}
                    onChange={handleIdChange}
                    value={id}
                />
                <Input.Password
                    contentLeft={<Password fill="currentColor" />}
                    placeholder="비밀번호"
                    onChange={handlePasswordChange}
                    value={passwd}
                />
                <Row justify="space-between">
                    <Checkbox isSelected={rememberMe} onChange={() => setRememberMe(!rememberMe)} >
                        <Text size={14}>로그인 유지</Text>
                    </Checkbox>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                    닫기
                </Button>
                <Button auto onClick={handleLoginButtonClick}>
                    로그인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
