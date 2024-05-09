import { useState, useEffect } from 'react';
import './customerservice.css';
import { Link } from 'react-router-dom';

export const Customerservice = () => {
    const [selectedCategory, setSelectedCategory] = useState('Delivery');
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const categories = ['Delivery', 'Order', 'Membership', 'Return'];
    const faqData = {
        'Delivery': [
            { question: 'How many days does it usually take to ship?'
            , answer: 'For payment completion and deposit confirmation, the product you ordered will be shipped after 9 a.m./2 p.m. on weekdays. The delivery date may vary when the delivery company is temporarily out of stock due to a flood of supplies, natural disasters such as heavy snow or heavy rain, or a flood of orders from our company.' },
            { question: 'How much is the shipping fee?'
            , answer: 'All shipping charges apply free of charge.' },
            { question: 'How do I check the delivery?'
            , answer: 'If you are a member, you can check it out on My Page -> Order List.' },
            { question: 'Is it possible to change the delivery address?'
            , answer: 'If it is before the product is shipped, we willcheck and change it to the address you want. However, if the item has already been delivered, it is not possible to change the delivery address.' },
            { question: 'Will it be shipped on Saturday as well?'
            , answer: 'The shipment will not be carried out on Saturday. Therefore, if you place an order including the weekend, please keep it in mind by next Monday.' }
        ],
        'Order': [
            { question: 'Where do I check my order after I make the payment?'
            , answer: 'More information is available on My Page -> Order List.' },
            { question: 'Where can I cancel my order?'
            , answer: 'Please contact the customer service center about cancel for order.' },
            { question: 'How do you pay for your order?'
            , answer: 'Payment methods supported by Naver Pay, Kakao Pay, and other KG Inicis.' },
            { question: 'I am curious about the process from the order to the delivery.'
            , answer: 'The shipping company will send you a notification when the order delivery starts after the order has been placed normally.' },
            { question: 'Where can I find the reword?'
            , answer: 'You can find reword points on My page -> My account.' }
        ],
        'Membership': [
            { question: 'I want to change my password!'
            , answer: 'You can change password on My page -> Change Password.' },
            { question: 'Can non-members also order?'
            , answer: 'Yes, but non-members can not use reword system and order list.' },
            { question: 'I would like to change my account information.'
            , answer: 'Account information can be changed from my page -> my account.' },
            { question: 'Where can I withdrawal the membership?'
            , answer: 'You can withdraw the membership on My page -> Membership Withdrawal.' },
            { question: 'How will my personal information be processed when members Withdrawal?'
            , answer: 'Upon membership withdrawal, all personal information will be deleted and cannot be recovered.' }
        ],
        'Return': [
            { question: 'How can I get a refund?'
            , answer: 'If you click the refund button in the order details, go to the refund page.' },
            { question: 'How long will the refund take?'
            , answer: 'It will take 3 to 7 days after the admin checks the refund details.' },
            { question: 'I would like to change my refund account.'
            , answer: 'Refunds can only be processed in the account where the transaction has been made.' },
            { question: 'Are there any precautions for a refund?'
            , answer: 'Refunds are not possible for items that are in use, and it takes 3 to 7 days to date of refundable items.' },
            { question: 'I would like to request a refund for the transaction using the reword.'
            , answer: 'Refunds are not allowed for transactions in which rewords are used.' }
        ]
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedQuestion(null);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(selectedQuestion === question ? null : question);
    };

    useEffect(() => {
        setSelectedQuestion(null);
    }, [selectedCategory]);

    return (
        <div className="customerservicewhole">
            <div className="account-header">
                Customer Service
            </div>
            <div className="customerserviceheader">
                Frequently Asked Questions
            </div>
            <div className='frequentlyaskedcategory'>
                {categories.map((category, index) => (
                    <div key={index} className={`frequentlyaskedcategory${index + 1} ${selectedCategory === category ? 'selectedCategory' : ''}`} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </div>
                ))}
            </div>

            {faqData[selectedCategory].map((faq, index) => (
                <div key={index}>
                    <button className='askservicebtn' onClick={() => handleQuestionClick(faq.question)}>
                        <span className='contentsmallheader'>{index + 1}</span>&nbsp;&nbsp;&nbsp;
                        {faq.question}
                    </button>
                    <div className='askservicecontent' style={{ display: selectedQuestion === faq.question ? 'block' : 'none' }}>
                        {faq.answer}
                    </div>
                </div>
            ))}
            <Link to="/qnaboard">
              <div className='linktoQNA'>If you want to any other help, come QNA and solves problems</div>
              </Link>
        </div>
    );
};

export default Customerservice;
