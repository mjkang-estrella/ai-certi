import { examiners } from "../data/dashboard";

function getTone(value: number, emphasis: "coordination" | "testing" | "reporting" | "issued" | "submitted" | "completed") {
  if (emphasis === "completed" && value >= 3) return " good";
  if ((emphasis === "coordination" || emphasis === "testing") && value >= 4) return " danger";
  if (emphasis === "reporting" && value >= 4) return " warn";
  if (value >= 3) return " warn";
  return "";
}

export function ExaminerStatusSection() {
  return (
    <div className="card">
      <div className="section-head">
        <div>
          <h2 className="section-title">시험원별 진행상황</h2>
          <p className="section-copy">
            각 시험원별로 시험 협의중, 시험중, 성적서 작성중, 성적서 발행, 성적서 제출, 이 달 종료/완료를
            한 줄에서 비교한다.
          </p>
        </div>
        <div className="section-link">전체 담당 현황 보기</div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="staff-col">시험원</th>
              <th>시험 협의중</th>
              <th>시험중</th>
              <th>성적서 작성중</th>
              <th>성적서 발행</th>
              <th>성적서 제출</th>
              <th>이 달 종료/완료</th>
            </tr>
          </thead>
          <tbody>
            {examiners.map((examiner) => (
              <tr key={examiner.name}>
                <td className="staff-col">
                  <div className="staff-name">{examiner.name}</div>
                  <div className="staff-role">{examiner.role}</div>
                </td>
                <td>
                  <span className={`count-pill${getTone(examiner.counts.coordination, "coordination")}`}>
                    {examiner.counts.coordination}
                  </span>
                </td>
                <td>
                  <span className={`count-pill${getTone(examiner.counts.testing, "testing")}`}>
                    {examiner.counts.testing}
                  </span>
                </td>
                <td>
                  <span className={`count-pill${getTone(examiner.counts.reporting, "reporting")}`}>
                    {examiner.counts.reporting}
                  </span>
                </td>
                <td>
                  <span className={`count-pill${getTone(examiner.counts.issued, "issued")}`}>
                    {examiner.counts.issued}
                  </span>
                </td>
                <td>
                  <span className={`count-pill${getTone(examiner.counts.submitted, "submitted")}`}>
                    {examiner.counts.submitted}
                  </span>
                </td>
                <td>
                  <span className={`count-pill${getTone(examiner.counts.completed, "completed")}`}>
                    {examiner.counts.completed}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

