import React, { Component } from 'react';
import { Row, Col, Card  } from 'antd';
import personImg from '../../../../static/img/logo.png';
import './index.less'


class PersonalArticle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="personalArticle-container">
                <Row>
                    <Col span={6}>
                        <Card
                            style={{ width: 240 }}
                        >
                            <img alt="example" src={personImg} />
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