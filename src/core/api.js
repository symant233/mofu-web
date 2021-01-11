import axios from 'axios';
import { API_BASE } from './constants';

class Api {
  constructor() {
    this.BASE = API_BASE;
    this.api = axios.create({
      baseURL: this.BASE,
      timeout: 5000,
      // 请求头发送 cookies
      withCredentials: true,
    });
  }

  warn = (err) => {
    if (!err.response) console.warn(err);
    else {
      console.warn(
        `${err.response.status} ${err.response.data.message}`,
        err.response.data,
      );
    }
  };

  login = async (email, passwd) => {
    const rs = await this.api.post('/auth/login', {
      email,
      passwd,
    });
    return rs.data;
  };

  register = async (nick, email, passwd) => {
    const rs = await this.api.post('/auth/register', {
      nick,
      email,
      passwd,
    });
    return rs.data;
  };

  myDetail = async () => {
    const rs = await this.api.get('/user/@me/detail');
    return rs.data;
  };

  myGroups = async () => {
    const rs = await this.api.get('/group/@me');
    return rs.data;
  };

  groupDetail = async (groupId) => {
    const rs = await this.api.get(`/group/${groupId}/detail`);
    return rs.data;
  };

  listGroupMessages = async (groupId, msgId = '') => {
    const rs = await this.api.get(
      `/group/${groupId}/messages?limit=30&before=${msgId}`,
    );
    return rs.data;
  };

  createGroupMessage = async (groupId, content) => {
    const rs = await this.api.post(`/group/${groupId}/message`, {
      content,
    });
    return rs.data;
  };

  requestGroupMember = async (groupId) => {
    const rs = await this.api.post(`/group/${groupId}/request`, {});
    return rs.data;
  };

  joinDevGroup = async () => {
    const rs = await this.api.post('/group/10474362077060/request', {});
    return rs.data;
  };
}

export default new Api();
