import React, { Component } from 'react';
import { Breadcrumb, Card, Table, Modal, Button, Notification } from 'antd';
import articleService from 'SERVICES/articleService'

import "./index.less"

class ArticleManage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible:false,
            article:[],
            currentDelete:null
         }
    }
    componentDidMount () {
        articleService.pullUserArticle().then((res) => {
            this.setState({
                article:res.data
            })
        })
    }
    readArticle (values) {
        this.context.router.push({pathname:`/articleDetail`,query:{id:this.props.location.query.id,articleId:values.id}})
        console.log(values)
    }
    editArticle (values) {
        this.context.router.push({pathname:`/writeArticle`,state:{id:values.id}})
        console.log("2",values)
    }
    deleteArticle = (values) => {
        this.setState({
          visible: true,
          currentDelete:values.id
        });
      }
    handleOk = (e) => {
        console.log(e);
        //删除文章
        articleService.deleteArticle({
            id:this.state.currentDelete
        }).then((res) => {
            // 刷新
            Notification.success({message:"删除成功！"})
            articleService.pullUserArticle().then((res) => {
                this.setState({
                    article:res.data
                })
            })
        })
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() { 
        const { article } = this.state
          
          const columns = [{
            title: '文章',
            dataIndex: 'title',
            key: 'title',
          }, {
            title: '上次修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
          }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
          },
          {
            title: '阅读量',
            dataIndex: 'readNum',
            key: 'readNum',
          },
          {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: '110px',
            className: 'table-operation',
            render: (text,values) => (
                <div className="table-oprate">
                    <span style={{width: "54px"}} onClick={this.readArticle.bind(this,values)}>查看</span>
                    <span style={{width: "54px"}} onClick={this.editArticle.bind(this,values)}>编辑</span>
                    <span style={{width: "54px"}} onClick={this.deleteArticle.bind(this,values)}>删除</span>
                </div>)
          }
        ];
        return ( 
            <div className="userManage-container">
                <div className="manage-title">
                    <Breadcrumb>
                        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card title="文章列表" style={{ marginBottom: 24 }} bordered={false}>
                    <Table dataSource={article} columns={columns} />
                </Card>
                <Modal
                    title="删除文章"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>确认删除吗？(删除后不可恢复)</p>
                </Modal>
            </div>
         )
    }
}
 
ArticleManage.contextTypes = {
    router: React.PropTypes.object
}
export default ArticleManage;

