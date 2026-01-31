"use client";

export default function Cancellation() {
  return (
    <section className="w-full text-gray-900  lg:py-[40px] py-[30px] lg:px-6 px-3 bg-[#f8f8f8]">
      <div className="max-w-[1320px]  text-[18px] rounded-[15px] mx-auto  bg-white p-10">
        <h2 className="text-[40px] font-bold mb-5">
          Refund and Cancellation Policy
        </h2>
        <div className="my-[25px]">
          <p className="text-[20px] mb-3">
            We handle refunds in the following scenarios:
          </p>
          <ul className="ps-5 space-y-5">
            <li className="list-disc">
              During the online payment through credit/debit card if the payment
              gets debited and the internet goes down due to some external
              server malfunction or any other similar happening.
            </li>
            <li className="list-disc">
              The system fails to generate the required acknowledgment due to
              internet malfunction.
            </li>
            <li className="list-disc">
              The payment gets deducted from the payer&#39;s account and does
              not reach the institute&#39;s account or payment gets debited
              twice due to server error.
            </li>
          </ul>
          <p className="my-[20px]">
            We shall not be responsible in any case until the course fee paid by
            student or parent is credited into the Bank Account of the
            institute. If credited into our account, the refund policy will be
            applicable as per the institute norms.
          </p>
        </div>

        <div className="my-[40px]">
          <h3 className="text-[30px] font-semibold ">Cancellation Policy</h3>
          <p className="text-[18px] my-[10px]">
            If a student wishes to cancel enrollment, they must submit a written
            request within X days of registration. Cancellations after this
            period will not be eligible for a refund.
          </p>
        </div>
      </div>
    </section>
  );
}
