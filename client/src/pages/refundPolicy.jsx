import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-black shadow-md my-10">
      <h1 className="text-3xl font-bold text-gray-500 mb-4">Refund Policy</h1>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Refund Eligibility:</h2>
        <p>
          Refunds will be considered for users who have experienced technical issues preventing the proper functioning of AI tools. Refunds may also be applicable if there are service interruptions beyond a reasonable timeframe.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Refund Request Process:</h2>
        <p>
          Users must submit a detailed refund request within [X] days of the issue occurrence. The request should include specific information about the problem faced and steps taken to resolve it.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Verification Process:</h2>
        <p>
          The AI Factory team will conduct a thorough investigation to verify the reported issues. Users may be requested to provide additional information or collaborate with the support team during the verification process.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Refund Decision:</h2>
        <p>
          If the reported issues are confirmed and deemed valid, a refund will be processed promptly. Refunds will be issued using the same payment method used for the initial purchase.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Exceptions:</h2>
        <p>
          No refunds will be provided for cases where users have fully utilized the AI tools and no technical issues are reported. Refunds will not be granted for service interruptions due to circumstances beyond The AI Factory's control, such as third-party platform outages.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Communication:</h2>
        <p>
          Users will be kept informed of the refund request status throughout the process. Clear communication will be maintained to ensure users understand the decision and any applicable actions.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl text-white font-semibold mb-2">Policy Changes:</h2>
        <p>
          The AI Factory reserves the right to modify the refund policy. Any changes will be communicated to users in advance.
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
