export const gradeWeight = {
    "A+": 4.5,
    "A0": 4.0,
    "B+": 3.5,
    "B0": 3.0,
    "C+": 2.5,
    "C0": 2.0,
    "D+": 1.5,
    "D0": 1.0,
    "F0": 0.0,
    "P": 0.2,
    "N": 0.1
};

// 평균 학점
export function parseGPA(data) {
    let semester = [];

    for (let item in data) {
        const year = data[item]["semester"].split("학년도")[0];
        const semesterNum = data[item]["semester"].split("학년도")[1].split("학기")[0];

        if (window.innerWidth > 775) {
            semester.push(
                {
                    x: year + "학년도 " + semesterNum + "학기",
                    y: data[item]["average_credits"],
                    subject: data[item]["subject"]
                }
            );
        } else {
            semester.push(
                {
                    x: year[2] + year[3] + "." + semesterNum + ".",
                    y: data[item]["average_credits"],
                    subject: data[item]["subject"]
                }
            );
        }
    }

    return [
        {
            id: "평균 학점",
            color: "hsl(37, 70%, 50%)",
            data: semester.reverse()
        }
    ];
}

// 전공 평균 학점
export function parseMGPA(data) {
    let semester = [];
    let mgpaList = [];

    for (let item in data) {
        let mgp = 0.0, mcount = 0;
        let subjectList = [];
        for (let subject in data[item]["subject"]) {
            if (data[item]["subject"][subject].classification === "전필" || data[item]["subject"][subject].classification === "전선" || data[item]["subject"][subject].classification === "전기") {
                mgp += gradeWeight[data[item]["subject"][subject].grade];
                mcount++;
                subjectList.push(data[item]["subject"][subject]);
            }
        }

        mgpaList.push(
            {
                semester: data[item]["semester"],
                mgpa: mgp === 0 ? 0 : Math.floor(mgp / mcount * 100) / 100,
                subject: subjectList
            }
        )
    }

    for (let item in mgpaList) {
        const year = mgpaList[item]["semester"].split("학년도")[0];
        const semesterNum = mgpaList[item]["semester"].split("학년도")[1].split("학기")[0];

        if (window.innerWidth > 775) {
            semester.push(
                {
                    x: year + "학년도 " + semesterNum + "학기",
                    y: mgpaList[item].mgpa,
                    subject: mgpaList[item].subject
                }
            );
        } else {
            semester.push(
                {
                    x: year[2] + year[3] + "." + semesterNum + ".",
                    y: mgpaList[item].mgpa,
                    subject: mgpaList[item].subject
                }
            );
        }
    }

    return [
        {
            id: "전공 평균 학점",
            color: "hsl(37, 70%, 50%)",
            data: semester.reverse()
        }
    ];
}

export const randomData = () => {
    const res = [];

    const now = new Date();
    for (let i = 0; i < 6; i++) {
        now.setDate(now.getDate() - 182);
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const semester = (3 <= month && month <= 8) ? 2 : 1;

        // vw가 775px 이하라면
        if (window.innerWidth > 775) {
            res.push(
                {
                    x: year + "학년도" + (` ${semester}학기`),
                    y: (Math.round((Math.random() * (4.5 - 3.5) + 3.5) * 100) / 100).toString()
                }
            );
        } else {
            res.push(
                {
                    x: year + "." + ` ${semester}.`,
                    y: (Math.round((Math.random() * (4.5 - 3.5) + 3.5) * 100) / 100).toString()
                }
            );
        }
    }

    return [
        {
            id: "평균 학점",
            data: res.reverse()
        }
    ];
}

/**
 * @param data 학점 데이터
 * @returns {number} 평균 학점(소수점 뒤 2자리까지)
 * @description 학점 데이터를 받아 평균 학점을 계산
 */
export const getGradeSimple = (data) => {
    let gp = 0.0, count = 0;
    for (let item in data) {
        for (let subject in data[item]["subject"]) {
            if (data[item]["subject"][subject].grade !== "N" && data[item]["subject"][subject].grade !== "P") {
                gp += gradeWeight[data[item]["subject"][subject].grade];
                count++;
            }
        }
    }

    return Math.floor(gp / count * 100) / 100;
}
