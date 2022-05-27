import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import '../../assets/css/Calendar.css';
import Badge from 'reactstrap/lib/Badge';
import {
  Button,
  Modal
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
function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const [selectedMission, setSelectedMission] = useState([]);
  const [visible, setVisible] = useState(false);
  let curTime = new Date();
  let curYear = curTime.getFullYear();
  let curMonth = curTime.getMonth() + 1;
  let curDate = curTime.getDate();
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
      // 오늘 날짜를 클릭했으면 redis에서 가져오기
      url = `http://j6c204.p.ssafy.io:8081/v1/redis/today/${userId}`;
    }
    else {
      url = `http://j6c204.p.ssafy.io:8081/v1/mission/${userId}/${tmpYear}/${tmpMonth}`;
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
    
  }, [value]);
  useEffect(() => {
    if (!countForModal) {
      countForModal = true;
      return;
    }
    setVisible(true);
  }, [selectedMission]);
  useEffect(() => {
    return () => {
      count = false;
      countForModal = false;
    }
  }, []);
  
  return (
    <div className='my-5'>
      <Calendar onChange={onChange} value={value} calendarType="US" />
      <Modal
        className="modal-dialog-centered"
        isOpen={visible}
        toggle={() => setVisible(prev => !prev)}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            {value.getFullYear()}년 {value.getMonth() + 1}월 {value.getDate()}일 미션들
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setVisible(prev => !prev)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          {selectedMission.length === 0
            ? "해당 날짜에 미션이 없습니다."
            :
            <table className='table-bordered' style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>문제</th>
                  <th>문제 제목</th>
                  <th>정답</th>
                  <th>정답 비율</th>
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
            닫기
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MyCalendar;
