import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router'
import { Input } from 'antd';
import logo from '../../../static/img/logo.png';
import head from '../../../static/img/head.jpg';
import './index.less';
import navJson from './nav-json';
import userService from 'SERVICES/userService'
const Search = Input.Search;

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentNav:0,
            userInfo:{}
        }
    }
    static defaultProps = {
        id:''
    }
    componentDidMount () {
        userService.fetchUserInfo({id:this.props.id}).then((res) => {
            this.setState({
                userInfo:res.data
            })
        })
    }
    // choose nav title
    handleOnClickNav (index) {
        this.setState({
            currentNav:index
        })
        if (index === 3) {
            if(!this.props.id){
                this.context.router.push('/login')
            }else{
                this.context.router.push({pathname:`/personal`,query:{id:this.props.id}})
            }

        }
    }
    handleClickNavItem (item) {
        // item.href && window.open(item.href)
        item.href && this.context.router.push({pathname:`/personal`,query:{id:this.props.id}})
    }
    // to write article route
    handleOnToWrite () {
        this.context.router.push({pathname:'/writeArticle',query:{id:this.props.id}})
    }
    jumpToPersonalPage () {
        this.context.router.push(`personalSetting/articleManage`)
        
        // UserService.fetchUserInfo({
        //     id:"1"
        // })
    }
    render () {
        const { userInfo } = this.state
        return (
            <nav className="nav">
            <img style={{"border-radius": "50%"}} src={logo} title="回到首页" onClick={()=> this.context.router.push({pathname:`/index`,query:{id:this.props.id}})}/>
            <ul className="nav-ul">
                {
                    navJson && navJson.map((item, index) => {
                        const choose = this.state.currentNav === index ? "nav-li choosed" : "nav-li"
                        return (
                            <li key={index} className={choose} onClick={ this.handleOnClickNav.bind(this, index) }>
                            <i className={item.icon}></i>
                            <span className="nav-li-name">{ item.name }</span>
                            <ul className="nav-ul-child">
                                {
                                    item.children.map((item, i) => {
                                       return <li className="nav-child-li" key={"child" + i} onClick={ this.handleClickNavItem.bind(this, item) }>{ item.name }</li>
                                    })
                                }
                            </ul>
                            </li>
                        )
                    }) 
                }
            </ul>
            <div style={{float:"right"}}>
            
                <button className="default" style={{float:"right"}} onClick={this.handleOnToWrite.bind(this)}>
                <i className="iconfont icon--quill" style={{marginRight:"5px"}}></i>
                写文章
                </button>
                <Search placeholder="搜索..."
                        onSearch={value => console.log(value)}
                        size="large"
                        style={{ width: "40%",height:40,marginTop:10,marginRight:25,float:"right" }}/>
                <div className="header-user">
                    <div className="user-content">
                        <a href="">
                            <img src={userInfo.img ? userInfo.img : head} alt="head" />
                        </a>
                        <i className="iconfont icon-xiangxia"></i>
                    </div>
                    <ul className="user-setting">
                        <li onClick={this.jumpToPersonalPage.bind(this)}>
                            <a>
                            <i className="iconfont icon-user" ></i>文章管理
                            </a>
                        </li>
                        <li onClick={()=> this.context.router.push(`/personalSetting/userManage`)}>
                            <a >
                            <i className="iconfont icon-shezhi" ></i>个人设置
                            </a>
                        </li>
                        <li onClick={()=> this.context.router.push(`/login`)}>
                        <a >
                            <i className="iconfont icon-tuichu" ></i>退出
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            </nav>
        )
    }
}
Header.contextTypes = {
    router: React.PropTypes.object
} 
export default Header;