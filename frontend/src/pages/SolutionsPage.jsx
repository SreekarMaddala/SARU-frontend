import React from "react";
import Header from "../components/Header";

const SaruSolutions = () => {
    return (
        <div id="webcrumbs">
            <Header />
            <div className="min-h-screen bg-gray-900 text-teal-400">

                {/* Hero Section */}
                <section className="text-center py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Our Solutions</h2>
                    <p className="text-teal-400/80 max-w-2xl mx-auto text-lg">
                        Explore the services we provide to empower your business and streamline your workflows.
                    </p>
                    <div className="mt-8">
                        <button className="bg-teal-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-teal-400 transform hover:scale-105 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </section>

                {/* Solutions Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-16 max-w-7xl mx-auto">
                    {[
                        { icon: "analytics", title: "Analytics", desc: "Powerful insights into your business." },
                        { icon: "landscape", title: "Automation", desc: "Automate repetitive tasks efficiently." },
                        { icon: "groups", title: "Collaboration", desc: "Seamless team communication." },
                        { icon: "security", title: "Security", desc: "Top-notch data protection." }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800/80 p-6 rounded-xl border border-teal-400/20 shadow-lg hover:shadow-teal-400/10 transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <div className="bg-teal-400/10 p-3 rounded-full inline-block mb-4 group-hover:bg-teal-400/20 transition-all duration-300">
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-teal-400/70">{item.desc}</p>
                            <div className="mt-4 pt-4 border-t border-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href="#" className="text-teal-300 flex items-center text-sm">
                                    Learn more <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Call to Action */}
                <section className="bg-gray-800 py-12 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to transform your business?</h3>
                        <p className="mb-8 text-teal-400/80">
                            Join thousands of companies already using SARU Solutions to optimize their workflows.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button className="bg-teal-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-teal-400 transition-colors duration-300">
                                Schedule a Demo
                            </button>
                            <button className="bg-transparent border border-teal-400 text-teal-400 font-bold py-3 px-6 rounded-lg hover:bg-teal-400/10 transition-colors duration-300">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-12 px-4 bg-gray-800">
                    <div className="max-w-6xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-8">What Our Clients Say</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { quote: "SARU Solutions transformed our workflow!", name: "John Doe", company: "Tech Corp" },
                                { quote: "Incredible analytics and support.", name: "Jane Smith", company: "Innovate Ltd" },
                                { quote: "Highly recommend for security.", name: "Bob Johnson", company: "Secure Inc" }
                            ].map((testimonial, idx) => (
                                <div key={idx} className="bg-gray-900 p-6 rounded-xl border border-teal-400/20 hover:border-teal-400/40 transition-colors duration-300">
                                    <p className="text-teal-400/70 mb-4">"{testimonial.quote}"</p>
                                    <p className="text-teal-300 font-semibold">{testimonial.name}</p>
                                    <p className="text-teal-400/50 text-sm">{testimonial.company}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                { q: "What is SARU Solutions?", a: "We provide cutting-edge solutions for business automation, analytics, collaboration, and security." },
                                { q: "How do I get started?", a: "Contact us for a demo or sign up on our website to begin your free trial." },
                                { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial with full access to all features." }
                            ].map((faq, idx) => (
                                <div key={idx} className="bg-gray-800 p-6 rounded-xl border border-teal-400/20 hover:border-teal-400/40 transition-colors duration-300">
                                    <h4 className="text-teal-300 font-semibold mb-2">{faq.q}</h4>
                                    <p className="text-teal-400/70">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-teal-400/70 py-8 px-4 border-t border-teal-400/20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">SARU Solutions</h4>
                            <p className="text-sm">Empowering businesses with cutting-edge solutions since 2015.</p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-teal-400/20 transition-colors">
                                    <span className="material-symbols-outlined">mail</span>
                                </a>
                                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-teal-400/20 transition-colors">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-teal-400/20 transition-colors">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">Solutions</h4>
                            <ul className="space-y-2 text-sm">
                                {["Analytics", "Automation", "Collaboration", "Security"].map((s, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-teal-300 transition-colors">{s}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                {["About Us", "Careers", "Blog", "Contact"].map((c, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-teal-300 transition-colors">{c}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">Stay Updated</h4>
                            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-gray-800 border border-teal-400/30 rounded-l-lg px-4 py-2 focus:outline-none focus:border-teal-400 text-white text-sm w-full"
                                />
                                <button className="bg-teal-500 text-gray-900 rounded-r-lg px-4 hover:bg-teal-400 transition-colors">
                                    <span className="material-symbols-outlined text-sm">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-teal-400/10 text-center text-xs">
                        <p>© 2023 SARU Solutions. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default SaruSolutions;
