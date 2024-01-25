import React from "react";

const CookiePolicy = () => {
  return (
    <div>
      <div class="bg-black mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class=" text-gray-300 mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-4">Cookie Policy</h1>
          <span class="text-lg font-semibold my-2">
            Last updated January 06, 2024
          </span>
          <p class="my-4">
            This Cookie Policy explains how rk solutions ("Company," "we," "us,"
            and "our") uses cookies and similar technologies to recognize you
            when you visit our website at{" "}
            <a href="https://www.futurepedia.io">https://www.futurepedia.io </a>
            ("Website"). It explains what these technologies are and why we use
            them, as well as your rights to control our use of them.
          </p>
          <p class="my-4">
            In some cases we may use cookies to collect personal information, or
            that becomes personal information if we combine it with other
            information.
          </p>

          <h2 class="text-2xl  my-8  font-bold mb-2">What are cookies? </h2>
          <p class="my-4">
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners in order to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>
          <p class="my-4">
            Cookies set by the website owner (in this case, rk solutions) are
            called "first-party cookies." Cookies set by parties other than the
            website owner are called "third-party cookies." Third-party cookies
            enable third-party features or functionality to be provided on or
            through the website (e.g., advertising, interactive content, and
            analytics). The parties that set these third-party cookies can
            recognize your computer both when it visits the website in question
            and also when it visits certain other websites.
          </p>
          <h2 class="text-2xl font-bold  my-8  mb-2">Why do we use cookies?</h2>
          <p class="my-4">
            We use first- and third- party cookies for several reasons. Some
            cookies are required for technical reasons in order for our Website
            to operate, and we refer to these as "essential" or "strictly
            necessary" cookies. Other cookies also enable us to track and target
            the interests of our users to enhance the experience on our Online
            Properties. Third parties serve cookies through our Website for
            advertising, analytics, and other purposes. This is described in
            more detail below.{" "}
          </p>
          <h2 class="text-2xl font-bold  my-8  mb-2">
            How can I control cookies?
          </h2>
          <p class="my-4">
            You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie rights by setting your preferences in
            the Cookie Consent Manager. The Cookie Consent Manager allows you to
            select which categories of cookies you accept or reject. Essential
            cookies cannot be rejected as they are strictly necessary to provide
            you with services.
          </p>
          <p class="my-4">
            The Cookie Consent Manager can be found in the notification banner
            and on our website. If you choose to reject cookies, you may still
            use our website though your access to some functionality and areas
            of our website may be restricted. You may also set or amend your web
            browser controls to accept or refuse cookies.{" "}
          </p>
          <p class="my-4">
            The specific types of first- and third-party cookies served through
            our Website and the purposes they perform are described in the table
            below (please note that the specific cookies served may vary
            depending on the specific Online Properties you visit):{" "}
          </p>

          <p className="body_text">Essential website cookies:</p>
          <p className="body_text">
            These cookies are strictly necessary to provide you with services
            available through our Website and to use some of its features, such
            as access to secure areas.
          </p>

          <CookieDetails
            name="yt.innertube::requests"
            purpose="Stores a list of YouTube requests made by the user"
            provider=" www.youtube-nocookie.com"
            service="https://policies.google.com/privacy"
            country="United States"
            type="html_local_storage"
            expires="persistent"
          />
          <CookieDetails
            name="yt-remote-device-id"
            purpose="Stores a unique ID for the user's device for YouTube"
            provider=" www.youtube-nocookie.com"
            service="https://policies.google.com/privacy"
            country="United States"
            type="html_local_storage"
            expires="persistent"
          />
          <CookieDetails
            name="ytidb::LAST_RESULT_ENTRY_KEY"
            purpose="Stores the last result entry key used by YouTube"
            provider="www.youtube-nocookie.com"
            service="https://policies.google.com/privacy"
            country="United States"
            type="html_local_storage"
            expires="persistent"
          />

          <CookieDetails
            name="yt.innertube::nextId"
            purpose="Stores a list of YouTube requests made by the user"
            provider="www.youtube-nocookie.com"
            service="https://policies.google.com/privacy"
            country="United States"
            type="html_local_storage"
            expires="persistent"
          />

          <CookieDetails
            name="yt-remote-connected-devices"
            purpose="Stores a list of connected devices for YouTube"
            provider="www.youtube-nocookie.com"
            service="https://policies.google.com/privacy"
            country="United States"
            type="html_local_storage"
            expires="persistent"
          />

          <h2 class="text-2xl  my-8  font-bold mb-2">
            Analytics and customization cookies:
          </h2>
          <p className="body_text">
            These cookies collect information that is used either in aggregate
            form to help us understand how our Website is being used or how
            effective our marketing campaigns are, or to help us customize our
            Website for you.
          </p>
          <CookieDetails
            name="_ga#"
            purpose="Used to distinguish individual users by means of designation of a randomly generated number as a client identifier, which allows calculation of visits and sessions"
            provider=".futurepedia.io"
            service="https://policies.google.com/privacy"
            country="United States"
            type="http_cookie"
            expires="1 year 1 month 4 days"
          />

          <CookieDetails
            name="hssrc"
            purpose="Whenever HubSpot changes the session cookie, this cookie is also set to determine if the visitor has restarted their browser."
            provider="www.futurepedia.io"
            service="https://legal.hubspot.com/privacy-policy"
            country="United States"
            type="http_cookie"
            expires="session"
          />

          <CookieDetails
            name="hstc"
            purpose="The main cookie for tracking visitors."
            provider="www.futurepedia.io"
            service="https://legal.hubspot.com/privacy-policy"
            country="United States"
            type="http_cookie"
            expires="5 months 27 days"
          />

          <CookieDetails
            name="hubspotutk"
            purpose="This cookie keeps track of a visitor's identity. It is passed to HubSpot on form submission and used when deduplicating contacts."
            provider="www.futurepedia.io"
            service="https://legal.hubspot.com/privacy-policy"
            country="United States"
            type="http_cookie"
            expires="5 months 27 days"
          />

          <CookieDetails
            name="hssc"
            purpose="This cookie keeps track of sessions."
            provider="www.futurepedia.io"
            service="https://legal.hubspot.com/privacy-policy"
            country="United States"
            type="http_cookie"
            expires="29 minutes"
          />

          <CookieDetails
            name="NID"
            purpose="Set by Google to set a unique user ID to remember user preferences. Persistent cookie that stays for 182 days"
            provider=".google.com"
            service="https://policies.google.com/privacy"
            country="United States"
            type="server_cookie"
            expires="6 months"
          />

          <CookieDetails
            name="_ga"
            purpose="Records a particular ID used to come up with data about website usage by the user"
            provider=".futurepedia.io"
            service="https://policies.google.com/privacy"
            country="United States"
            type="http_cookie"
            expires="1 year 1 month 4 days"
          />

          <CookieDetails
            name="ptq.gif"
            purpose="Records anonymous page view data"
            provider="track.hubspot.com"
            service="https://legal.hubspot.com/privacy-policy"
            country="United States"
            type="pixel_tracker"
            expires="session"
          />
          <h2 class="text-2xl font-bold  my-8  mb-2">Unclassified cookies: </h2>
          <p className="body_text">
            These are cookies that have not yet been categorized. We are in the
            process of classifying these cookies with the help of their
            providers
          </p>
          <CookieDetails
            name="popupShown"
            purpose="___"
            provider="www.futurepedia.io"
            service="____"
            country="United States"
            type="html_session_storage"
            expires="session"
          />

          <CookieDetails
            name="cf_clearance"
            purpose="___"
            provider=".beehiiv.com"
            service="___"
            country="United States"
            type="http_cookie"
            expires="11 months 30 days"
          />

          <CookieDetails
            name="cfuvid"
            purpose="___"
            provider=".hubspot.com"
            service="____"
            country="United States"
            type="server_cookie"
            expires="session"
          />
          <h2 class="text-2xl font-bold  my-8  mb-2">
            How can I control cookies on my browser?
          </h2>
          <p className="body_text">
            As the means by which you can refuse cookies through your web
            browser controls vary from browser to browser, you should visit your
            browser's help menu for more information. The following is
            information about how to manage cookies on the most popular
            browsers:{" "}
          </p>
          <ul className="list-disc pl-8 mt-4">
            <li className="body_text  mb-2">
              <a href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies">
                Chrome
              </a>{" "}
            </li>
            <li className="body_text  mb-2">
              <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
                Internet Explorer
              </a>{" "}
            </li>
            <li className="body_text  mb-2">
              <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US">
                Firefox
              </a>{" "}
            </li>
            <li className="body_text  mb-2">
              <a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac">
                Safari
              </a>{" "}
            </li>
            <li className="body_text  mb-2">
              <a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">
                Edge{" "}
              </a>
            </li>
            <li className="body_text  mb-2">
              <a href="https://help.opera.com/en/latest/web-preferences/">
                Opera{" "}
              </a>
            </li>
          </ul>
          <p className="body_text">
            In addition, most advertising networks offer you a way to opt out of
            targeted advertising. If you would like to find out more
            information, please visit:
          </p>
          <ul className="list-disc pl-8 mt-4">
            <li className="body_text  mb-2">
              <a href="http://www.aboutads.info/choices/">
                Digital Advertising Alliance
              </a>{" "}
            </li>
            <li className="body_text  mb-2">
              <a href="https://youradchoices.ca/">
                Digital Advertising Alliance of Canada
              </a>{" "}
            </li>
            <li className="body_text  mb-2">
              <a href="http://www.youronlinechoices.com/">
                European Interactive Digital Advertising Alliance
              </a>{" "}
            </li>
          </ul>
          <h2 class="text-2xl font-bold my-8 mb-2">
            What about other tracking technologies, like web beacons?
          </h2>
          <p className="body_text">
            Cookies are not the only way to recognize or track visitors to a
            website. We may use other, similar technologies from time to time,
            like web beacons (sometimes called "tracking pixels" or "clear
            gifs"). These are tiny graphics files that contain a unique
            identifier that enables us to recognize when someone has visited our
            Website or opened an email including them. This allows us, for
            example, to monitor the traffic patterns of users from one page
            within a website to another, to deliver or communicate with cookies,
            to understand whether you have come to the website from an online
            advertisement displayed on a third-party website, to improve site
            performance, and to measure the success of email marketing
            campaigns. In many instances, these technologies are reliant on
            cookies to function properly, and so declining cookies will impair
            their functioning.
          </p>
          <h2 class="text-2xl font-bold my-8 mb-2">
            Do you use Flash cookies or Local Shared Objects?{" "}
          </h2>
          <p className="body_text">
            Websites may also use so-called "Flash Cookies" (also known as Local
            Shared Objects or "LSOs") to, among other things, collect and store
            information about your use of our services, fraud prevention, and
            for other site operations. If you do not want Flash Cookies stored
            on your computer, you can adjust the settings of your Flash player
            to block Flash Cookies storage using the tools contained in the
          </p>
        </div>
      </div>
    </div>
  );
};

const CookieDetails = ({
  name,
  purpose,
  provider,
  service,
  country,
  type,
  expires,
}) => {
  return (
    <div className="border m-3 my-8 px-8 py-2">
      <div> Name: {name}</div>
      <div> Purpose: {purpose}</div>
      <div> Provider: {provider}</div>
      <div>
        {" "}
        Service: {service}{" "}
        <a href={service} target="_blank" rel="noopener noreferrer">
          View Service Privacy Policy
        </a>
      </div>
      <div> Country: {country}</div>
      <div> Type: {type}</div>
      <div> Expires in: {expires}</div>
    </div>
  );
};

export default CookiePolicy;
