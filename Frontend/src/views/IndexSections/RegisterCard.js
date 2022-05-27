
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

function RegisterCard() {

  const history = useHistory()

  const [inputs, setInputs] = useState({  
    password: '',
    pwcheck: '',
    baekjoonId: '',
    language: ''
  })
  const [id, setUserId] = useState({
    userId : ''
  })
  const [nick, setNickName] = useState({
    nickName : ''
  })
  let [checks, setChecks] = useState({
    idCheck : false,
    nickNameCheck : false,
    flag : false
  })
  const {password,pwcheck,baekjoonId,language} = inputs
  const {userId} = id
  const {nickName} = nick
  let {idCheck, nickNameCheck, flag} = checks
  const onChangeUserId = (e) => {
    const { name, value } = e.target   

    const nextId = {            
      ...id,  
      [name]: value,
    }
    setUserId(nextId)
    const nextChecks = {
      idCheck : false,
      nickNameCheck : nickNameCheck,
      flag : password === pwcheck ? true : false
    }
    setChecks(nextChecks);
  }
  const onChangeNickName = (e) => {
    const { name, value } = e.target   

    const nextNick = {            
      ...nick,  
      [name]: value,
    }
    setNickName(nextNick)
    const nextChecks = {
      idCheck : idCheck,
      nickNameCheck : false,
      flag : password === pwcheck ? true : false
    }
    setChecks(nextChecks);
  }
  const onChange = (e) => {
    const { name, value } = e.target   

    const nextInputs = {            
      ...inputs,  
      [name]: value,
    }
    setInputs(nextInputs)
    const nextChecks = {
      idCheck : idCheck,
      nickNameCheck : nickNameCheck,
      flag : password === pwcheck ? true : false
    }
    setChecks(nextChecks);
  }


  const duplicateUserId = useCallback(async(e)=>{
    if(userId.length < 8 || 20 <userId.length){
      idCheck = false
      alert("아이디 길이는 8글자 이상 20자 이하로 가능합니다.")
      return
    }
    try{
      await axios({
        method:"get",
        url:"http://j6c204.p.ssafy.io:8081/v1/user/duplicate/check/"+userId,
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8"
        }
      })
      idCheck = true;
      alert("사용가능한 아이디입니다.")
      
    }catch(e){
      idCheck = false;
      alert("사용불가능한 아이디입니다.")
    }
  })

  const duplicateNickName = useCallback(async(e)=>{
    if(nickName.length < 8 || 20 < nickName.length){
      nickNameCheck = false
      alert("닉네임 길이는 8글자 이상 20자 이하로 가능합니다.")
      return
    }
    try{
      await axios({
        method:"get",
        url:"http://j6c204.p.ssafy.io:8081/v1/user/duplicateNickName/check/"+nickName,
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8"
        }
      })
      nickNameCheck = true;
      alert("사용가능한 닉네임입니다.")
      
    }catch(e){
      nickNameCheck = false;
      alert("사용불가능한 닉네임입니다.")
    }
  })

  const siginup = useCallback(async (e) =>{

    if(userId.length < 8 || 20 <userId.length){
      alert("아이디 길이는 8글자 이상 20자 이하로 가능합니다.")
      return
    }
    if(!idCheck){
      alert("아이디 중복확인을 해주세요.")
      return
    }
    if(nickName.length < 8 || 20 < nickName.length){
      alert("닉네임 길이는 8글자 이상 20자 이하로 가능합니다.")
      return
    }
    if(!nickNameCheck){
      alert("닉네임 중복확인을 해주세요.")
      return
    }
    if(password !== pwcheck){
      alert("비밀번호를 확인해주세요.")
      return;
    }
    if(password.length < 8){
      alert("비밀번호 길이는 8글자 이상 가능합니다.")
      return;
    }
    
      await axios({
        method:"post",
        url:"http://j6c204.p.ssafy.io:8081/v1/user/signup",
        // url:"http://127.0.0.1:8081/v1/user/signup",
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8"
        },
        data:{
          "userId" : userId,
          "language" : language,
          "nickName" : nickName,
          "baekjoonId" : baekjoonId,
          "password" : password
        }
      }).then(response =>{
        localStorage.setItem("userId",userId)
        alert("회원가입에 성공했습니다. 로그인 해주세요.")
        history.replace("/login-page")
      }).catch(error =>{
        if(error.response.status == 418){
          alert("solved.ac에 가입되어있지 않은 사용자입니다.")
          return
        }
        if(error.response.status == 400){
          alert("아이디를 확인해주세요.")
          return
        }
        if(error.response.status == 403){
          alert("닉네임을 확인해주세요.")
          return
        }
      })
      
      // console.log(userInfo)
      
    
  })

    return (
      <>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h3>회원가입</h3>
                  </div>
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="아이디" type="text" name="userId" onChange={onChangeUserId} value={userId}/>
                        <div>
                          <Input block className="btn-round" color="default" size="lg" type="button" onClick={duplicateUserId} value="중복확인"/>
                        </div>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="닉네임" type="text" name="nickName" onChange={onChangeNickName} value={nickName}/>
                        <div>
                          <Input block className="btn-round" color="default" size="lg" type="button" onClick={duplicateNickName} value="중복확인"/>
                        </div>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="비밀번호"
                          type="password"
                          autoComplete="off"
                          name="password" onChange={onChange} value={password}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="비밀번호확인"
                          type="password"
                          autoComplete="off"
                          name="pwcheck" onChange={onChange} value={pwcheck}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="백준 아이디" type="text" name="baekjoonId" onChange={onChange} value={baekjoonId}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {/* <i className="fa-duotone fa-brackets-curly"></i> */}
                            <i class="fas fa-heart"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="선호 언어" type="text" name="language" onChange={onChange} value={language}/>
                      </InputGroup>
                    </FormGroup>
                    {/* <div className="text-muted font-italic">
                      <small>
                        password strength:{" "}
                        <span className="text-success font-weight-700">
                          strong
                        </span>
                      </small>
                    </div>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span>
                              I agree with the{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row> */}
                    <br />
                    <div>
                      <Button
                        block
                        className="btn-round"
                        color="default"
                        size="lg"
                        type="button"
                        onClick={siginup}
                      >
                      가입하기
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        
      </>
    );
  }

export default RegisterCard;