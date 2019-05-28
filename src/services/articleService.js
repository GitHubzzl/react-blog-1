import xhr from "UTILS/xhr";
import urls from "CONSTS/urls";
import {prefix} from "CONSTS/consts"
class ArticleService {
  constructor() {
      this.url = urls["url"];
    }
    // 发布文章
    addArticle (data) {
      return xhr({
        method: "post",
        url: prefix + "/article/addArticle",
        params: {
          ...data
        }
      });
    }
    // 主页文章
    pullIndexArticle (data) {
      return xhr({
        method: "post",
        url: prefix + "/article/pullIndexArticle",
        data: {
          ...data
        }
      });
    }
    // 当前用户文章列表
    pullUserArticle (data) {
      return xhr({
        method: "post",
        url: prefix + "/article/pullUserArticle",
        data: {
          ...data
        }
      });
    }
    // 单篇文章
    pullArticle(data) {
      return xhr({
        method: "post",
        url: prefix + "/article/pullArticle",
        data: {
          ...data
        }
      });
    }

    // 删除当前文章
    deleteArticle(data) {
      return xhr({
        method: "post",
        url: prefix + "/article/deleteArticle",
        data: {
          ...data
        }
      });
    }
}

export default new ArticleService();