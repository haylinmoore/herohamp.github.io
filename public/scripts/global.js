let themes = [["#5092A2", "#B7CBCB"], ["#EB5B03", "#C86A06"], ["#865C84", "#F092AA"], ["#ee9ca7", "#ffdde1"], ["#0F2027", "#2C5364"]];
//let theme = localStorage.getItem("theme") || Math.floor(new Date() / 2.16e7) % themes.length;
let theme = 0;

let currentTheme = [];

function displayTheme() {
	if (localStorage.getItem("darkmode") == "true") {
		currentTheme[0] = "#4183C4";
		currentTheme[1] = "#1e4163";
		currentTheme[2] = "#f5f5f5";
		currentTheme[3] = "#1E232B";
	} else {
		currentTheme[0] = themes[theme][0];
		currentTheme[1] = themes[theme][1];
		currentTheme[2] = "#444444";
		currentTheme[3] = "#ffffff";
	}

	document.body.style.setProperty("--accent", currentTheme[0]);
	document.body.style.setProperty("--fadeout", currentTheme[1]);
	document.body.style.setProperty("--text", currentTheme[2]);
	document.body.style.setProperty("--background", currentTheme[3]);
}

document.addEventListener("DOMContentLoaded", function(event) {
	displayTheme();

	document.getElementById("toggleDark").addEventListener("click", function(e) {
		localStorage.setItem("darkmode", !(localStorage.getItem("darkmode") == "true"));
		displayTheme();
		e.preventDefault();
	});
});
