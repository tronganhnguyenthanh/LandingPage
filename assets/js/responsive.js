(function () {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    document.addEventListener("DOMContentLoaded", () => {
        // set left '.post-body__main__actions'
        // if ($(".post-body__container"))
        //     $(".post-body__main__actions").style.left =
        //         $(".post-body__container").offsetLeft - 40 + "px";
        menuMobile();
        handleSlide();
        showActionPost();
        scrollDown();
    });

    // Navigation mobile
    function menuMobile() {
        const openBtn = $(".nav-open");
        const closeBtn = $(".nav-close");
        const header = $(".header");

        openBtn.onclick = () => {
            header.classList.add("open-menu");
        };
        closeBtn.onclick = () => {
            header.classList.remove("open-menu");
        };
        window.onclick = (e) => {
            if (!openBtn.contains(e.target) && !e.target.closest(".header")) {
                header.classList.remove("open-menu");
            }
        };
    }

    // Slide in home page
    function handleSlide() {
        const nextBtn = $(".blog__btns-right");
        const prevBtn = $(".blog__btns-left");
        const blogItems = $$(".blog__item");
        const blogDots = $$(".blog__dot");

        let index = 0;
        const showSlide = (index) => {
            $(".blog__item.active").classList.remove("active");
            blogItems[index].classList.add("active");
            $(".blog__dot.active").classList.remove("active");
            blogDots[index].classList.add("active");
        };

        if (nextBtn) {
            nextBtn.onclick = () => {
                index++;
                index === blogItems.length ? (index = 0) : index;
                showSlide(index);
            };
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                index--;
                index < 0 ? (index = blogItems.length - 1) : index;
                showSlide(index);
            };
        }

        blogDots.forEach((dot, index) => {
            dot.onclick = () => {
                showSlide(index);
            };
        });
    }

    // Scroll show action in post page
    function showActionPost() {
        window.addEventListener("scroll", () => {
            const postAction = $(".post-body__main__actions");
            const postOffset = $(".post-body__main");
            if (!postOffset) return;

            const postOffsetTop = postOffset.offsetTop;
            const postOffsetHeight = postOffset.offsetHeight;

            if (window.pageYOffset > postOffsetTop + postOffsetHeight) {
                postAction.classList.remove("sticky");
            } else if (window.pageYOffset > postOffsetTop) {
                postAction.classList.add("sticky");
            } else {
                postAction.classList.remove("sticky");
            }
        });
    }

    // Button Scroll down
    function scrollDown() {
        const scrollDownBtn = $(".scroll-down");
        if (!scrollDownBtn || scrollDownBtn === null) {
            return;
        }
        const sections = $$("section");
        // first click when don't scroll
        scrollDownBtn.onclick = () => {
            sections[1].scrollIntoView({ behavior: "smooth" });
        };
        // click when scroll
        window.addEventListener("scroll", () => {
            sections.forEach((section, index) => {
                if (
                    window.pageYOffset >= section.offsetTop - 10 &&
                    window.pageYOffset <
                    section.offsetHeight + section.offsetTop
                ) {
                    scrollDownBtn.onclick = () => {
                        if (index + 1 < sections.length) {
                            sections[index + 1].scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    };
                }
            });
            // hide btn in last section
            if (window.pageYOffset > sections[sections.length - 1].offsetTop) {
                scrollDownBtn.style.bottom = "-80px";
            } else {
                scrollDownBtn.style.bottom = "20px";
            }
        });
    }
})();
$(document).ready(function () {
    // Function to check and display the screen width
    function checkScreenWidth() {
        var screenWidth = $(window).width();

        // Check if the screen width is less than 768px
        if (screenWidth < 768) {
            
            console.log("Screen width is less than 768px (mobile view).");
        } else {
            if ($('header').hasClass('open-menu')) {
                // If it does, remove the class 'active'
                $('header').removeClass('open-menu');
                console.log("Class 'active' removed from header.");
            } else {
                console.log("Header does not have the class 'active'.");
            }
            console.log("Screen width is 768px or more (desktop/tablet view).");
        }
    }

    // Run the function on page load
    checkScreenWidth();

    // Attach the resize event handler to check width on resize
    $(window).resize(function () {
        checkScreenWidth();
    });
});