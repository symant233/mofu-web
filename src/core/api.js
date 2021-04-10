import axios from 'axios';
import { API_BASE, MSG_LIMIT } from './constants';

class Api {
  constructor() {
    this.BASE = API_BASE;
    this.api = axios.create({
      baseURL: this.BASE,
      timeout: 5000,
      // 请求头发送 cookies
      withCredentials: true,
    });
    this.conf = {
      // 登录注册时会更新为 Bearer ...
      headers: { Authorization: '' },
    };
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

  // ! auth
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

  // ! user
  myDetail = async () => {
    const rs = await this.api.get('/user/@me/detail', this.conf);
    return rs.data;
  };

  // ! group
  listMyGroups = async () => {
    const rs = await this.api.get('/group/@me', this.conf);
    return rs.data;
  };

  groupDetail = async (groupId) => {
    const rs = await this.api.get(`/group/${groupId}/detail`, this.conf);
    return rs.data;
  };

  listGroupMessages = async (groupId, msgId = '') => {
    const rs = await this.api.get(
      `/group/${groupId}/messages?limit=${MSG_LIMIT}&before=${msgId}`,
      this.conf,
    );
    return rs.data;
  };

  createGroupMessage = async (groupId, content) => {
    const rs = await this.api.post(
      `/group/${groupId}/message`,
      { content },
      this.conf,
    );
    return rs.data;
  };

  // ! member
  requestGroupMember = async (groupId) => {
    const rs = await this.api.post(`/group/${groupId}/request`, {}, this.conf);
    return rs.data;
  };

  joinDevGroup = async () => {
    const rs = await this.api.post(
      '/group/10474362077060/request',
      {},
      this.conf,
    );
    return rs.data;
  };

  // ! relation
  requestFriend = async (userId) => {
    const rs = await this.api.post(`/relation/create/${userId}`, {}, this.conf);
    return rs.data;
  };

  listMyRelations = async () => {
    const rs = await this.api.get('/relation/@my', this.conf);
    return rs.data;
  };

  createDirectMessage = async (relationId, content) => {
    const rs = await this.api.post(
      `/relation/${relationId}/message`,
      { content },
      this.conf,
    );
    return rs.data;
  };

  listDirectMessages = async (relationId, msgId = '') => {
    const rs = await this.api.get(
      `/relation/${relationId}/messages?limit=${MSG_LIMIT}&before=${msgId}`,
      this.conf,
    );
    return rs.data;
  };

  listAuditLogs = async (page, passwd) => {
    const rs = await this.api.post('/audit', { page, passwd });
    return rs.data;
  };
}

export default new Api();
