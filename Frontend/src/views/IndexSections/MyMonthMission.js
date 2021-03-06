import React, { useEffect, useState } from 'react';
import Badge from 'reactstrap/lib/Badge';
import Calendar from 'react-calendar';
import axios from 'axios';
import '../../assets/css/Calendar.css';
import {
  Card,
  CardBody,
  Row,
  Col,
  Progress,
  Modal,
  Button
} from "reactstrap";
function makeDate(y, m, d) {
  let result = "";
  result += y+"-";
  if (m < 10)
    result += "0";
  result += m + "-";
  if (d < 10)
    result += "0";
  result += d;
  return result;
}
let count = false;
let countForModal = false;
function MyMonthMission() {
  const [value, onChange] = useState(new Date());
  const [participationRate, setParticipationRate] = useState(0.0);
  const [participation, setParticipation] = useState(0);
  const [solveRate, setSolveRate] = useState(0.0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [monthMissions, setMonthMissions] = useState([]);
  const [todayMissions, setTodayMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState([]);
  const [visible, setVisible] = useState(false);
  let curTime = new Date();
  let curYear = curTime.getFullYear();
  let curMonth = curTime.getMonth() + 1;
  let curDate = curTime.getDate();
  function setValues(year, month) {
    let date = new Date();
    if (year === 0 && month === 0) {
      year = date.getFullYear();
      month = date.getMonth()+1;
    }
    setYear(year);
    setMonth(month);
    let isSame = false;
    if (year === date.getFullYear() && month === date.getMonth() + 1)
      isSame = true;
    let total = new Set();
    let participate = new Set();
    let correct = 0;
    let totalCount = 0;
    let userId = localStorage.getItem("userId");
    let userJWT = localStorage.getItem("Authorization");
    let urlForToday = `http://j6c204.p.ssafy.io:8081/v1/redis/today/${userId}`;
    let urlForMonth = `http://j6c204.p.ssafy.io:8081/v1/mission/${year}/${month}/${userId}`;
    axios.get(urlForToday, {
      headers: {
        "Accept":"application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer "+userJWT
      },
    }).then(res => {
      setTodayMissions(res.data);
      if (isSame) {
        totalCount += res.data.length;
        for (let m = 0; m < res.data.length; m++) {
          let tmpDate = res.data[m].createDate.slice(0, 10);
          total.add(tmpDate);
          if (res.data[m].successDate != null) {
            participate.add(tmpDate);
            correct++;
          }
        }  
      }
    }).then(res => {
      axios.get(urlForMonth, {
        headers: {
          "Accept":"application/json;charset=UTF-8",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": "Bearer "+userJWT
        },
      }).then(res => {
        totalCount += res.data.length;
        setMonthMissions(res.data);
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
        setSolveRate((correct / totalCount * 100).toFixed(2));
      })
    })
  }
  useEffect(() => {
    setValues(0, 0);
    return () => {
      count = false;
      countForModal = false;
    }
  }, []);
  useEffect(() => {
    if (!countForModal) {
      countForModal = true;
      return;
    }
    setVisible(true);
  }, [selectedMission]);
  useEffect(() => {
    if (!count) {
      count = true;
      return;
    }
    let tmpYear = value.getFullYear();
    let tmpMonth = value.getMonth() + 1;
    let tmpDate = value.getDate();
    let url = "";
    let myDate = "";
    let userId = localStorage.getItem("userId");
    let userJWT = localStorage.getItem("Authorization");
    if (tmpYear === curYear && tmpMonth === curMonth && tmpDate === curDate) {
      // ?????? ????????? ??????????????? redis?????? ????????????
      url = `http://j6c204.p.ssafy.io:8081/v1/redis/today/${userId}`;
    }
    else {
      url = `http://j6c204.p.ssafy.io:8081/v1/mission/${tmpYear}/${tmpMonth}/${userId}`;
      myDate = makeDate(tmpYear, tmpMonth, tmpDate);
    }
    axios.get(url, {
      headers: {
        "Accept":"application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer "+userJWT
      },
    }).then(res => {
      if (myDate === "") {
        setSelectedMission(res.data);
      }
      else {
        let tmpMissions = [];
        for (let m = 0; m < res.data.length; m++) {
          let tmpDate = res.data[m].createDate.slice(0, 10);
          if (tmpDate === myDate) {
            tmpMissions.push(res.data[m]);
          }
        }
        setSelectedMission(tmpMissions);
      }
    })
    if (year !== tmpYear || month !== tmpMonth)
      setValues(tmpYear, tmpMonth);
  }, [value]);
  return (
    <div>
      <Card className="shadow my-5" style={{ width: "100%" }}>
        <CardBody className="px-5" >
          {/* ?????? ????????? */}
          <h4 className="h4 font-weight-bold">?????? ?????? ??????({year}??? {month}???)</h4>
          <div className="progress-wrapper">
            <div className="progress-info">
              <div className="progress-label">
                <h6>?????????</h6>
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
                <h6>?????????</h6>
              </div>
              <div className="progress-percentage">
                <span>{solveRate}%</span>
              </div>
            </div>
            <Progress max="100" value={solveRate} />
          </div>
          
          {/* ?????? ?????? */}
          <Row className="py-3">
            <Col sm="6">
              <h6 className='font-weight-bold'>????????? ???: {participation}???</h6>
              <h6 className='mt-3 font-weight-bold'>????????? ??????</h6>
              <table className='table-bordered' style={{ width: "100%" , textAlign:"center"}}>
                <thead>
                  <tr>
                    <th>??????</th>
                    <th>?????? ??????</th>
                    <th>??????</th>
                    <th>?????? ?????????</th>
                  </tr>
                </thead>
                <tbody>
                  {todayMissions.map(mission =>
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
                  )}
                </tbody>
                </table>
            </Col>
            <Col sm="6">
              <h6 className='font-weight-bold'>?????? ??????: {solveRate}%</h6>
              <h6 className='mt-3 font-weight-bold'> ??????</h6>
              <div style={ {width:"100%",height:"150px",overflow:"auto"}}>
                <table className='table-bordered' style={{ width: "100%", textAlign:"center"}} >
                  <thead>
                    <tr>
                      <th>??????</th>
                      <th>?????? ??????</th>
                      <th>??????</th>
                      <th>?????? ?????????</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      monthMissions.map(mission =>
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
      <Calendar onChange={onChange} value={value} calendarType="US" className="mb-5" />
      <Modal
        className="modal-dialog-centered"
        isOpen={visible}
        toggle={() => setVisible(prev => !prev)}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            {value.getFullYear()}??? {value.getMonth() + 1}??? {value.getDate()}??? ?????????
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setVisible(prev => !prev)}
          >
            <span aria-hidden={true}>??</span>
          </button>
        </div>
        <div className="modal-body">
          {selectedMission.length === 0
            ? "?????? ????????? ????????? ????????????."
            :
            <table className='table-bordered' style={{ width: "100%", textAlign:"center"}}>
              <thead>
                <tr>
                  <th>??????</th>
                  <th>?????? ??????</th>
                  <th>??????</th>
                  <th>?????? ??????</th>
                </tr>
              </thead>
              <tbody>
                {
                  selectedMission.map(mission =>
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
                      <td>{mission.problemDto.problemAnswer}</td>
                    </tr>
                    )
                }
              </tbody>
            </table>
          }
        </div>
        <div className="modal-footer">
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => setVisible(prev => !prev)}
          >
            ??????
          </Button>
        </div>
      </Modal>
    </div>
    
  );
}

export default MyMonthMission;
