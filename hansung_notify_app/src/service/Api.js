import {URL} from '../../env.json';

export const getData = async (dataType) => {
  var axios = require('axios');
  var data = '';

  var config = {
    method: 'get',
    url: `http://${URL}/api/user/${dataType}`,
    headers: {},
    data: data,
  };

  var res;
  await axios(config)
    .then(function (response) {
      res = response.data[dataType];
      return res;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};
