var Auth = (function() {
	var authenticated = false;

	function checkAuth(){
		fetch('/dev/loggedin', {
			method: 'get',
			credentials: 'same-origin',
		}).then(function(res){
			if(res.status === 200) authenticated = true;
			else authenticated = false;
		});
	}

	function login(){ authenticated = true;}

	function logout(){ authenticated = false; }

	function isAuth(){ return authenticated; }

	return {
		checkAuth: checkAuth,
		isAuth	 : isAuth,
		logout   : logout,
		login    : login,
	}
})();

module.exports = Auth