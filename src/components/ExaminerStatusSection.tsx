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
          <p className="section-copy">이번 달 기준 · 6명</p>
        </div>
      </div>

      <div className="table-wrap desktop-only">
        <table className="examiner-table">
          <colgroup>
            <col className="examiner-name-col" />
            <col span={6} className="examiner-metric-col" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="staff-col">시험원</th>
              <th scope="col" className="metric-head">시험 협의중</th>
              <th scope="col" className="metric-head">시험중</th>
              <th scope="col" className="metric-head">성적서 작성중</th>
              <th scope="col" className="metric-head">성적서 발행</th>
              <th scope="col" className="metric-head">성적서 제출</th>
              <th scope="col" className="metric-head">이 달 종료/완료</th>
            </tr>
          </thead>
          <tbody>
            {examiners.map((examiner) => (
              <tr key={examiner.name}>
                <td className="staff-col">
                  <div className="staff-name">{examiner.name}</div>
                  <div className="staff-role">{examiner.role}</div>
                </td>
                <td className="metric-cell">
                  <span className={`count-pill${getTone(examiner.counts.coordination, "coordination")}`}>
                    {examiner.counts.coordination}
                  </span>
                </td>
                <td className="metric-cell">
                  <span className={`count-pill${getTone(examiner.counts.testing, "testing")}`}>
                    {examiner.counts.testing}
                  </span>
                </td>
                <td className="metric-cell">
                  <span className={`count-pill${getTone(examiner.counts.reporting, "reporting")}`}>
                    {examiner.counts.reporting}
                  </span>
                </td>
                <td className="metric-cell">
                  <span className={`count-pill${getTone(examiner.counts.issued, "issued")}`}>
                    {examiner.counts.issued}
                  </span>
                </td>
                <td className="metric-cell">
                  <span className={`count-pill${getTone(examiner.counts.submitted, "submitted")}`}>
                    {examiner.counts.submitted}
                  </span>
                </td>
                <td className="metric-cell">
                  <span className={`count-pill${getTone(examiner.counts.completed, "completed")}`}>
                    {examiner.counts.completed}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-stack mobile-only">
        {examiners.map((examiner) => (
          <article className="mobile-card" key={examiner.name}>
            <div className="mobile-card-head">
              <div>
                <div className="staff-name">{examiner.name}</div>
                <div className="staff-role">{examiner.role}</div>
              </div>
            </div>

            <div className="mobile-metric-grid">
              <div className="mobile-metric-cell">
                <span>시험 협의중</span>
                <strong className={`count-pill${getTone(examiner.counts.coordination, "coordination")}`}>
                  {examiner.counts.coordination}
                </strong>
              </div>
              <div className="mobile-metric-cell">
                <span>시험중</span>
                <strong className={`count-pill${getTone(examiner.counts.testing, "testing")}`}>
                  {examiner.counts.testing}
                </strong>
              </div>
              <div className="mobile-metric-cell">
                <span>성적서 작성중</span>
                <strong className={`count-pill${getTone(examiner.counts.reporting, "reporting")}`}>
                  {examiner.counts.reporting}
                </strong>
              </div>
              <div className="mobile-metric-cell">
                <span>성적서 발행</span>
                <strong className={`count-pill${getTone(examiner.counts.issued, "issued")}`}>
                  {examiner.counts.issued}
                </strong>
              </div>
              <div className="mobile-metric-cell">
                <span>성적서 제출</span>
                <strong className={`count-pill${getTone(examiner.counts.submitted, "submitted")}`}>
                  {examiner.counts.submitted}
                </strong>
              </div>
              <div className="mobile-metric-cell">
                <span>이 달 종료/완료</span>
                <strong className={`count-pill${getTone(examiner.counts.completed, "completed")}`}>
                  {examiner.counts.completed}
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
