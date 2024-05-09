import React, { useState } from 'react';

export const UseTerms = () => {

  const [showPopup, setShowPopup] = useState(false);

  const handleTermsClick = () => {
    setShowPopup(true);
  };

  return (
<div>
  <div className="accountterms" onClick={handleTermsClick}>
        Conditions of Use and Privacy Notice
      </div>
      {showPopup && (
        <div className="termspopup-overlay">
          <div className="termspopup">
            <div className="popup-content">
              <div className='termsheader'>
                Terms and conditions<br /><br />
              </div>
              <div className='termsheader'>
                Article 1. Purpose <br />
              </div>
              ①  The terms and conditions of account service refer to the full terms and conditions for "service", including these terms and conditions and separate terms and conditions that may be added later, and are hereinafter referred to as "terms and conditions".<br />
              ② The purpose of the account terms and conditions is to clarify the legal relationship between the company and the member in the use of the PopKorn account (hereinafter referred to as "service") provided through the website by the user (hereinafter referred to as the "use contract" and the user as a "member").<br />
              ③ "Company" posts "Terms and Conditions" and "Personal Information Processing Policy" on the initial screen of "Service" so that "Members" can easily check it.
              <br /><br />
              <div className='termsheader'>
                Article 2. Creating and Using PopKorn Accounts <br />
              </div>
              ① PopKorn account means a login account created by a member in order to use the 'service' provided by the 'company'. If the 'member' agrees to the 'Terms and Conditions' and enters the account information, the 'company' authenticates the schedule information (verify the email address) and then authenticates the subscription.<br />
              ② In order to smoothly use the 'service' provided by the 'company', a PopKorn account is required, and some menus and 'service' can be used without 'member' registration.<br />
              ③ After creating the PopKorn account, you can use the entire PopKorn interlocking service provided by the 'Company'. However, when you first log in to the 'Company's new service, you will be given consent to use it and consent to the terms and conditions of individual service use.
              <br /><br />
              <div className='termsheader'>
              Article 3. Conclusion of Use Contract <br />
              </div>
              ① The 'use contract' is concluded by the person who intends to become a 'member' (hereinafter referred to as the 'subscription applicant') agreeing to the contents of the 'Terms and Conditions' and then applying for membership, and the 'company' approves these applications. The 'subscription applicant' becomes a 'member' from the time the 'use contract' is concluded with the consent of the 'company' and may use the 'service' according to the 'Terms and Conditions'.
              <br />
              ② The "Company" may collect (personal) information such as the e-mail address of the "Applicant" in the process of signing the "Usage Agreement", and in this case, the "Applicant" shall provide accurate (not false) information. The personal information processing policy posted separately applies to the collection, use, and storage of personal information under this paragraph.
              <br />
              ③ If it is not appropriate for the "Company" to accept the "Subscription Applicant"'s application for membership, such as mechanical access to the "Service" system or the misuse of accounts, provision of false information, and confirmation of the "Subscription Applicant's Service Abusing History, etc., the "Company" may withhold or reject the "Subscription Applicant's" application, or terminate the use contract after the fact.
              <br /><br />
              <div className='termsheader'>
              Article 4. Amendment of Terms and Conditions <br />
              </div>
              ① The 'use contract' is concluded by the person who intends to become a 'member' (hereinafter referred to as the 'subscription applicant') agreeing to the contents of the 'Terms and Conditions' and then applying for membership, and the 'company' approves these applications. The 'subscription applicant' becomes a 'member' from the time the 'use contract' is concluded with the consent of the 'company' and may use the 'service' according to the 'Terms and Conditions'.
              <br />
              ② The "Company" may collect (personal) information such as the e-mail address of the "Applicant" in the process of signing the "Usage Agreement", and in this case, the "Applicant" shall provide accurate (not false) information. The personal information processing policy posted separately applies to the collection, use, and storage of personal information under this paragraph.
              <br />
              ③ If it is not appropriate for the "Company" to accept the "Subscription Applicant"'s application for membership, such as mechanical access to the "Service" system or the misuse of accounts, provision of false information, and confirmation of the "Subscription Applicant's Service Abusing History, etc., the "Company" may withhold or reject the "Subscription Applicant's" application, or terminate the use contract after the fact.
              <br /><br />
              <div className='termsheader'>
              Article 5. Change and discontinuation of services<br />
              </div>
              ① The "Company" may change the contents of the "Service" if necessary. However, if the change in the "Service" content has a significant impact on the rights and obligations of the "Members", it shall be changed through the process of public notice and notification under Article 4.
              <br />
              ② "Company" may temporarily suspend the provision of "Service" if there are significant reasons for maintenance inspection, replacement and failure of information and communication facilities, communication interruption or operational reasons.
              <br />
              ③ "Company" may conduct regular inspections if necessary for the provision of "service", and may temporarily suspend the provision of "service" during the regular inspection.
              <br />
              ④ There is "no obligation" for the "Company" to perform the exchange or refund of payments using the words.
              <br /><br />
              <div className='termsheader'>
              Article 6. Publication of Advertisements<br />
              </div>
              'Company' may place an advertisement by 'Company' or a third party in 'Service'.
              <br /><br />
              <div className='termsheader'>
              Article 7. Rights and Duties of Members<br />
              </div>
              ① "Members" can use the content provided to "Members" (hereinafter referred to as "Content") personally and non-profit through "Service" and perform actions allowed by "Company" through "Service" (for example, writing comments, etc.).
              <br />
              ② "Members" do not acquire any rights to "Content" provided through "Services" other than the limited rights set forth in the preceding paragraph.
              <br />
              ③ "Members" shall not engage in any act of using "Content" beyond the scope permitted by this Article as follows, and shall be liable under all civil and criminal law for such act.
              <br />
              1. The act of arbitrarily producing "content" as a separate video file, etc<br />
              2. the act of arbitrarily posting 'content' on the Internet<br />
              3. the act of arbitrarily providing 'content' to a third party<br />
              4. Any copyright infringement of any other 'content'<br />
              ④ "Members" shall not engage in any act of accessing the servers and network systems of "Services" in an unauthorized manner, or any act that interferes with the provision of "Services".
              <br />
              ⑤ 'Members' shall not engage in any of the following acts.
              <br />
              1. Providing false information to the "company" or stealing other people's information<br />
              2. Infringement of intellectual property rights, such as copyrights of "company" and other third parties<br />
              3. Any act that damages the reputation of the "Company" or any other third party or interferes with its business<br />
              4. the act of using 'service' for profit without the consent of the 'company'<br />
              5. Impersonating a "company" or disseminating false information in connection with "service"<br />
              6. Other illegal or unjust acts, such as acts prohibited by relevant Acts and subordinate statutes, such as the Promotion of Information and Communication Network Utilization and Information Protection, etc<br />
              ⑦ "Members" are responsible for the management of IDs and passwords, and "Members" themselves are responsible for various damages that may occur due to their intentional or negligence, and "Members" shall immediately notify "Company" if their IDs and passwords are stolen or if they are aware that they are being used by a third party, and shall follow the guidance of "Company".
              <br /> <br />
              <div className='termsheader'>
              Article 8. Restrictions on Use<br />
              </div>
              ① The 'Company' may temporarily or permanently restrict the use of 'Service' by 'Members' in the case of this Article.
              <br />
              ② Temporary restrictions on use
              <br />
              1. Where a "member" violates the obligations of a member under Article 7
              <br />    ③ Permanent restrictions on use
              <br />
              1. Where a "member" habitually violates the obligations of a member under Article 7
              <br />     2. Where the violation of obligations under Article 7 of the "member" constitutes a crime
              <br /><br />
              <div className='termsheader'>
              Article 9. Rights, Duties and Disclaimers of the Company<br />
              </div>
              ① 'Company' reserves all rights to 'Service'.
              <br />
              ② "Company" strives to provide "service" stably, but "Company" may cease or cease to provide "service" in the event of natural disasters, wars and other equivalent force majeure, and in the case of Article 5, "Company" is not responsible for this.
              <br />
              ③ "Company" shall not be liable for damages caused by "Members" using "Contents" unless "Company" is attributable to "Company's intention or negligence."
              <br /><br />
              <div className='termsheader'>
              Article 10. Notification <br />
              </div>
              ① If the 'Company' notifies the 'Members' individually, it can be done by email address unless otherwise specified in the 'Terms and Conditions'.
              <br />
              ② Notwithstanding paragraph (1), if the 'Company' notifies an unspecified number of 'members', the individual notice may be replaced by posting the fact on the 'Service' screen for at least 7 days.
              <br /><br />
              <div className='termsheader'>
              Article 11. Compensation for damages <br />
              </div>
              The 'company' and 'members' shall be liable for damages if they cause damage to the other party at their own risk. In particular, if the 'members' infringes on the copyright of the 'content' in violation of Article 7 (3), the 'members' shall bear all civil and criminal liability for it.
              <br /><br />
              <div className='termsheader'>
              Article 12. Change of service subject<br />
              </div>
              ① The "Company" shall notify the "members" of the transfer of personal information in accordance with Article 26 of the Information and Communication Network Act if the "service" subject changes due to the transfer or merger of all or part of the business, human and material divisions, and asset transfers.
              <br />
              ② If the "Company" changes the "Service" subject under paragraph (1), the "Usage Contract" entered into by the "Company" and "Members" under the "Terms and Conditions" will be comprehensively transferred to the "Service" subject.
              <br />
              ③ The "Company" guides the "Members" on how and procedures to withdraw their consent to the collection and use of personal information and their consent to the "Terms and Conditions" if they do not want to transfer personal information and the "Usage Agreement".<br />
            </div>

            <button className="popup-close-btn" onClick={() => setShowPopup(false)}>X</button>
          </div>
          </div>
      )}
          </div>
      );
}
