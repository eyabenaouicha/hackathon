import Link from "next/link";

function Hero() {
    return (
        <div className="hero py-12 bg-gradient-to-t from-blue-500 to-purple-700">
            <div className="hero-content md:px-0 px-4 max-w-6xl flex-col lg:flex-row-reverse">
                <img 
                    src="job.png" 
                    className="max-w-sm h-80 object-cover rounded-lg shadow-2xl" 
                    alt="Hexabot illustration" 
                />
                <div>
                    <h1 className="text-5xl text-slate-100 font-bold md:leading-none leading-tight md:mt-0 mt-10">
                        Simplify Your Tasks <span className="md:block mt-4">with JobSphere</span>
                    </h1>
                    <p className="py-2 text-xl text-slate-100 mt-4 pr-12">
                        Your AI-powered assistant for public services in Tunisia. 
                        Get detailed instructions and tailored recommendations in minutes.
                    </p>
                    
                </div>
            </div>
        </div>
    );
}

export default Hero;
