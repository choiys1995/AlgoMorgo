import React, { useState, useEffect } from 'react';
import Badge from 'reactstrap/lib/Badge';
import {
  Card,
  CardBody,
  Row,
  Col,
  Progress,
} from "reactstrap";
import axios from 'axios';
function getWeek(year,month,date) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month+1, 0);
  const firstDayofWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
  const lasstDayofWeek = lastDate.getDay();

  // 인풋한 달의 마지막 일 
  const lastDay = lastDate.getDate();

  // 해당 달이 총 몇주까지 있는지 
  const lastWeekNo = Math.ceil((firstDayofWeek - 1 + lastDay / 7));
  // 날짜 기준으로 몇 주차 인지
  let weekNo = Math.ceil((firstDayofWeek - 1 + date) / 7);
  
  return weekNo;
}
function MyWeekMission() {
  const [value, onChange] = useState(new Date());
  const [todayMissions, setTodayMissions] = useState([]);
  const [weekMissions, setWeekMissions] = useState([]);
  const [participationRate, setParticipationRate] = useState(0.0);
  const [participation, setParticipation] = useState(0);
  const [solveRate, setSolveRate] = useState(0.0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);
  useEffect(() => {
    let date = new Date();
    setMonth(date.getMonth()+1);
    
    setWeek(getWeek(date.getFullYear(), date.getMonth(), date.getDate()));
    let userJWT = localStorage.getItem("Authorization");
    let userId = localStorage.getItem("userId");
    let urlForWeek = `http://j6c204.p.ssafy.io:8081/v1/mission/week/${userId}`;
    let urlForToday = `http://j6c204.p.ssafy.io:8081/v1/redis/today/${userId}`;
    let total = new Set();
    let participate = new Set();
    let correct = 0;
    let totalLength = 0;
    axios.get(urlForWeek, {
      headers: {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + userJWT
      },
    }).then(res => {
      setWeekMissions(res.data);
      totalLength += res.data.length;
      for (let m = 0; m < res.data.length; m++) {
        let tmpDate = res.data[m].createDate.slice(0, 10);
        total.add(tmpDate);
        if (res.data[m].successDate != null) {
          participate.add(tmpDate);
          correct++;
        }
      }
      
    }).then(res => {
      axios.get(urlForToday, {
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": "Bearer "+userJWT
        },
      }).then(res => {
        setTodayMissions(res.data);
        totalLength += res.data.length;
        for (let m = 0; m < res.data.length; m++) {
          let tmpDate = res.data[m].createDate.slice(0, 10);
          total.add(tmpDate);
          if (res.data[m].successDate != null) {
            participate.add(tmpDate);
            correct++;
          }
        }
        setParticipation(participate.size);
        setParticipationRate((participate.size / total.size * 100).toFixed(2));
        setSolveRate((correct / totalLength * 100).toFixed(2));
      })
    })
    
  }, []);
  return (
    <div>
      <Card className="shadow my-5" style={{ width: "100%" }}>
        <CardBody className="px-5" >
          {/* 미션 그래프 */}
          <h4 className="h4 font-weight-bold">주간 미션 현황({month}월 {week}주차)</h4>
          <div className="progress-wrapper">
            <div className="progress-info">
              <div className="progress-label">
                <h6>참여율</h6>
              </div>
              <div className="progress-percentage">
                <span>{participationRate}%</span>
              </div>
            </div>
            <Progress max="100" value={participationRate} color="default" />
          </div>
          <div className="progress-wrapper">
            <div className="progress-info">
              <div className="progress-label">
                <h6>정답률</h6>
              </div>
              <div className="progress-percentage">
                <span>{solveRate}%</span>
              </div>
            </div>
            <Progress max="100" value={solveRate} />
          </div>
          
          {/* 미션 도표 */}
          <Row className="py-3">
            <Col sm="6">
              <h6 className='font-weight-bold'>참여일 수: {participation}일</h6>
              <h6 className='mt-3 font-weight-bold'>오늘의 미션</h6>
              <table className='table-bordered' style={{ width: "100%" ,textAlign:"center"}}>
                <thead>
                  <tr>
                    <th>문제</th>
                    <th>문제 제목</th>
                    <th>정답</th>
                    <th>미션 생성일</th>
                  </tr>
                </thead>
                <tbody>
                {
                    todayMissions.map(mission =>
                      <tr>
                        <td>{mission.problemDto.problemNum}</td>
                        <td>{mission.problemDto.problemName}</td>
                        <td>
                          {
                            mission.successDate !== null
                              ? <Badge className="text-uppercase ml-1" color="success" pill>O</Badge>
                              : <Badge className="text-uppercase ml-1" color="danger" pill>
                              x
                            </Badge>
                          }
                        </td>
                        <td>{String(mission.createDate).substring(0,10)}</td>
                      </tr>
                      )
                  }
                </tbody>
                </table>
            </Col>
            <Col sm="6">
              <h6 className='font-weight-bold'>정답 비율: {solveRate}%</h6>
              <h6 className='mt-3 font-weight-bold'>지난 미션</h6>
              
              <div style={ {width:"100%",height:"150px",overflow:"auto"}}>
                <table className='table-bordered' style={{ width: "100%" ,textAlign:"center"}}>
                  <thead>
                    <tr>
                      <th>문제</th>
                      <th>문제 제목</th>
                      <th>정답</th>
                      <th>미션 생성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      weekMissions.map(mission =>
                        <tr>
                          <td>{mission.problemDto.problemNum}</td>
                          <td>{mission.problemDto.problemName}</td>
                          <td>
                            {
                              mission.successDate !== null
                                ? <Badge className="text-uppercase ml-1" color="success" pill>O</Badge>
                                : <Badge className="text-uppercase ml-1" color="danger" pill>
                                x
                              </Badge>
                            }
                          </td>
                          <td>{String(mission.createDate).substring(0,10)}</td>
                        </tr>
                        )
                    }
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default MyWeekMission;
