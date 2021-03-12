window.addEventListener('scroll', function (e) {
    if (window.pageYOffset > document.querySelector('#section-cover').offsetHeight - 70) {
        document.body.setAttribute('data-navbar-solid-bgcolor', 'true');
    } else {
        document.body.setAttribute('data-navbar-solid-bgcolor', 'false');
    }
})
