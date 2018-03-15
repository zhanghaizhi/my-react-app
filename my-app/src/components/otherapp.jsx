
import React from 'react'
import './otherapp.css'
import jsonp from '../util/jsonp.js';

export default class Otherapp extends React.Component{
	constructor(props){
		super(props)
		this.state={
			imgurls:[]
		}
	}
	componentDidMount(){
		jsonp(this.props.source,"","callback",(data) => {
			if(data.status){
				this.setState({
					imgurls:data.data
				})

				var gg=this.state.imgurls.map((item) => {
						return <li >
							<a href = {item.url}> 
								<div className="app_icon"><img src={item.icon}/></div>
								<span>{item.title}</span>
							</a>
						</li>
					})
				console.log(gg);
			}
		})
	}
	render(){
		let countId=0;
		return (
			<div className="oapp">
				{
					this.state.imgurls.map((item) => {
						return <li key={ "otherapp" + countId++ }>
							<a href = {item.url}> 
								<div className="app_icon"><img src={item.icon}/></div>
								<span>{item.title}</span>
							</a>
						</li>
					})
				}
			</div>
		);
	}
}
