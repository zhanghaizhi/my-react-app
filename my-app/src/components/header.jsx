import './header.css'
import React from 'react'
import jsonp from '../util/jsonp.js';
import { Carousel } from 'antd';
export default class Header extends React.Component{
	constructor(props){
		super(props)
		this.state={
			imgUrls:[]
		}
	}
	componentWillUnmount(){
    }
	componentDidMount(){
		jsonp(this.props.source,"","callback",(data) => {
			console.log("data:"+JSON.stringify(data))
			if(data.status){
				this.setState({
					imgUrls:data.data,
				})
					
			}else{
				alert(data.msg)
			}
		})
	}
	render(){
		let countId = 0;
	    return (
	        <div id="header">
	    		 <Carousel autoplay>
				    	{
				    		this.state.imgUrls.map((url) => {
				    			return <div  key={"header" + countId++} >
				    						<img className="img" src={url}  alt={url}/>
				    				   </div>
				    		})
				    	}
				</Carousel>		
			</div>
	    );	
	}
}