import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  return '=)'
}

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) { 
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }

  const { data } = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
    params: {
      q: city,
      limit: 1,
      appid: token,
    }
  })
  if(!data.length) throw new Error('Неверно указан город');
  const realData = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: data[0].lat,
      lon: data[0].lon,
      appid: token,
      lang: 'ru',
      units: 'metric',
    }
  })
  return realData.data;
}

export { getWeather, getIcon }