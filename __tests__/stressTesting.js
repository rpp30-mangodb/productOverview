import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // vus: 100,
  // duration: '10s'

  // stages: [
  //   { duration: '30s', target: 500 },
  //   { duration: '30s', target: 100 },
  //   { duration: '20s', target: 0 },
  // ]

  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1000,
      maxVUs: 5000,
    },
  }
};


export default function () {
  let randomNumberGenerator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  let random_id = randomNumberGenerator(900000, 1000000)

  // let URL = 'http://localhost:9000/products';                          // <-- 1,000,010
  // let URL = `http://localhost:9000/products/${random_id}`;             // <-- 1,000,011
  // let URL = `http://localhost:9000/products/${random_id}/styles`;      // <-- 800,448
  let URL = `http://localhost:9000/products/${random_id}/related`;     // <-- 1,000,009


  const res = http.get(URL);
  check(res, { 'status was 200': (r) => r.status === 200 });
}


// COMMAND TO REMOVE CACHED QUERIES
// db.<tableName>.getPlanCache().clear()