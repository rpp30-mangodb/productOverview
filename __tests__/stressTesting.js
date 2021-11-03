import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }
export default function () {
  for (let i = 1; i <= 100; i++) {
    http.get(`http://localhost:9000/products/${i}`);
  }
  // sleep(1);
}