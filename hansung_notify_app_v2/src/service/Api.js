import axios from 'axios';
import KeyChain from './KeyChain';
import IDomParser from 'advanced-html-parser';

axios.defaults.withCredentials = true;

export const loginCheck = async (username, password) => {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);

  console.log(username, password);

  let requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Referer': 'https://learn.hansung.ac.kr/login.php',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
    },
    method: 'POST',
    credentials: 'same-origin',
    body: formdata,
    redirect: 'follow',
  };

  const result = await fetch(`https://learn.hansung.ac.kr/login/index.php`, requestOptions)
    .then((response) => {
      if (response.url.search("errorcode") !== -1) {
        console.log("Login Error!!!");
        return false;
      }
      return true;
    })
    .then(async (res) => {
      console.log("Login Response", res);
      return res;
    })
    .catch((error) => console.log(error));

    return result;
}

export const getUserCookie = async () => {
    const username = await KeyChain.getData('username');
    const password = await KeyChain.getData('password');

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    let requestOptions = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Referer': 'https://learn.hansung.ac.kr/login.php',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
      },
      method: 'POST',
      credentials: 'same-origin',
      body: formdata,
      redirect: 'follow',
    };

    const result = await fetch(`https://learn.hansung.ac.kr/login/index.php`, requestOptions)
      .then((response) => {
        if (response.url.search("errorcode") !== -1) {
          console.log("Login Error!!!");
          return;
        }
        return response;
      })
      .then(async (res) => {
        console.log("Login Response", res.headers);
      })
      .catch((error) => console.log(error));

    return result;
}

export const refreshClassList = async () => {
  let requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Referer': 'https://learn.hansung.ac.kr/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0'
    },
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  };

  const result = axios(`https://learn.hansung.ac.kr/`, requestOptions)
    .then(async (response) => {
      const html = response.data;
      const parsed = IDomParser.parse(html).querySelectorAll(".course_link");
      // console.log(parsed[0])
  
      let classData = []
      for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].querySelector(".label-course").innerText() != "커뮤니티") {
          classData.push({
            "name": parsed[i].querySelector(".course-title > h3").innerText(),
            "professor": parsed[i].querySelector(".course-title > p.prof").innerText(),
            "link": parsed[i].getAttribute('href')
          })
        }
      }

      const formdata = new FormData();
      formdata.append("id", KeyChain.getData("username"));
      formdata.append("passwd", KeyChain.getData("password"));
      formdata.append("changePass", "");
      formdata.append("return_url", "null");

      requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        redirect: 'follow',
        body: formdata,
      };

      await fetch(`https://info.hansung.ac.kr/servlet/s_gong.gong_login_ssl`, requestOptions)
        .then((resp) => {
          console.log("!!!!!", resp)
        })
      await fetch(`https://info.hansung.ac.kr/fuz/sugang/dae_sigan_main_data.jsp`, {method: 'GET'})
        .then((response) => {
          console.log(response);
        })


      return JSON.stringify(classData);
    })
    .catch((error) => {
      console.log(error);
    })

    return result;
}

export const getClassList = async () => {
  const classList = await KeyChain.getData("classList");
  return classList;
}