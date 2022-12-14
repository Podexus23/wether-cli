#!/usr/bit/env node
import { getArgs } from "./helpers/args.js";
import { printHelp } from "./helpers/services/log.service.js";

const initCLI = () => {
  const args = getArgs(process.argv);
  // console.log(args)
  if(args.h) printHelp();
  
}

initCLI();