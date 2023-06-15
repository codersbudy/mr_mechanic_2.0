function Carousel() {
    return <>
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <img src="images/bg1.jpg" className="d-block w-100 sliders" alt="..." />
                    <div className="carousel-caption d-none d-md-block ">
                        <h5>Easy Care, Easy life.</h5>
                        <p>" Whenever your precious vehicle has any problems,
                            you always count on an auto mechanic to save the day ".</p>
                        <div className="btn btn-info cbtn">Get Mechanic</div>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src="images/bg2.webp" className="d-block w-100 sliders" alt="..." />
                    <div className="carousel-caption d-none d-md-block text-light ">
                        <h5>Sharing Smile through Car Caring.</h5>
                        <p>" God determines how fast you're going to run; I can help you with the Mr. Mechanics ".</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="images/bg3.jpg" className="d-block w-100 sliders" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Car Mechanic Near Me 24 Hours.</h5>
                        <p>Cars that are well taken care of usually outperform and outlast those that are not, questions like, "Which is the best car mechanic near me?" strikes the head. Don't hesitate to bring it to Mr. Mechanic.</p>

                    </div>

                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
}

export default Carousel;