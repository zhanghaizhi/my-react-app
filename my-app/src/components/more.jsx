import React from 'react'
import jsonp from '../util/jsonp.js'
import './more.css'
import { Carousel } from 'antd';
export default class More extends React.Component{
	constructor(props){
		super(props)
		this.state={
			more1:[],
			more2:[],
			more3:[]
		}
	}
	componentDidMount(){
		jsonp(this.props.source,"","callback",(data) => {
			if(data.status){
				this.setState({
					more1:data.data.slice(0,3),
					more2:data.data.slice(3,5),
					more3:data.data.slice(5,7)
				})
			}else{
				alert(data.msg)
			}
		})
	}
	render(){
		let countId=0;
		return (
			<div id="more">
				<div className="more_top">
				{
					this.state.more1.map((item) => {
						return <div className="more_link" key={"more" + countId++}>
										<a href={item.url}>
											<img src={item.icon} alt=""/>
										</a>
									</div>
					})
				}
				</div>
				<div className="more_middle">
					{
						this.state.more2.map((item) => {
							return <div className="more_style" key={"more" + countId++}>
										<a href={item.url}>
											<img src={item.icon} alt=""/>
										</a>
									</div>
						})
					}
				</div>
				<div className="more_bottom">
					<Carousel autoplay>
						{
								this.state.more3.map((item) => {
									return  <div className="swiper-slide" key={"more" + countId++}>
												<a href={item.url}>
													<img src={item.icon} alt=""/>
												</a>
											</div>
								})
							}
					</Carousel>
				</div>
			</div>
		)
	}
}