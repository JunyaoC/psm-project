import Web3 from "web3";
import { contracts } from './contracts.js'

let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

let psmuser = new web3.eth.Contract(contracts["psmuser"]["abi"], contracts["psmuser"]["address"]);

let blockchain = {
	web3:web3,
	account:'',
	key:'',
	contracts:{
		"psmuser":psmuser
	}
}



export default blockchain