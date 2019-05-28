import xhr from "UTILS/xhr";
import urls from "CONSTS/urls";
import {prefix} from "CONSTS/consts"
class UserService {
  constructor() {
      this.url = urls["url"];
    }
    // 请求用户信息
    fetchUserInfo(data) {
    return xhr({
      method: "get",
      url: prefix +"/users/getUserInfo",
      params: {
        ...data
      }
    });
  }
  // 登陆
    login (data) {
      return xhr({
        method: "post",
        url: prefix +"/users/login",
        data: {
          ...data
        }
      });
    }
  // 修改用户信息
  updateUserInfo (data) {
    return xhr({
      method: "post",
      url: prefix +"/users/updateUserInfo",
      data: {
        ...data
      }
    });
  }
}

export default new UserService();