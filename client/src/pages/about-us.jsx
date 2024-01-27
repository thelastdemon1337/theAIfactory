import React, { useState, useEffect } from "react";

import "../styles/about-us.scss";
const AboutUs = () => {
  const [animationPaused, setAnimationPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position and update the animationPaused state
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setAnimationPaused(true);
      } else {
        setAnimationPaused(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="body-new">
      <div className={`container ${animationPaused ? "paused" : ""}`}>
        <main className="main1 z-0">
          <header>
            <h1 class="subheader">About Us</h1>
            <h3>Introduction</h3>
            <p className="text-xl">
              We are a team of AI enthusiasts who are passionate about bringing
              the latest AI innovations to businesses and individuals. Our
              company was founded in 2023 by <strong>Harsha Vanukuri</strong>{" "}
              with the mission of democratizing AI and making it easily
              accessible through an on-demand, pay-per-prompt service model.
            </p>
          </header>

          <img
            src="https://images.unsplash.com/photo-1558459654-c430be5b0a44?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=960&h=500"
            alt=""
          />

          <section>
            <h3>Service Overview:</h3>
            <p className="text-xl">
              We offer access to cutting-edge AI tools such as chatbots, text
              and image generators, voice assistants, predictive analytics and
              more through easy-to-use prompts. Customers can simply describe
              what they need in a prompt and our AI models will generate
              customized solutions for them. Whether you need to create content,
              analyze data, automate tasks or build virtual assistants, our AI
              has you covered.
            </p>
          </section>

          <section>
            <h3>Expertise and Technology:</h3>
            <p className="text-xl">
              Our team combines expertise in machine learning, natural language
              processing, computer vision and cloud computing to continuously
              train, optimize and deploy the latest AI models. We source our
              data responsibly and have strict governance models in place to
              ensure our AI solutions are ethical, unbiased and secure.
            </p>
          </section>

          <section>
            <h3>Flexible Plans:</h3>
            <p className="text-xl">
              As a pay-per-prompt service, we aim to make AI accessible for
              everyone ranging from startups and small businesses to enterprises
              and individual developers. Our subscription plans and
              pay-as-you-go credits allow you to use only the AI capabilities
              you need.
            </p>
          </section>
          <section>
            <h2>Our Vision</h2>
            <p className="text-xl">
              Our vision is to be the go-to AI assistant for getting things
              done. We want to assist humans, not replace them. If you have an
              idea and need help executing it, our AI is here to partner with
              you every step of the way. Get started today and let your prompt
              be the limit!"
            </p>
          </section>
          {/* <div class="callout">
            <h3>Get animating!</h3>
            <p className="text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequatur magni dolores iusto nulla vitae, reiciendis amet
              veritatis aliquam iste temporibus itaque aliquid, eveniet saepe
              reprehenderit distinctio eaque libero, culpa tenetur.
            </p>
          </div> */}

          {/* <img
            src="https://images.unsplash.com/photo-1603791445824-0050bd436b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=960"
            alt=""
          /> */}
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
