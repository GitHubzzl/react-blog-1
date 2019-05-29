import xhr from "UTILS/xhr";
import urls from "CONSTS/urls";
import {prefix} from "CONSTS/consts"
class PersonalService {
    constructor() {
        this.url = urls["url"];
    }

    // 请求用户信息
    fetchUserInfo(data) {
        return xhr({
            method: "get",
            url: prefix + "/users/getUserInfo",
            params: {
                ...data
            }
        });
    }
}
export default new PersonalService()