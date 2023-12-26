import React, { useState } from "react";

const Newsletter = ({ data }) => {
  const [newsletterData, setnewNetterData] = useState(data);
  const [expandedPost, setExpandedPost] = useState(null);
  const textLengthAllowed = 100;
  const toggleExpansion = (postTitle) => {
    setExpandedPost(expandedPost === postTitle ? null : postTitle);
  };

  const limitWords = (text, limit) => {
    const cleanedText = text.replace(/\s\s+/g, " ").replace(/\n/g, " ");

    const words = cleanedText.split(" ");
    console.log(words);

    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }

    return cleanedText;
  };

  return (
    <>
      <div className="mx-64 mt-8 justify-center">
        {newsletterData.map((post) => (
          <p
            key={post.title}
            className="flex flex-col items-start w-full bg-white border border-gray-200 rounded-lg shadow mb-4  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <h5 class="text-2xl px-4 py-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
            <div className="flex flex-col justify-between px-4 py-2 leading-normal md:flex-1">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {post.subject}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis">
                {expandedPost === post.title
                  ? post.body
                  : limitWords(post.body, textLengthAllowed)}
                {post.body.length > textLengthAllowed && (
                  <button
                    className="text-red-500 self-end mr-4 mb-4 ml-2"
                    onClick={() => toggleExpansion(post.title)}
                  >
                    {expandedPost === post.title ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
            </div>
          </p>
        ))}
      </div>
    </>
  );
};

export default Newsletter;
