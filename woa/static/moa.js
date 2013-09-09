function moaToggleButton(b) {
	if (b.hasClass("btn-default")) {
		b.removeClass("btn-default");
		b.addClass("btn-warning");
		b.data("toggled", true);
    } else {
    	b.addClass("btn-default");
		b.removeClass("btn-warning");
		b.data("toggled", false);
    }
}