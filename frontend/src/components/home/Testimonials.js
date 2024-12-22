function AboutUs() {
    const aboutUsData = [
        {
            title: "Hexabot",
            description: `
                Hexabot is an innovative platform powered by artificial intelligence, designed to simplify administrative processes. 
                It helps citizens navigate public services and provides accurate, real-time guidance and information.
            `,
            image: "https://via.placeholder.com/150", // Replace with an image or logo for Hexabot
        },
        {
            title: "Job Search",
            description: `
                Hexabot offers a dedicated job search module, allowing users to discover opportunities tailored to their profiles 
                with advanced filters and personalized suggestions.
            `,
            image: "https://via.placeholder.com/150", // Replace with an image related to job search
        },
        {
            title: "CV & Documents",
            description: `
                With Hexabot, create a professional CV in just a few clicks. We also provide templates and advice 
                for writing cover letters that meet recruiters' expectations.
            `,
            image: "https://via.placeholder.com/150", // Replace with an image for CV
        },
    ];

    return (
        <>
            <div className="grid place-items-center w-full">
                <div className="max-w-6xl px-4 py-24 content-center justify-center">
                    <h1 className="text-3xl text-center font-bold">About Us</h1>
                    <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8">
                        {aboutUsData.map((section, index) => (
                            <div key={index} className="card w-full bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        className="mask w-20 h-20 mask-circle object-cover"
                                        src={section.image}
                                        alt={section.title}
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="text-xl font-bold">{section.title}</h2>
                                    <p className="mt-4 text-gray-700">{section.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
