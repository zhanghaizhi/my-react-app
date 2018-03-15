var http =require('http')//引入http系统
let fs = require('fs')//引入文件系统
var url = require('url');
var util = require('util');

//创建一个服务器
http.createServer(function(req,res){
	var params = url.parse(req.url, true).query;
	var urlpath=req.url.split("?")[0]
	var pathname = url.parse(req.url).pathname;

	var realPath ="resources"+pathname;//所有文件都存在resource里
	fs.exists(realPath,function(exists){//判断文件是否存在
		if(exists){
			fs.readFile(realPath,"binary",function(err,file){//binary表示二进制数据
				res.writeHead(200,{  
                    'Content-Type': 'jpg' //表明传输的数据类型 
                })
                res.write(file,"binary");
                res.end();
			})
		}
	})
let readFileData = () => {
	let promise = new Promise((resolve,reject) => {
		fs.readFile("./resources/database.json", "utf-8", (err, data) => {
			if(err){
				console.log(err)
				reject("read filedata error")
			}else{
				data = JSON.parse(data)
 				resolve(data);
			}
		})
	})
	return promise;
}
let getFileName =(path,fileClass) =>{
	let promise = new Promise((resolve,reject) => {
		fs.readdir(path,(err,files) => {
			if(err){
				console.log(err);
				reject("error")
			}else{
				files = files.map((file) => {
					return "http://localhost:4000/images/"+fileClass+"/"+file;
				})
				resolve(files)
			}
		})
	})
	return promise;
}

let imgNames = [];
let appNames = [];
let spikeNames = [];
let moreNames = [];
let likeNames = [];
readFileData().then((dataBase) => {
	getFileName('./resources/images/swiper',"swiper").then((files) => {
		imgNames = files;
		if(urlpath=='/data/swiper'){
				swiper(req,res);
		}
	},() => {
		console.log(err);
		imgNames = false;
	});
	getFileName("./resources/images/otherapp", "otherapp").then((files) => {
		let obj = dataBase.otherapp;
		appNames = files.map((file, index) => {
			obj[index].icon = file;
			return obj[index];
		});
		if(urlpath=='/data/otherapp'){
			otherapp(req,res);
		}
	},() => {
		console.log(err);
	});

	getFileName("./resources/images/spike", "spike").then((files) => {
		let obj = dataBase.spike.store;
		spikeNames = files.map((file, index) => {
			obj[index].icon = file;		
			return obj[index];
		});
		if(urlpath=='/data/spike'){
			spike(req,res,dataBase);
		}
	},() => {
		console.log(err);
	})

	getFileName('./resources/images/more',"more").then((files) => {
		moreNames = files.map((file, index) => {
				return {
					icon: file,
					url: dataBase.more[index],
				}
			});
		if(urlpath=='/data/more'){
			more(req,res,dataBase);
		}
	},() => {
		console.log(err);
	})
})

let swiper = (req,res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: "",
	}
	if(imgNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = imgNames;
	}else {
		sendData.msg = "error";
	}
	console.log("fiele:"+imgNames);
	let json = JSON.stringify(sendData);
  	res.write(callback + '(' + json + ')');
  	res.end();
}
let otherapp = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}
	
	if(appNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = appNames;
		
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.write(callback + '(' + json + ')');
  	res.end()
};

let spike = (req, res,dataBase) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
		times: "",
		more: "",
	}
	
	if(spikeNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = spikeNames;
		sendData.times = dataBase.spike.times;
		sendData.more = dataBase.spike.more;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.write(callback + '(' + json + ')');
  	res.end()
};
let more = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}
	
	if(moreNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = moreNames;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.write(callback + '(' + json + ')');
  	res.end();
};

}).listen(4000);//监听4000端口

