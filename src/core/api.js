import axios from 'axios';

class Api {
  constructor() {
    this.BASE = 'http://localhost:3000/api/v1';
    this.api = axios.create({
      baseURL: this.BASE,
      timeout: 6000,
    });
  }

  login = async (email, passwd) => {
    const rs = await this.api.post('/auth/login', {
      email,
      passwd,
    });
    return rs;
  };
}

export default new Api();
