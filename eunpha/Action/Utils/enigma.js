var crypto = require('crypto'); // 이건 nodejs 에서 지원해 주는거임. 그냥 가져다 쓰는거, 안 뜯어 봐서 나도 모름 ㅋ.ㅋ
// Kryptos - 암호의 어원, 그리스 어로 "비밀" 이란 뜻 로 쓸려고 했으나 -ㅅ- 사용중...
// Enigma - 에니그마 독일군이 2차 때 쓰던 암호화 체계를 지칭

// Enigma.js 청년 여호수아 공동체 비밀번호 암호화 모듈
var randomKey = function(){
	var characterSet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ=-"
	var keyLength = Math.floor(Math.random()*9) + 1;
	var key = "";
	for(var i = 0 ; i < keyLength ; i++){
		var randomNum = Math.floor(Math.random()*characterSet.length);
		key += characterSet.charAt(randomNum);
	}
	console.log("========암호화========");
	console.log("key :: " + key);
	console.log("keyLength :: " + keyLength);
	return {
		keyLength : keyLength,
		key : key
	};
}
var make = function(value){
	var keySet = randomKey();
	var cipher = crypto.createCipher('aes192', keySet.key);
	cipher.update(value, 'utf8', 'base64');
	return keySet.key + cipher.final('base64') + keySet.keyLength;
}

// var enigma = function(){
// }
// 복호화
var get = function(value){
	var valLength = Number(value.length);
	var keyLength = value.substr(valLength-1, valLength);
	var key = value.substr(0, Number(keyLength));

	value = value.substr(keyLength, valLength);
	value = value.substr(0, value.length-1);
	console.log("========복호화========");
	console.log("value :: " + value);

	var decipher = crypto.createDecipher('aes192', key);
	decipher.update(value, 'base64', 'utf8');
	return decipher.final('utf8');
}

exports.make = make;
exports.get = get;