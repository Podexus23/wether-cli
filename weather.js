#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if(!token.length) {
    printError('Не передан токен. Можно ввести с помощью комманды -t [API_KEY]');
    return;
  }
  try{
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved')
  } catch(e) {
    printError(e.message);
  }
}
const saveCity = async (city) => {
  if(!city.length) {
    printError('Не передан город. Можно ввести с помощью комманды -s [CITY_NAME]');
    return;
  }
  try{
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City saved')
  } catch(e) {
    printError(e.message);
  }
}

const getForecast = async () => {
  try{
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon))
} catch (e) {
  if(e?.response?.status == 404) {
    printError('Неверно указан город')
  } else if(e?.response?.status == 401) {
    printError('Неверно указан токен')
  } else {
    printError(e.message)
  }
}
}

const initCLI = () => {
  const args = getArgs(process.argv);
  if(args.h) {
    printHelp();
    return;
  }
  if(args.s) {
    saveCity(args.s);
    return;
  }
  if(args.t) {
    saveToken(args.t);
    return;
  }
  getForecast();
}

initCLI();