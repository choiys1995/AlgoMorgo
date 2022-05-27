
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import useSWR from "swr";
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
import { setTextRange } from "typescript";


function LoginCard(props) {
  
  const history = useHistory()

  const [inputs, setInputs] = useState({  
    userId: localStorage.getItem("userId"),
    password: '',
  })
  const { userId, password } = inputs   

  const onChange = (e) => {
    const { name, value } = e.target   

    const nextInputs = {            
      ...inputs,  
      [name]: value,
    }
    setInputs(nextInputs)       

  }
  const onReset = () => {
    const resetInputs = {       
      userId: '',
      password: '',
    }
    setInputs(resetInputs)      
  }
  const login = useCallback(async (e) =>{
      await axios({
        method:"post",
        url:"http://j6c204.p.ssafy.io:8081/v1/user/login",
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8"
        },
        data:{
          "userId" : userId,
          "password" : password
        }
      }).then(res => {
      // console.log(headers)
      // console.log(resonse)
      const response = res.data
      const headers = res.headers
      const userInfo = {
        "userId" : userId,
        "language": response["language"],
        "nickName": response["nickName"],
        "baekjoonId": response["baekjoonId"]
      }
      // console.log(userInfo)
      localStorage.setItem("userId",userId)
      localStorage.setItem("language",response["language"])
      localStorage.setItem("nickName",response["nickName"])
      localStorage.setItem("baekjoonId",response["baekjoonId"])
      localStorage.setItem("userInfo",JSON.stringify(userInfo))
      let jwt = headers["authorization"]
      jwt = jwt.substr(7)
      // console.log(jwt)
      localStorage.setItem("Authorization",jwt);
      history.replace("/dailymission-page")
    }).catch(error => {
      if(error.response.status == 418)
        alert("탈퇴한 사용자입니다.")
      else
        alert("로그인에 실패했습니다.")
      onReset()
    })
  }) 
    return (
      <>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <h3>로그인</h3>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="아이디" name="userId" type="text" onChange={onChange} value={userId}/>
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
                              name="password"
                              type="password"
                              autoComplete="off"
                              onChange={onChange}
                              value={password}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>아이디 저장</span>
                          </label>
                        </div> */}
                        <br />
                        <div>
                          <Button
                           block
                           className="btn-round"
                           color="default"
                           size="lg"
                           type="button"
                           to="/dailymission-page" 
                          //  tag={Link}
                            onClick={login}
                          >
                          로그인
                          </Button>
                        </div>
                        <div className="mt-3">
                          <Button
                           block
                           className="btn-round"
                           color="primary"
                           size="lg"
                           type="button"
                           to="/register-page" 
                           tag={Link}
                          >
                          회원가입
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

export default LoginCard;