import React, { Component } from 'react';
import {Row, Col, Card, Input, Avatar} from 'antd';
import personImg from '../../../../static/img/logo.png';
import userService from 'SERVICES/userService'
import articleService from 'SERVICES/articleService'
import './index.less'
import img1 from "../../../../static/img/article-1.jpg";
import moment from "../../Main/Article";
import {Link} from "react-router";


class PersonalArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo:{},
            isShow:true,
            personalIntro:'',
            article:[]
        }
    }
    componentDidMount () {
        userService.fetchUserInfo({id:this.props.location.query.id}).then((res) => {
            this.setState({
                userInfo:res.data
            })
        })
        articleService.pullUserArticle({
            id:this.props.location.query.id
        }).then((data)=>{
            this.setState({
                article:data.data
            })
        }).catch((err)=>{
            console.log("文章res",err)
            // Notification.error({message:err.message})
        })
    }
    editPersonalIntro(){
        this.setState({
            isShow:false
        })
    }
    changePersonalIntro(event){
        this.setState({
            personalIntro:event.target.value
        })
    }
    cancelChangePer(){
        this.setState({
            isShow:true,
            personalIntro:''
        })
    }
    submitPersonalIntro(){
        userService.updateUserInfo({
            id:this.props.location.query.id,
            personalIntro:this.state.personalIntro
        }).then(res=>{
            this.setState({
                isShow:true,
                userInfo:res.data,
                personalIntro:'',
                article:[]
            })
        })
    }
    render() {
        const { article } = this.state
        return(
            <div className="personalArticle-container ">
                <Row>
                    <Col span={6}>
                        <Card
                            className="card"
                        >
                            <img alt="example" src={personImg} className="avt" />
                            <h2>{this.state.userInfo.nickname}</h2>
                            <p
                                onClick={this.editPersonalIntro.bind(this)}
                                style={{display:this.state.isShow ? "block" : "none"}}>
                                {this.state.userInfo.personalIntro }
                            </p>
                            <div style={{display:this.state.isShow ? "none" : "block"}}>
                                <Input
                                    value={this.state.personalIntro}
                                    onChange = {this.changePersonalIntro.bind(this)}
                                />
                                <span onClick={this.submitPersonalIntro.bind(this)}>提交</span>
                                <span onClick={this.cancelChangePer.bind(this)}>取消</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <div className="article-content ">
                            <ul className="article-content-ul">
                                {
                                    article && article.map((item,i) => {
                                        return <li key={item.id} className="article-content-li">
                                            <div className="note-content">
                                                <div className="author">
                                                    <Avatar  src={item.author ? item.author.img : img1} />
                                                    <div className="author-info">
                                                        <a href="">{item.author ? item.author.name : ""}</a>
                                                        <span>{ item.author ? moment(item.author.time).fromNow() :""}</span>
                                                    </div>
                                                </div>
                                                <Link to={{pathname:`/articleDetail/${item.id}`,params:{id:item.id}}} className="note-title"> { item.title } </Link>
                                                <p className="note-abstract"> { item.content } </p>
                                                <div className="note-footer">
                                                    <div>
                                                        <a href="" className="footer-type">{ item.type }</a>
                                                        <i className="iconfont icon-yanjing-tianchong"></i>
                                                        <a href="" className="footer-readNum"> { item.readNum || 0} </a>
                                                        <i className="iconfont icon-xiaoxi"></i>
                                                        <a href="" className="footer-commentNum"> { item.commentNum || 0} </a>
                                                        <i className="iconfont icon-aixin"></i>
                                                        <a href="" className="footer-agree"> { item.agree || 0} </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </Col>
                    <Col span={6}>col-12</Col>
                </Row>
            </div>

        )
    }
}
PersonalArticle.contextTypes = {
    router: React.PropTypes.object
}
export default PersonalArticle;