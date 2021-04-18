var express = require('express');
var cors = require('cors')
var app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:cjy1998@cluster0.1e9fq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = 'psmdb';

const port = 3000;

const Web3 = require('web3');
let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

const fs = require('fs');
let rawdata = fs.readFileSync('contracts.json');

let contracts = JSON.parse(rawdata);

const ownerAccount = "0x7cE6516E7E0f7B4e34C48Dc27a3b024d4991a369";
const key = "f3cdb1019273e15f373bcb334f85d1e4eab40d9cfacec5223060cc4810331b15"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())

app.listen(port)

app.get('/', function (req, res) {
	res.send('hello world');
})

console.log(`app listening on port ${port}`)

////CONTRACTS

var psmuser = new web3.eth.Contract(contracts["psmuser"]["abi"], contracts["psmuser"]["address"]);

////


const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	connectTimeoutMS: 30000,
	keepAlive: 1
});

app.post("/login", function(req,res){

	let userData = {...req.body};

	psmuser.methods.retrieveWallet(userData['email'],userData['password']).call().then( (data) => {

		if(data[1].length > 0){
			res.send({
				address:data[0],
				key:data[1]
			})
		}else{
			res.send(false)
		}

	})

	
})

app.post("/user/:operation", async function( req, res ){
	
	switch(req.params.operation){

		case "create":

			let userData = {...req.body};

			createWallet().then( (wallet) => {
				console.log(wallet)

				let addressPromise = setAddress(wallet.address,userData.email);
				let keyPromise = setPKey(wallet.address,wallet.key);
				let pwdPromise = setPassword(wallet.address,userData.password);
				let levelPromise = setLevel(wallet.address,userData.level);
				let metadataPromise = setMetadata(wallet.address,JSON.stringify(userData.metadata));

				Promise.all([addressPromise,keyPromise,pwdPromise,levelPromise,metadataPromise]).then( data => {

					db_insert('user',userData.metadata).then( function(id){
						res.send({
							message:"done"
						})
					})

					
				})


			}).catch( err => {
				console.log(err)
			})



		break;


	}

})

async function db_insert(path,data){

	return new Promise( async resolve => {
		await client.connect();
		const database = client.db("psmdb");
		const userCollection = database.collection(path);
		const result = await userCollection.insertOne(data);
		await client.close();
		resolve(result.insertedId);
	})
}

async function createWallet(){

	return new Promise( resolve => {

		let account = web3.eth.accounts.create()
		let address = account.address;
		let privateKey = account.privateKey.substr(2);

		resolve({
			"address":address,
			"key":privateKey
		});
	})
}

async function setAddress(address,email){
	return new Promise( resolve => {

		var encodedABI  = psmuser.methods.setAddress(address,email).encodeABI();
		
		var tx = {
			from: ownerAccount,
			to: psmuser.options.address,
			gas: 3000000,
			data: encodedABI,
		};

		web3.eth.accounts.signTransaction(tx, key).then(signed => {
			// web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
			resolve(signed)
		});

	} )
}

async function setPKey(address,key){
	return new Promise( resolve => {

		var encodedABI  = psmuser.methods.setPKey(address,key).encodeABI();
		
		var tx = {
			from: ownerAccount,
			to: psmuser.options.address,
			gas: 3000000,
			data: encodedABI,
		};

		web3.eth.accounts.signTransaction(tx, key).then(signed => {
			// web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
			resolve(signed)
		});

	} )
}

async function setLevel(address,level){
	return new Promise( resolve => {

		var encodedABI  = psmuser.methods.setLevel(address,level).encodeABI();
		
		var tx = {
			from: ownerAccount,
			to: psmuser.options.address,
			gas: 3000000,
			data: encodedABI,
		};

		web3.eth.accounts.signTransaction(tx, key).then(signed => {
			// web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
			resolve(signed)
		});

	} )
}

async function setPassword(address,pwd){
	return new Promise( resolve => {

		var encodedABI  = psmuser.methods.setPassword(address,pwd).encodeABI();
		
		var tx = {
			from: ownerAccount,
			to: psmuser.options.address,
			gas: 3000000,
			data: encodedABI,
		};

		web3.eth.accounts.signTransaction(tx, key).then(signed => {
			// web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
			resolve(signed)
		});

	} )
}

async function setMetadata(address,metadata){
	return new Promise( resolve => {

		var encodedABI  = psmuser.methods.setMetadata(address,metadata).encodeABI();
		
		var tx = {
			from: ownerAccount,
			to: psmuser.options.address,
			gas: 3000000,
			data: encodedABI,
		};

		web3.eth.accounts.signTransaction(tx, key).then(signed => {
			// web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
			resolve(signed)
		});

	} )
}