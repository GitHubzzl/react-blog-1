
import React, {Component} from 'react';
// import CodeMirror from 'COMPONENTS/CodeMirror';
import { Input } from 'antd';
import  ReactMarkdown from 'react-markdown';
import CodeBlock from "COMPONENTS/CodeBlock"
const { TextArea } = Input;
class EditorMarkdown extends Component {
	constructor (props) {
		super(props)
		this.state = {
			content:''
		}
	}
	componentDidMount () {
	}
	componentWillReceiveProps (nextProps) {
        this.setState({
            article:nextProps.article,
            content:nextProps.content
        })
		// this.props.article.id !== nextProps.article.id && this.setState({
		// 	article:nextProps.article,
		// 	content:nextProps.content
		// })
	}
	updateCode(e) {
		this.setState({
			content: e.target.value,
		});
		this.props.onChangeContent(e.target.value)
	}
	checkTab (e) {
		if (e.keyCode == 9) {
			e.preventDefault();
			this.setState({
				content:this.state.content + ''
			})
		}
	}
    render() {
		return <div>
				<div style={{"height":"100vh","width":"50%",float:"left"}}>
				    {/* <CodeMirror value={this.state.value}  onChange={this.updateCode.bind(this)}/> */}
                    <TextArea
                        style={{width:"100%",height:"100%",padding:"40px 40px",fontSize:"16px"}}
                        value={this.state.content}
                        onChange={this.updateCode.bind(this)}
                        onKeyDown={this.checkTab.bind(this)}>
                    </TextArea>
				</div>
				<ReactMarkdown
                    className="result"
                    source={this.state.content}
                    renderers={{code: CodeBlock}}
				/>
	        </div>
    }
}


export default EditorMarkdown;