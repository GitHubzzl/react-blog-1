import React, { Component } from 'react';
import { Avatar,Affix, Button, Tooltip, Radio, Input  } from 'antd';
import CodeBlock from "COMPONENTS/CodeBlock";
import  ReactMarkdown from 'react-markdown';
import head from '../../../static/img/head.jpg';
import plImg from '../../../static/img/pl.png';
import a from './test.js'
import ArticleService from 'SERVICES/ArticleService';
import './index.less'
class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            article:[]
         }
    }
    componentDidMount () {
        // 获取当前文章
        ArticleService.pullArticle({
            id:this.props.location.query.articleId
        }).then(res=>{
            this.setState({
                article:res.data
            })
        }).catch((err)=>{
            //
        })
        var btn = document.getElementById('btn');
        var timer = null;
        var isTop = true;
        //获取页面可视区高度
        var clientHeight = document.documentElement.clientHeight;
       
         
        //滚动条滚动时触发
        window.onscroll = function() {
        //显示回到顶部按钮
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (osTop >= clientHeight/2) {
            btn.style.display = "block";
          } else {
            btn.style.display = "none";
          };
        //回到顶部过程中用户滚动滚动条，停止定时器
          if (!isTop) {
            clearInterval(this.interval);
          };
          isTop = false;
        };
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    backToTop () {
        this.interval =  setInterval(() => {
             console.log("定时循环回到顶部")
             var top = document.body.scrollTop || document.documentElement.scrollTop;
             var speed = top / 10;
             if (document.body.scrollTop!=0) {
                 document.body.scrollTop -= speed;
             }else {
                 document.documentElement.scrollTop -= speed;
             }
             if (top == 0) {
                 clearInterval(this.interval);
             }
         }, 30); 
         // document.body.scrollTop = document.documentElement.scrollTop = 0;
     }
     
    render() { 
        const { article } = this.state
        const { TextArea } = Input;

        return ( 
            <div className="articleDetail-container">
                <div className="post">
                    <div className="article">
                        <h1 className="title">{article.title || ''}</h1>
                        <div className="author">
                            <Avatar size={'large'} src={head}/>
                            <div className="info">
                                <span className="name">{article.userName ? article.userName : ''}</span>
                                <span>最后编辑于 {article.update_time} </span>
                                <span>字数 15 </span>
                                <span>阅读 2</span>
                                <span>评论 0</span>
                                <span>喜欢 1</span>
                            </div>
                        </div>
                        <div className="show-content">
                            <ReactMarkdown className="result"
                                source={article.content}
                                renderers={{code: CodeBlock}}
                            />
                        </div>
                        <div>
                            {/* <span>喜欢</span> */}
                        </div>
                        <div className="pl-header clearfix">
                            <div className="fl">
                                <span>2条评论</span>
                            </div>
                            <div className="fr">
                                <Radio.Group >
                                    <Radio.Button value="large">默认排序</Radio.Button>
                                    <Radio.Button value="small">时间排序</Radio.Button>
                                </Radio.Group> 
                            </div>
                        </div>
                        <div className="pl">
                            <Avatar size={'large'} src={head}/>
                            <div className="pl-textarea">
                                <TextArea  placeholder="请输入评论" autosize={{ minRows: 6, maxRows: 16 }}/>
                                <Button className="pl-btn" type="primary">发布评论</Button>
                            </div>
                        </div>
                        <div>
                            <img src={plImg} />
                        </div>
                    </div>
                </div>
                <Tooltip placement="left" title={"回到顶部"}>
                    <button id="btn" className="returnTop" style={{position:"fixed",right:"50px",bottom:"50px"}} onClick={this.backToTop.bind(this)}>
                        <i className="iconfont icon-xiangshang"></i>
                    </button>
                </Tooltip>
            </div>
         )
    }
}
 
export default ArticleDetail;