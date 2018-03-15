import React from 'react'
import './spike.css'
import jsonp from '../util/jsonp.js';

export default class Spike extends React.Component{
	constructor(props){
		super(props)
		this.state={
			hour:'00',
			minutes:'00',
			second:'00',
			stores:[],
			more:''
		}
	}
	formatTime(times=0) {
		times = +times;
		let hour = 0,
			minutes = 0,
			second = 0,
			regTwo = /^\d{2}$/,
			regInteger = /^(\d{1,2})\.?\d*$/;
		if(times/3600 >= 1) {
			hour = times/3600;
			hour = +regInteger.exec(hour.toString())[1] 
			times -= hour*3600; 
			hour = regTwo.test(hour.toString()) ? hour.toString() : `0${hour}`;
		}
		if(times/60 >= 1) {
			minutes = times/60;
			minutes = +regInteger.exec(minutes.toString())[1] 
			times -= minutes*60; 
			minutes = regTwo.test(minutes.toString()) ? minutes.toString() : `0${minutes}`;
		}
		second = times;
		second = regTwo.test(second.toString()) ? second.toString() : `0${second}`;
		return {
			hour: hour,
			minutes: minutes,
			second: second,
		}
	}
	componentDidMount(){

		let getData=() => {
			let promise = new Promise((resolve,reject) => {
				jsonp(this.props.source,"","callback",(data) => {
					if(data.status){
						this.setState({
							stores:data.data,
							more:data.more
						})
						resolve(data.times);
					}else{
						alert(data.msg);
						reject("get data error")
					}
				})
			})
			return promise;
		}

		getData().then((times) => {
			times = +times;
			let timer = window.setInterval(() =>{
				let {hour, minutes, second} = this.formatTime(times--)
				if(times == -1){
					clearInterval(timer);
					timer = null;
				}
				this.setState({
					hour: hour,
					minutes: minutes,
					second: second,
				});
			},1000);
		},(err) => {
			alert(err);
		})
		
	}
	render(){
		let countId=0;
		return (
			<div id="spike">
				<div className="spike_header">
					<div className="header_left">
						<div className="clock_icon"></div>
						<span className="spike_title">掌上时间</span>
						<div className="spike_time">
								<span>{this.state.hour}</span>:
								<span>{this.state.minutes}</span>:
								<span>{this.state.second}</span>
						</div>
					</div>
					<div className="header_right">更多秒杀></div>
				</div>
				<div className="spike_content">
					{
						this.state.stores.map((item) => {
							return <li key={"spike"+ countId++}>
								<a href={item.url}>
											<div>
												<img src={item.icon} alt=""/>
											</div>
											<p>¥{item.sprice}</p>
											<p className="real-price">¥{item.price}</p>
										</a>
							</li>
						})
					}
				</div>
			</div>
		)
	}
}