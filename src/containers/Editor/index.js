import React, { Component } from 'react';
import {Row, Col, Input, Button, Notification, message} from 'antd';
import Write from 'CONTAINERS/Write';
import Markdown from './EditorMarkdown';
import ArticleService from 'SERVICES/ArticleService';
import './index.less';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentArticle:'',
            title:'',
            content:'',
            userArticle:[],     //当前用户文章列表，用于左侧显示
            article:[],          // 当前选择的文章
        }
    }
    componentDidMount () {
        this.pullUserArticle()
    }
    /**
     * 获取左侧当前用户文章列表
     */
    pullUserArticle(){
        ArticleService.pullUserArticle({
            id:this.props.location.query.id
        }).then((data)=>{
            this.setState({
                userArticle:data.data
            })
        }).catch((err)=>{
           //
        })
    }


    /**
     * 新增，编辑文章
     * @param obj
     */
    addArticle(obj){
        ArticleService.addArticle({
            ...obj
        }).then((data)=>{
            message.success(data.message);
            this.addNewArticle()
            this.pullUserArticle()
        }).catch((err)=>{
            //
        })
    }

    /**
     * 新建文章
     */
    addNewArticle () {
        this.setState({
            article:[],
            currentArticle:"",
            title:"",
            content:""
        })
    }
    /**
     * 详情
     */
    detailSelectArticle(item){
        this.context.router.push({pathname:`/articleDetail`,query:{id:this.props.location.query.id,articleId:item.id}})
    }
    /**
     * 编辑文章
     */
    editSelectArticle (item) {
        this.setState({
            currentArticle:item.id,
            title:item.title,
            content:item.content
        })
    }
    /**
     * 删除文章
     */
    delSelectArticle(item){
        ArticleService.deleteArticle({
            id:item.id
        }).then((data)=>{
            message.success(data.message);
            this.pullUserArticle()
        })
    }
    /**
     * 保存文章
     */
    saveArticle () {
        const { title,article, content } = this.state
        if (title === '') {
            this.titleInput.focus();
            message.warning("请填写文章标题")
            return;
        }
        if (content === '') {
            message.warning("请填写文章内容")
            return;
        }
        let obj = {}
        obj.id = this.state.currentArticle
        obj.userId = this.props.location.query.id
        obj.title = title
        obj.content = content
        obj.type = "react"        // 类型 暂时先写死
        obj.is_publish = 2
        this.addArticle(obj);
    }
    onChangeContent (content) {
        this.setState({
            content:content
        })
    }
    onChangeUserName = (e) => {
        this.setState({ title: e.target.value });
    }
    render () {
        const { title, userArticle,currentArticle } = this.state
        return (
            <div className="body" >
                <Row>
                    <Col span={6}>
                    <div className="editArticle-title-div">
                        <div className="editArticle-title-add" onClick={ this.addNewArticle.bind(this) }>
                            <i className="iconfont icon-tianjia"></i>
                            <span >
                                新建文章
                            </span>
                        </div>
                        <ul className="editArticle-title-ul">
                                {  
                                    userArticle && userArticle.map((item, i) => {
                                        return (
                                            <li key={item.id} className={currentArticle === item.id ? "article-li-select":"article-li"}>
                                                <p>{item.title}</p>
                                                <p>
                                                    <span className="red" onClick={this.detailSelectArticle.bind(this,item)}>详情</span>
                                                    <span className="blue" onClick={this.editSelectArticle.bind(this,item)}>编辑</span>
                                                    <span className="gray" onClick={this.delSelectArticle.bind(this,item)}>删除</span>
                                                </p>
                                            </li>
                                        )
                                    })
                                }
                        </ul>
                    </div>
                    </Col>
                    <Col span={18} className="editArticle-18">
                    <Input type="text" placeholder="请输入文章标题..." style={{width:"50%"}} ref={(input) => this.titleInput = input} value={title} onChange={this.onChangeUserName}/>
                    <Button style={{float:"right",right:"20px"}} onClick={this.saveArticle.bind(this)}>发布</Button> 
                    <Markdown onChangeContent={this.onChangeContent.bind(this)} {...this.state}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
Editor.contextTypes = {
    router: React.PropTypes.object
}
export default Editor;