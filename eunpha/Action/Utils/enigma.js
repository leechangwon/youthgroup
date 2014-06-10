// Kryptos - 암호의 어원, 그리스 어로 "비밀" 이란 뜻 로 쓸려고 했으나 -ㅅ- 사용중...
// Enigma - 에니그마 독일군이 2차 때 쓰던 암호화 체계를 지칭
var crypto = requier('crypto'); // 이건 nodejs 에서 지원해 주는거임. 그냥 가져다 쓰는거, 안 뜯어 봐서 나도 모름 ㅋ.ㅋ

// Enigma.js 청년 여호수아 공동체 비밀번호 암호화 모듈
var enigma = function(){
	var randomKey = function(){
		var characterSet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ=-"
		var keyLength = Math.floor(Math.random()*9) + 1;
		var key = "";
		for(var i = 0 ; i < keyLength ; i++){
			var randomNum = Math.floor(Math.random()*characterSet.length);
			key += keyLength[randomNum];
		}
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

	// 복호화
	var get = function(value){
		var keyLength = value.substr(value.length-1, value.length);
		var key = value.substr(0, Number(keyLength));
		value = value.substr(Number(keyLength)+1, value.length-1);
		var decipher = crypto.createDecipher('aes192', key);
		decipher.update(value, 'base64', 'utf8');
		return decipher.final('utf8');
	}

	return {
		make : make,
		get : get
	}
}

exports.enigma = enigma;