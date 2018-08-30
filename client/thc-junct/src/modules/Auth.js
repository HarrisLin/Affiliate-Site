var Auth = (function() {
	var authenticated = JSON.parse(localStorage.getItem('authenticated')) || false;

	function checkAuth(){
		fetch('/dev/loggedin', {
			method: 'get',
			credentials: 'same-origin',
		}).then(function(res){
			if(res.status === 200) {
				authenticated = true;
				localStorage.setItem('authenticated', JSON.stringify(true));
			} else {
				authenticated = false;
				localStorage.setItem('authenticated', JSON.stringify(false));
			}
		});
	}

	function logout(){
		authenticated = false;
		localStorage.setItem('authenticated', JSON.stringify(false));
	}

	function isAuth(){ return authenticated; }

	return {
		checkAuth: checkAuth,
		isAuth	 : isAuth,
		logout   : logout,
	}
})();

module.exports = Auth