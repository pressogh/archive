import { atom } from 'recoil';

const username = atom({
    key: "username",
    default: ''
})

const password = atom({
    key: "password",
    default: ''
})

const gradeData = atom({
    key: "gradeData",
    default: '',
});

const nowGradeData = atom({
    key: "nowGradeData",
    default: '',
});

const infoData = atom({
    key: "infoData",
    default: '',
})

export { username, password, gradeData, nowGradeData, infoData };