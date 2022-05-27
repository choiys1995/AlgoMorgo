
import React, { useCallback, useState } from "react";
import axios from "axios";


// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
} from "reactstrap";

function MissionInfo() {
  const [inputs, setInputs] = useState({  
    maxSuccess: "",
    sucessCnt: "",
    totalSuccess: "",
  })

  const { maxSuccess, sucessCnt, totalSuccess } = inputs;


  const missionProfile = useCallback(async(e) =>{
    try{
      const {data: resonse} = await axios({
        method:"get",
        url:"http://j6c204.p.ssafy.io:8081/v1/mission/"+localStorage.getItem("userId"),
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8",
          "Authorization" : "Bearer "+localStorage.getItem("Authorization")
        }
        
      })
      setInputs({
        "maxSuccess": resonse["maxSuccess"],
        "sucessCnt": resonse["successCnt"],
        "totalSuccess": resonse["totalSuccess"]
      })
    }
    catch(error) {
      setInputs({
        "maxSuccess": 0,
        "sucessCnt": 0,
        "totalSuccess": 0
      })
    }
  })
  missionProfile();
    return (
      <>
            <Container className="py-lg-md d-flex mt-5">
              <div className="col px-0">
                <Row className="py-3 align-items-center">
                  <Col sm="10">
                    <h4>총 미션 수행일</h4>
                  </Col>
                  <Col sm="2">
                  <div>
                    <h4 className="text-center">
                      {totalSuccess}
                    </h4>
                  </div>
                  </Col>
                </Row>
              </div>
            </Container>            
              
            
            <hr width="60%" />
            
            <Container className="py-lg-md d-flex mt-5">
              <div className="col px-0">
                <Row className="py-3 align-items-center">
                  <Col sm="10">
                    <h4>연속 미션 수행일</h4>
                  </Col>
                  <Col sm="2">
                  <div>
                    <h4 className="text-center">
                      {maxSuccess}
                    </h4>
                  </div>
                  </Col>
                </Row>
              </div>
            </Container>

            <hr width="60%" />
            

            <Container className="py-lg-md d-flex mt-5">
              <div className="col px-0">
                <Row className="py-3 align-items-center">
                  <Col sm="10">
                    <h4>완료한 데일리 미션 수</h4>
                  </Col>
                  <Col sm="2">
                  <div>
                    <h4 className="text-center">
                     {sucessCnt}
                    </h4>
                  </div>
                  </Col>
                </Row>
              </div>
            </Container>

            <section className="section">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/algo/gold.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <h4 className="display-6 font-weight-bold text-white">
                        <center>총<br /> 미션 수행일</center>
                      </h4>
                      <p className="lead text-italic text-white">
                      <center>{totalSuccess}일</center>
                      </p>
                    </blockquote>
                  </Card>
                  </Col>
                  <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/algo/gold.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <h4 className="display-6 font-weight-bold text-white">
                        <center>연속<br /> 미션 수행일</center>
                      </h4>
                      <p className="lead text-italic text-white">
                      <center>{maxSuccess}일</center>
                      </p>
                    </blockquote>
                  </Card>
                  </Col>
                  <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/algo/gold.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <h4 className="display-6 font-weight-bold text-white">
                        <center>완료한 <br />데일리 미션</center>
                      </h4>
                      <p className="lead text-italic text-white">
                      <center>{sucessCnt}개</center>
                      </p>
                    </blockquote>
                  </Card>
                  </Col>
              </Row>
            </Container>
            </section>
            
      </>
    );
  }

export default MissionInfo;