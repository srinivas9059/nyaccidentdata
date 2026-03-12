function toggleNav() {
    var x = document.querySelector("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

