import React, { useCallback, useState } from "react";
import axios from "axios";


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

function MissionCard() {

  const [inputs, setInputs] = useState({  
    problem1Name: localStorage.getItem("problem1Name"),
    problem1Num: localStorage.getItem("problem1Num"),
    problem2Name: localStorage.getItem("problem2Name"),
    problem2Num: localStorage.getItem("problem2Num"),
    problem3Name: localStorage.getItem("problem3Name"),
    problem3Num: localStorage.getItem("problem3Num"),
    problem1Answer: localStorage.getItem("problem1Answer"),
    problem2Answer: localStorage.getItem("problem2Answer"),
    problem3Answer: localStorage.getItem("problem3Answer"),
    problem1Success: localStorage.getItem("problem1Success"),
    problem2Success: localStorage.getItem("problem2Success"),
    problem3Success: localStorage.getItem("problem3Success")

  })
  const { problem1Name, problem1Num,problem2Name,problem2Num,problem3Name,problem3Num, problem1Answer, problem2Answer, problem3Answer,
    problem1Success, problem2Success, problem3Success } = inputs   

  const onClick1 =function(){
    window.open("https://www.acmicpc.net/problem/"+problem1Num)
  }

  const onClick2 =function(){
    window.open("https://www.acmicpc.net/problem/"+problem2Num)
  }

  const onClick3 =function(){
    window.open("https://www.acmicpc.net/problem/"+problem3Num)
  }

  const getClearMission = useCallback(async(e) =>{
    try {
      await axios({
        method:"get",
        url:"http://j6c204.p.ssafy.io:8083/batch/renewal/"+localStorage.getItem("userId"),
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8",
          "Authorization" : "Bearer "+localStorage.getItem("Authorization")
        }
      })
      .then(window.location.reload())
    }
    catch(error) {
      alert("실패");
    }
  })

  const getRefresh = useCallback(async(e) =>{
    try{
      const {data: resonse} = await axios({
        method:"get",
        url:"http://j6c204.p.ssafy.io:8081/v1/redis/refresh/"+localStorage.getItem("userId"),
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8",
          "Authorization" : "Bearer "+localStorage.getItem("Authorization")
        }
        
      })
      // console.log(headers)
      // console.log(resonse)
      const problemInfo = {
        "problem1Name": resonse[0]["problemDto"]["problemName"],
        "problem1Num": resonse[0]["problemDto"]["problemNum"],
        "problem2Name": resonse[1]["problemDto"]["problemName"],
        "problem2Num": resonse[1]["problemDto"]["problemNum"],
        "problem3Name": resonse[2]["problemDto"]["problemName"],
        "problem3Num": resonse[2]["problemDto"]["problemNum"],
        "problem1Answer":resonse[0]["problemDto"]["problemAnswer"],
        "problem2Answer":resonse[1]["problemDto"]["problemAnswer"],
        "problem3Answer":resonse[2]["problemDto"]["problemAnswer"],
        "problem1Success":resonse[0]["successDate"],
        "problem2Success":resonse[1]["successDate"],
        "problem3Success":resonse[2]["successDate"]
      }
      // console.log(userInfo)
      localStorage.setItem("problem1Name",  resonse[0]["problemDto"]["problemName"])
      localStorage.setItem("problem1Num", resonse[0]["problemDto"]["problemNum"])
      localStorage.setItem("problem2Name",  resonse[1]["problemDto"]["problemName"])
      localStorage.setItem("problem2Num", resonse[1]["problemDto"]["problemNum"])
      localStorage.setItem("problem3Name",  resonse[2]["problemDto"]["problemName"])
      localStorage.setItem("problem3Num", resonse[2]["problemDto"]["problemNum"])
      localStorage.setItem("problem1Answer", resonse[0]["problemDto"]["problemAnswer"])
      localStorage.setItem("problem2Answer", resonse[1]["problemDto"]["problemAnswer"])
      localStorage.setItem("problem3Answer", resonse[2]["problemDto"]["problemAnswer"])
      localStorage.setItem("problem1Success", resonse[0]["successDate"])
      localStorage.setItem("problem2Success", resonse[1]["successDate"])
      localStorage.setItem("problem3Success", resonse[2]["successDate"])

      setInputs(problemInfo)

    }catch(error){
      alert("문제 갱신에 실패했습니다.")
    }
  })

  const getMission = useCallback(async(e) =>{
    try{
      const {data: resonse,} = await axios({
        method:"get",
        url:"http://j6c204.p.ssafy.io:8081/v1/redis/today/"+localStorage.getItem("userId"),
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8",
          "Authorization" : "Bearer "+localStorage.getItem("Authorization")
        }
        
      })
      // console.log(headers)
      // console.log(resonse)
      const problemInfo = {
        "problem1Name": resonse[0]["problemDto"]["problemName"],
        "problem1Num": resonse[0]["problemDto"]["problemNum"],
        "problem2Name": resonse[1]["problemDto"]["problemName"],
        "problem2Num": resonse[1]["problemDto"]["problemNum"],
        "problem3Name": resonse[2]["problemDto"]["problemName"],
        "problem3Num": resonse[2]["problemDto"]["problemNum"],
        "problem1Answer":resonse[0]["problemDto"]["problemAnswer"],
        "problem2Answer":resonse[1]["problemDto"]["problemAnswer"],
        "problem3Answer":resonse[2]["problemDto"]["problemAnswer"],
        "problem1Success":resonse[0]["successDate"],
        "problem2Success":resonse[1]["successDate"],
        "problem3Success":resonse[2]["successDate"]
      }
      // console.log(userInfo)
      localStorage.setItem("problem1Name",  resonse[0]["problemDto"]["problemName"])
      localStorage.setItem("problem1Num", resonse[0]["problemDto"]["problemNum"])
      localStorage.setItem("problem2Name",  resonse[1]["problemDto"]["problemName"])
      localStorage.setItem("problem2Num", resonse[1]["problemDto"]["problemNum"])
      localStorage.setItem("problem3Name",  resonse[2]["problemDto"]["problemName"])
      localStorage.setItem("problem3Num", resonse[2]["problemDto"]["problemNum"])
      localStorage.setItem("problem1Answer", resonse[0]["problemDto"]["problemAnswer"])
      localStorage.setItem("problem2Answer", resonse[1]["problemDto"]["problemAnswer"])
      localStorage.setItem("problem3Answer", resonse[2]["problemDto"]["problemAnswer"])
      localStorage.setItem("problem1Success", resonse[0]["successDate"])
      localStorage.setItem("problem2Success", resonse[1]["successDate"])
      localStorage.setItem("problem3Success", resonse[2]["successDate"])

      
      setInputs(problemInfo)
    }catch(error){
    }
  })
  getMission()


    return (
      <>
      <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex mt-5">
                <div className="col px-0">
                    <center>
                      <p className="h1 text-white"><i class="ni ni-single-copy-04 mr-2"></i>데일리 미션</p>
                      <Row className="float-right" lg="12">
                      <Col  lg="6">
                      <Button
                        block
                        className=""
                        color='warning'
                        size="lg"
                        onClick={getRefresh}
                      >
                        미션 갱신
                      </Button>
                    </Col>
                    
                    <Col  lg="6">
                      <Button
                        block
                        className="btn-green"
                        color="success"
                        size="lg"
                        onClick={getClearMission}
                      >
                        미션 완료
                      </Button>
                    </Col>
                    </Row>
                    </center>
                </div>
              </Container>
            </section>
          </div>
        <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-4">
                          {/* <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div> */}
                          <img
                            alt="..."
                             src={require("assets/img/algo/math.jpg")}
                          />
                          <h5 className="text-primary text-uppercase mt-3">
                          {problem1Num}. {problem1Name}
                          </h5>
                          <div>
                          <Row className="align-items-center">
                            <Col sm="8">
                            <h5 className="mt-2">
                              정답률 : {problem1Answer}
                              
                            </h5>
                            </Col>
                            <Col sm="4">
                            <Button
                            className="mt--2"
                            color="primary"
                            onClick={onClick1}
                          >
                              <i className="ni ni-curved-next"></i>
                            </Button>
                            
                            </Col>
                          </Row>
                              {
                                localStorage.getItem("problem1Success") == "null"? <h5 className="text-danger">실패</h5>:<h5 className="text-success">성공</h5>
                              }
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-4">
                          {/* <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div> */}
                          <img
                            alt="..."
                             src={require("assets/img/algo/math.jpg")}
                          />
                          <h5 className="text-primary text-uppercase mt-3">
                          {problem2Num}. {problem2Name}
                          </h5>
                          <div>
                          <Row className="align-items-center">
                            <Col sm="8">
                            <h5 className="mt-2">
                              정답률 : {problem2Answer}
                            </h5>
                            </Col>
                            <Col sm="4">
                            <Button
                            className="mt--2"
                            color="primary"
                            onClick={onClick2}
                          >
                              <i className="ni ni-curved-next"></i>
                            </Button>
                            </Col>
                          </Row>
                          {
                                localStorage.getItem("problem2Success") == "null"? <h5 className="text-danger">실패</h5>:<h5 className="text-success">성공</h5>
                              }
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-4">
                          {/* <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div> */}
                          <img
                            alt="..."
                             src={require("assets/img/algo/math.jpg")}
                          />
                          <h5 className="text-primary text-uppercase mt-3">
                          {problem3Num}. {problem3Name}
                          </h5>
                          <div>
                          <Row className="align-items-center">
                            <Col sm="8">
                            <h5 className="mt-2">
                              정답률 : {problem3Answer}
                            </h5>
                            </Col>
                            <Col sm="4">
                            <Button
                            className="mt--2"
                            color="primary"
                            onClick={onClick3}
                          >
                              <i className="ni ni-curved-next"></i>
                            </Button>
                            </Col>
                          </Row>
                          {
                                localStorage.getItem("problem3Success") == "null"? <h5 className="text-danger">실패</h5>:<h5 className="text-success">성공</h5>
                              }
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
            
      </>
    );
  }

export default MissionCard;