import React, { Component } from 'react';
import { Row, Col, Card,Input   } from 'antd';
import personImg from '../../../../static/img/logo.png';
import userService from 'SERVICES/userService'
// import personalService from 'SERVICES/personalService'
import './index.less'


class PersonalArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo:{},
            isShow:true,
            personalIntro:''
        }
    }
    componentDidMount () {
        userService.fetchUserInfo({id:this.state.userInfo.id}).then((res) => {
            this.setState({
                userInfo:res.data
            })
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
            id:this.state.userInfo.id,
            personalIntro:this.state.personalIntro
        }).then(res=>{
            console.log(res);
        })
    }
    render() {
        return(
            <div className="personalArticle-container">
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
                                {this.state.userInfo.personal_intro }
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
                    <Col span={12}>col-12</Col>
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