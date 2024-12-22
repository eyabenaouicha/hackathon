import { useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "@/store/modalSlice"

const jobData = [
    { title: "Software Engineer", description: "Develop and maintain software applications, focusing on both front-end and back-end development." },
    { title: "Product Manager", description: "Oversee the development and launch of new products, ensuring alignment with customer needs and business goals." },
    { title: "UI/UX Designer", description: "Design intuitive and visually appealing user interfaces, improving the overall user experience." },
    { title: "Data Scientist", description: "Analyze large datasets to provide actionable insights and develop machine learning models." },
    { title: "DevOps Engineer", description: "Automate and streamline development processes, focusing on continuous integration and deployment pipelines." },
    { title: "Full Stack Developer", description: "Work on both front-end and back-end technologies to build complete web applications." }
]

function PricingPlans() {
    const { isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [toggleActive, setToogleActive] = useState(true)

    const openPaymentPage = async (paymentType) => {
        if (!isLoggedIn) {
            dispatch(openModal({ title: "", size: "lg", bodyType: "SIGN_IN_MODAL", extraObject: { isSignIn: true } }))
            return 1;
        }
        console.log("Handle payment here")
    }

    return (
        <>
            <div className="text-center cursor-pointer text-xl mt-6" onClick={() => setToogleActive(!toggleActive)}>
                <span className="align-top mr-1">Monthly</span>
                <input type="checkbox" className="toggle toggle-primary" checked={toggleActive} />
                <span className="align-top ml-2">Yearly</span>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 mt-2 w-full gap-8">
                {jobData.map((job, index) => (
                    <div key={index} className="card w-full mt-6 bg-base-100 shadow-xl hover:shadow-2xl">
                        <div className="card-body pt-12 pb-16 items-center text-center">
                            <p className="text-sm text-gray-500">Job Title</p>
                            <h2 className="card-title text-xl">{job.title}</h2>

                            <p className="text-sm text-gray-500 mt-4">Description</p>
                            <p className="mt-2 text-lg">{job.description}</p>
                            
                            <Link href='/start-designing' className="w-full">
                                <button className="btn !hover:text-white hover:bg-primary btn-sm mt-8 w-full btn-outline normal-case">Apply Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PricingPlans
