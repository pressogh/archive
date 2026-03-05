import React from 'react';
import { toast } from 'react-toastify';
import { ErrorMessage } from "@/utils/ErrorMessage";

export const getGrade = async (username, password) => {
    const data = {
        "username": username,
        "password": password
    };

    let requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
      },
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      redirect: 'follow',
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/grade`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                if (ErrorMessage[response.status]) toast.error(`[${response.status}] ${ErrorMessage[response.status]}`);
                else toast.error(`[${response.status}] ${response.statusText}`);
                return "";
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            toast.error(`[500] ${ErrorMessage["500"]}`);
            return "";
        })

    return res;
}

export const getNowGrade = async (username, password, rememberMe) => {
    const data = {
        "username": username,
        "password": password
    };

    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
        },
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        redirect: 'follow',
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/nowgrade`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                if (ErrorMessage[response.status]) toast.error(`[${response.status}] ${ErrorMessage[response.status]}`);
                else toast.error(`[${response.status}] ${response.statusText}`);
                return "";
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            toast.error(`[500] ${ErrorMessage["500"]}`);
            return "";
        })

    return res;
}

export const getInfo = async (username, password, rememberMe) => {
    const data = {
        "username": username,
        "password": password
    };

    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
        },
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        redirect: 'follow',
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/info`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                if (ErrorMessage[response.status]) toast.error(`[${response.status}] ${ErrorMessage[response.status]}`);
                else toast.error(`[${response.status}] ${response.statusText}`);
                return "";
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            toast.error(`[500] ${ErrorMessage["500"]}`);
            return "";
        })

    if (rememberMe === true && res) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    }

    if (res) toast.success("로그인 성공", { theme: "colored" });

    return res;
}
