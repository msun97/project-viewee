import { useDispatch, useSelector } from 'react-redux';
import { QnAWrap } from './style';
import Input from '../../../ui/input';
import CheckBox from '../../../ui/checkbox';
import Button from '../../../ui/button/defaultButton';
import { useState } from 'react';
import { authActions } from '../../../store/modules/authSlice';
import { useNavigate } from 'react-router';
import { showToast } from '../../../ui/toast/showToast';

const QnA = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [faq, setFaq] = useState([
    {
      id: 1,
      question: '뷰이(Viewee)란 무엇인가요?',
      answer: '뷰이(Viewee)는 주문형 영화와 프로그램을 시청할 수 있는 스트리밍 서비스입니다.',
      toggle: false,
    },
    {
      id: 2,
      question: '뷰이(Viewee)의 가격은 얼마인가요?',
      answer: '구독 서비스의 가격은 다음 페이지에서 확인하실 수 있습니다.',
      link: '/subscribe',
      toggle: false,
    },
    {
      id: 3,
      question: '뷰이(Viewee)에서는 어떤 콘텐츠를 이용할 수 있나요?',
      answer: '뷰이(Viewee)를 구독하시면 영화, 드라마, 예능, 애니, 키즈 등의 다양한 콘텐츠를 이용하실 수 있습니다.',
      toggle: false,
    },
    {
      id: 4,
      question: '뷰이(Viewee)에서는 어떻게 시청하나요?',
      answer: '원하시는 콘텐츠를 클릭하시거나, 검색창에서 검색하시면 시청 가능합니다.',
      toggle: false,
    },
    {
      id: 5,
      question: '뷰이(Viewee)에 가입하려면 어떻게 해야 하나요?',
      answer: '뷰이 회원가입 페이지는 다음과 같습니다.',
      link: '/signup',
      toggle: false,
    },
    {
      id: 6,
      question: '뷰이(Viewee) 무료 체험이란 무엇인가요?',
      answer: '뷰이 구독 서비스를 무료로 체험해보실 수 있습니다. 자세한 내용은 다음 페이지를 참고하세요. ',
      link: '/',
      toggle: false,
    },
    {
      id: 7,
      question: '뷰이(Viewee) 고객 지원팀에 어떻게 연락하나요?',
      answer: ' 00-223-123-7890 또는 viewee@good.com로 연락 가능합니다.',
      toggle: false,
    },
    {
      id: 8,
      question: '뷰이(Viewee) 결제 방법은 무엇인가요?',
      answer: '현재 뷰이에서는 신용카드 결제를 지원하고 있습니다.',
      toggle: false,
    },
  ]);
  const { user } = useSelector((state) => state.authR);
  const handletoggle = (id) => {
    setFaq((prevFaq) => prevFaq.map((item) => (item.id === id ? { ...item, toggle: !item.toggle } : item)));
  };
  const Phone = user.phone.split('-');
  const firstPhone = Phone[0];
  const secondPhone = Phone[1];
  const thirdPhone = Phone[2];

  const email = user.userEmail.split('@');
  const id = email[0];
  const domain = email[1];

  const [category, setCategory] = useState('사이트 이용');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAgree, setIsAgree] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeAgree = (e) => {
    setIsAgree(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      showToast(`centerInfo`, { message: '제목과 내용을 모두 입력하세요.' });
      return;
    } else if (!isAgree) {
      showToast(`centerInfo`, { message: '개인정보 수집 및 이용에 동의하셔야 합니다.' });
      return;
    } else {
      const requested = { category: category, title: title, content: content };
      dispatch(authActions.addRequested(requested));
      navigate('/mypage');
    }
  };
  return (
    <QnAWrap>
      <div className="contentWrap">
        <div className="info">
          <div className="title">
            <h2>문의 페이지에 오신 걸 환영합니다!</h2>
            <p>저희 제품에 문제가 있을 수 있는 경우 도와드리겠습니다.</p>
          </div>
          <img src="/images/banner3.png" />
        </div>
        <div className="inputBox">
          {user ? (
            <form className="submitQuestion" onSubmit={onSubmit}>
              {' '}
              <div className="itemWrap1">
                <div className="name item">
                  <p>이름</p>
                  <Input type="text" variant="gray" value={user.username} readOnly />
                </div>
                <div className="id item">
                  <p>아이디</p>
                  <Input type="text" variant="gray" value={user.userId} readOnly />
                </div>
              </div>
              <div className="itemSet">
                <div className="email item">
                  <p>Email</p>
                  <div className="emailInput">
                    <Input type="text" variant="gray" value={id} readOnly />
                    @
                    <Input type="text" variant="gray" value={domain} readOnly />
                  </div>
                </div>
                <div className="phone item">
                  <p>휴대폰 번호</p>
                  <div className="phoneInput">
                    <Input variant="gray" type="text" value={firstPhone} readOnly />
                    <Input variant="gray" type="text" value={secondPhone} readOnly />
                    <Input variant="gray" type="text" value={thirdPhone} readOnly />
                  </div>
                </div>
              </div>
              <div className="category">
                <p>문의 종류</p>
                <div className="form">
                  <div>
                    <input
                      type="radio"
                      id="site"
                      name="questionType"
                      value="사이트 이용"
                      onChange={onChangeCategory}
                      defaultChecked
                    />
                    <label htmlFor="site">사이트 이용</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="login"
                      name="questionType"
                      onChange={onChangeCategory}
                      value="회원/로그인"
                    />
                    <label htmlFor="login">회원/로그인</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="disability"
                      onChange={onChangeCategory}
                      name="questionType"
                      value="장애신고"
                    />
                    <label htmlFor="disability">장애신고</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="refund"
                      name="questionType"
                      value="환불/해지 신청"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="refund">환불/해지 신청</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="content"
                      name="questionType"
                      value="콘텐츠/채널"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="content">콘텐츠/채널</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="usage"
                      name="questionType"
                      value="이용 불편사항"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="usage">이용 불편사항</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="suggestion"
                      name="questionType"
                      value="서비스 제안"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="suggestion">서비스 제안</label>
                  </div>

                  <div>
                    <input type="radio" id="etc" name="questionType" value="기타" onChange={onChangeCategory} />
                    <label htmlFor="etc">기타</label>
                  </div>
                </div>
              </div>
              <div className="title">
                <p>문의 제목</p>
                <Input
                  type="text"
                  placeholder="문의사항 제목"
                  variant="gray"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className="question item">
                <p>문의 내용</p>
                <textarea
                  type="text"
                  placeholder="문의하실 내용을 적어주세요"
                  value={content}
                  onChange={onChangeContent}
                />
              </div>
              <div className="agree">
                <CheckBox variant="primary" id="agree" onChange={onChangeAgree}>
                  개인정보 수집 및 이용 동의
                </CheckBox>
                <Button type="submit">문의하기</Button>{' '}
              </div>
            </form>
          ) : (
            ''
          )}
        </div>
        <div className="faq">
          <div className="title">
            <h3>자주 묻는 질문</h3>
            <p>
              질문 있으신가요? 답변이 있습니다! Viewee에 관한 가장 일반적인 질문에 대한 답변은 FAQ 섹션에서 확인하세요.
            </p>
          </div>
          <div className="faqList">
            {faq.map((faq) => (
              <div key={faq.id} className="faqItem">
                <div className="faqItemWrapper">
                  <div className="itemContent">
                    <div className="no">{faq.id <= 9 ? '0' + faq.id : faq.id}</div>
                    <div className="accordian">
                      <h4>{faq.question}</h4>
                      <p className={faq.toggle ? 'on' : ''}>
                        {faq.answer} {faq.link && <a href={faq.link}>바로가기</a>}
                      </p>
                    </div>
                    <div className="arrow" onClick={() => handletoggle(faq.id)}>
                      {faq.toggle ? <img src="/icons/arrow/bottom.svg" /> : <img src="/icons/arrow/top.svg" />}
                    </div>
                  </div>
                </div>
                <div className="border" />
              </div>
            ))}
          </div>
        </div>
        <div className="banner">
          <img src="/images/banner4.png" />
        </div>
      </div>
    </QnAWrap>
  );
};

export default QnA;
