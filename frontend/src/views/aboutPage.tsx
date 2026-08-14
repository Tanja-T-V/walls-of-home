import '../style/AboutPage.scss';

function AboutPage() {
    return (
        <div>
            <div className="aboutHeader p-3 mb-3 d-flex flex-column align-items-center text-center">
                <h1 className="about-header-text fs-1 fw-light mb-2 w-100">
                    About Walls of Home
                </h1>
            </div>

            <div className="about-text-box mt-4 mb-5 mx-auto px-3">
                <div className="mb-4">
                    <p className="fw-bold fs-5">
                        More than a property. A place to belong.
                    </p>

                    <p>
                        At <b>Walls of Home</b>, we believe that a home is about
                        much more than what surrounds you. It is the mornings,
                        the gatherings, the quiet moments, and everything that
                        happens between four walls.
                    </p>
                    <p>
                        We are a Nordic real estate company bringing together
                        homes and properties with something to say. From
                        contemporary city apartments and carefully designed
                        modern homes to historic houses, countryside farms, and
                        distinctive estates, our collection reflects the many
                        ways people choose to live.
                    </p>
                </div>

                <div className="mb-4">
                    <p className="fw-bold fs-5">
                        A more personal way of finding home
                    </p>
                    <p>
                        Buying or selling a property is a significant decision.
                        We believe the experience should feel just as considered
                        as the home itself.
                    </p>
                    <p>
                        Our team combines local knowledge, real estate
                        expertise, and a genuine commitment to personal service.
                        We listen carefully, communicate openly, and stay close
                        throughout the journey — from the first conversation to
                        the moment you receive the keys.
                    </p>
                </div>

                <div className="mb-4">
                    <p className="fw-bold fs-5">Homes for different lives</p>
                    <p>
                        We don't believe there is one definition of the perfect
                        home.
                    </p>
                    <p>
                        For some, it is a small apartment close to everything.
                        For others, it is a family house with room to grow, a
                        farm surrounded by nature, or a one-of-a-kind property
                        with a story of its own.
                    </p>
                    <p>
                        That is why our selection ranges from accessible homes
                        to exceptional properties. Different places, different
                        prices, different dreams — all with the same level of
                        care.
                    </p>
                </div>

                <div className="mb-4">
                    <p className="fw-bold fs-5">Rooted in the Nordics</p>
                    <p>
                        Our approach is inspired by the Nordic way of living:
                        thoughtful, honest, understated, and close to nature.
                    </p>
                    <p>
                        We value good design, lasting quality, and the details
                        that make a place feel right. But above all, we value
                        people.
                    </p>
                    <p>
                        Because at the end of the day, we aren't simply selling
                        walls.
                    </p>
                </div>
                <div className="mb-4">
                    <p className="fw-bold fs-5">
                        We're helping people find home.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
