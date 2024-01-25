import React, { useState, useEffect } from 'react';

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
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='body-new'>
     <div className={`container ${animationPaused ? 'paused' : ''}`}>
        <main className='main1 z-0'>
          <header>
            <h2 class="subheader">— Keyframers</h2>
            <h1>
              Where we bring imaginative user interfaces <em>to life.</em>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              suscipit ipsam aspernatur quasi reiciendis at eum cupiditate
              officiis repudiandae quae ea facere odit beatae voluptate
              recusandae quas, possimus laborum inventore.
            </p>
          </header>

          <img
            src="https://images.unsplash.com/photo-1558459654-c430be5b0a44?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=960&h=500"
            alt=""
          />

          <section>
            <h2>The Client</h2>
            <p>
              You! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Totam voluptatum quidem eligendi debitis quia dignissimos ipsa
              error, atque quibusdam corrupti soluta facere nulla neque nostrum
              recusandae assumenda, aspernatur in. Provident!
            </p>
          </section>

          <section>
            <h2>Our Mission</h2>
            <p>
              To educate the world in web animation. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Blanditiis ipsa doloremque, natus
              dolorum a perferendis modi veritatis ab earum, culpa nemo, aliquam
              qui! Nostrum iste ullam voluptatem, doloribus odit autem.
            </p>
          </section>
          <div class="callout">
            <h3>Get animating!</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequatur magni dolores iusto nulla vitae, reiciendis amet
              veritatis aliquam iste temporibus itaque aliquid, eveniet saepe
              reprehenderit distinctio eaque libero, culpa tenetur.
            </p>
          </div>

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
