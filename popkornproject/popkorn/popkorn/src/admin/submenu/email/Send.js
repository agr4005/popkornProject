import { useState, useEffect } from "react";
import './Send.css';
import { apiCall } from "../../../service/apiService";

export default function Send() {
  const [emailContent, setEmailContent] = useState('');
  const [emailTitle, setemailTitle] = useState('');
  const [emailRecipient, setemailRecipient] = useState('');
  const [checkRecipient, setcheckRecipient] = useState(false);
  const [checkReserve, setcheckReserve] = useState(false);
  const [reservationData, setReservationData] = useState({ reservationTime: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(reservationData);
  }, [reservationData]);

  const handleAllUsersCheck = (event) => {
    setcheckRecipient(event.target.checked);
    setemailRecipient('');
  };

  const handlereserve = (event) => {
    setcheckReserve(event.target.checked);
  };

  const handleEmailContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleEmailTitleChange = (event) => {
    setemailTitle(event.target.value);
  };

  const handleEmailRecipientChange = (event) => {
    setemailRecipient(event.target.value);
  };

  const sendEmail = async () => {
    try {
      await apiCall('/api/manager/user/mailsend', "POST", { emailTitle: emailTitle, emailContent: emailContent, emailRecipient: emailRecipient }, sessionStorage.getItem('token'));
      alert("Email Send");
      setemailRecipient('');
      setEmailContent('');
      setemailTitle('');
    } catch (error) {
      alert('Mail Sending is possible from "MANAGER" authority and above.');
    }
  };

  const sendAlluser = async () => {
    try {
      const formData = new FormData();
      formData.append('emailTitle', emailTitle);
      formData.append('emailContent', emailContent);
      formData.append('emailRecipient', emailRecipient);

      await apiCall('/api/manager/user/sendtoallusers', "POST", formData, sessionStorage.getItem('token'));
      alert("Email Sent");
      setemailRecipient('');
      setEmailContent('');
      setemailTitle('');
    } catch (error) {
      alert('Mail Sending is possible from "MANAGER" authority and above.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (checkReserve) {
        const response = await apiCall('/api/user/reserve', "POST", { reservationData: reservationData }, null);
        console.log('Reservation successful!', response.data);
      } else {
        await sendEmail();
      }
    } catch (error) {
      console.error('Reservation failed!', error);
    }
  };

  return (
    <div className="stateEmail">
      <div className="EmailHeader">
        <h3>Send Email</h3>
        <button
          onClick={checkReserve ? handleSubmit : (checkRecipient ? sendAlluser : sendEmail)}
          className="sendemailbtn"
          disabled={!emailTitle || !emailContent || (!emailRecipient && !checkRecipient) ? true : false}
        >
          {checkReserve ? "Reserve Email" : (checkRecipient ? "Send for All user" : "Send Email")}
        </button>

      </div>
      <div className="emailtitle">
        Email Title
        <input
          type="text"
          className="emailTitle-Input"
          value={emailTitle}
          onChange={handleEmailTitleChange}
          maxLength={30}
          placeholder="Title"
        />
      </div>
      <div className="recipientemail">
        Recipient-Email
        <input
          type="type"
          className="Recipient-Input"
          value={checkRecipient ? "For All Users" : emailRecipient}
          onChange={handleEmailRecipientChange}
          maxLength={30}
          placeholder={checkRecipient ? "For All Users" : "example@email.com"}
          readOnly={checkRecipient}
        />
        <div>
          All Users (May take some time) &nbsp; <input type="checkbox" className="allusercheck" onChange={handleAllUsersCheck} /> <br />
          {/* Reverse Sending &nbsp; <input type="checkbox" className="allusercheck" onChange={handlereserve} /> &nbsp;
          {checkReserve ?
            <input
              type="datetime-local"
              name="reservationTime"
              value={reservationData.reservationTime}
              onChange={handleInputChange}
              className="reservetime"
            />
            : null} */}


        </div>

      </div>
      <textarea
        className="emailcontent-Textarea"
        value={emailContent}
        onChange={handleEmailContentChange}
        rows={5}
        cols={50}
      />
    </div>
  );
}
