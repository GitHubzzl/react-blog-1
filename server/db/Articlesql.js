var ArticleSQL = {  
    insert:'INSERT INTO `article` (`user_id`,`title`,`content`,`type`,`is_publish`,`update_time`) VALUES(?,?,?,?,?,?)',
    queryAll:'SELECT * FROM article',
    queryUserArticle:'SELECT * FROM article  WHERE user_id = ?',
    queryArticle:'SELECT * FROM article WHERE id = ?',
    updateArticle:'UPDATE article SET title = ?,content = ?,type = ?,is_publish = ?,update_time = ? WHERE id = ?',
    getUserByInfo:'SELECT * FROM User WHERE username = ? AND password = ? ',
    deleteArticle:"DELETE FROM article WHERE id = ? "
  };
module.exports = ArticleSQL;