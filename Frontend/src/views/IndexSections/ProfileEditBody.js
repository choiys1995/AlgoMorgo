import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  FormGroup,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

function ProfileEditBody() {

  const history = useHistory()

  const [inputs, setInputs] = useState({
    userId : localStorage.getItem("userId"),
    nickName: localStorage.getItem("nickName"),
    language: localStorage.getItem("language"),
    password: null,
    changePassword: null
  })

  const { userId, nickName, language, password, changePassword } = inputs

  const onChange = (e) => {
    const { name, value } = e.target   

    const nextInputs = {            
      ...inputs,
      [name]: value,
    }
    
    setInputs(nextInputs)
  }

  const updateProfile = useCallback(async (e) =>{
    if(nickName.length < 8 || 20 < nickName.length){
      alert("닉네임 길이는 8글자 이상 20자 이하로 가능합니다.")
      return
    }
    if(changePassword === '') {
      setInputs({
        "userId" : userId,
        "nickName" : nickName,
        "language" : language,
        "password" : password,
        "changePassword" : null
      })
    }
    if(changePassword !== null && changePassword.length < 8){
      alert("비밀번호 길이는 8글자 이상 가능합니다.")
      return;
    }
    
      await axios({
        method:"put",
        url:"http://j6c204.p.ssafy.io:8081/v1/user/"+userId,
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8",
          "Authorization" : "Bearer " + localStorage.getItem("Authorization")
        },
        data:{
          "userId" : userId,
          "language" : language,
          "nickName" : nickName,
          "password" : password,
          "changePassword" : changePassword
        }
      }).then(response =>{
        alert("회원정보 변경을 완료했습니다.")
        localStorage.clear()
        window.location.replace("/login-page")
      }).catch(error =>{
        if(error.response.status == 400){
          alert("닉네임이 잘못되었습니다.")
          return
        }
        if(error.response.status == 304){
          alert("회원 수정에 실패했습니다.")
          return
        }
      })
      
      // console.log(userInfo)
  })

  const unRegister = useCallback(async (e) =>{
      await axios({
        method:"delete",
        url:"http://j6c204.p.ssafy.io:8081/v1/user/" + userId,
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8",
          "Authorization" : "Bearer " + localStorage.getItem("Authorization")
        },
        data: {
          "password":password
        }
      }).then(response =>{
        alert("회원탈퇴를 완료했습니다. 이용해주셔서 감사합니다.")
        localStorage.clear()
        window.location.replace("/login-page")
      }).catch(error =>{
        alert("회원탈퇴에 실패했습니다.")
      })
  })
  
    return (
      <>
        <section className="section">
          <Container>
            <Card className="card-profile bg-secondary mt-0">
              <div>
                <p className="h7 mt-3 ml-4 font-weight-bold"><i class="ni ni-single-02"></i> 회원 정보</p>
              </div>

              <Row className="py-3 align-items-center">
                <Col sm="3">
                <Button className="ml-6 mt--3 col-7"
                      block
                      font-weight-bold
                      color="neutral"
                      disabled
                      type="button">
                      <h7>현재 비밀번호</h7>
                    </Button>
                </Col>
                <Col sm="8">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="현재 비밀번호 입력"
                      type="password"
                      name="password"
                      onChange={onChange}
                      value={password}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="py-3 align-items-center">
                <Col sm="3">
                <Button className="ml-6 mt--3 col-7"
                      block
                      font-weight-bold
                      color="neutral"
                      disabled
                      type="button">
                      <h7>새 비밀번호</h7>
                    </Button>
                </Col>
                <Col sm="8">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="변경할 비밀번호 입력"
                      type="password"
                      name="changePassword"
                      onChange={onChange}
                      value={changePassword}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="py-3 align-items-center">
                <Col sm="3">
                <Button className="ml-6 mt--3 col-7"
                      block
                      font-weight-bold
                      color="neutral"
                      disabled
                      type="button">
                      <h7>닉네임</h7>
                    </Button>
                </Col>
                <Col sm="8">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput2"
                      placeholder=""
                      type="nickname"
                      name="nickName"
                      value={nickName}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="py-3 align-items-center">
                <Col sm="3">
                <Button className="ml-6 mt--3 col-7"
                      block
                      font-weight-bold
                      color="neutral"
                      disabled
                      type="button">
                      <h7>선호언어</h7>
                    </Button>
                </Col>
                <Col sm="8">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput4"
                      placeholder=""
                      type="lan"
                      name="language"
                      value={language}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
             
              <div className="text-right mt-3 mr-5 mb-5">
                <button type="button" class="btn-1 btn btn-primary" onClick={updateProfile}>정보 수정</button>
                <button type="button" class="btn-1 btn btn-danger" onClick={unRegister}>회원 탈퇴</button>
              </div>


              </Card>
            </Container>
          </section>

      </>
    );
  }

export default ProfileEditBody;
