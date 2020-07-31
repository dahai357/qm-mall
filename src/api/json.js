

// import request from '../libs/utils/request'
import axios from "axios";
// import Vue from 'vue'
import env from "../config/url";

var instance = axios.create({
  baseURL: env.jsonUrl
});

export default {

      async getCityJson (data) {
        return await instance.get('/static/json/city.json')
      },

      async getIndustryJson (data) {
        return await instance.get('/static/json/industry.json')
      },

      async getConfig (data) {
        return await instance.get('/static/json/config.json')
      },

}
