import { useState } from "react";
import "./App.css";

function App() {
  // 🔹 Student Info State
  const [student, setStudent] = useState({
    name: "",
    prn: "",
    motherName: "",
    year: "",
    branch: "",
    division: ""
  });

  // 🔹 Subjects State
  const [subjects, setSubjects] = useState([
    { mse: "", ese: "", total: 0 },
    { mse: "", ese: "", total: 0 },
    { mse: "", ese: "", total: 0 },
    { mse: "", ese: "", total: 0 }
  ]);

  const years = ["FY", "SY", "TY", "BTech"];

  const divisions = Array.from({ length: 12 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const branches = [
    "Computer Engineering",
    "Information Technology",
    "CSE (AI & ML)",
    "CSE (Data Science)",
    "Electronics & Telecommunication",
    "Mechanical Engineering",
    "Civil Engineering"
  ];

  // 🔹 Handle Student Input
  const handleStudentChange = (e) => {
    const { name, value } = e.target;

    if (name === "prn") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 8) return;
    }

    setStudent({ ...student, [name]: value });
  };

  // 🔹 Handle Marks Input
  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;

    const mse = parseFloat(updated[index].mse) || 0;
    const ese = parseFloat(updated[index].ese) || 0;

    updated[index].total = (mse * 0.3 + ese * 0.7).toFixed(2);

    setSubjects(updated);
  };

  // 🔹 Average Calculation
  const average =
    subjects.length > 0
      ? subjects.reduce(
          (sum, sub) => sum + (parseFloat(sub.total) || 0),
          0
        ) / subjects.length
      : 0;

  return (
    <div className="container">
      {/* 🔥 HEADER */}
      <header className="header">
        <h1>Vishwakarma Institute of Technology</h1>
        <p>Semester Result Calculator</p>
      </header>

      {/* 🔹 STUDENT FORM */}
      <div className="student-form">
        <h2>Student Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleStudentChange}
        />

        <input
          type="text"
          name="prn"
          placeholder="PRN (8 digits)"
          value={student.prn}
          onChange={handleStudentChange}
        />

        <input
          type="text"
          name="motherName"
          placeholder="Mother's Name"
          value={student.motherName}
          onChange={handleStudentChange}
        />

        <select
          name="year"
          value={student.year}
          onChange={handleStudentChange}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <select
          name="branch"
          value={student.branch}
          onChange={handleStudentChange}
        >
          <option value="">Branch</option>
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select
          name="division"
          value={student.division}
          onChange={handleStudentChange}
        >
          <option value="">Division</option>
          {divisions.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 🔹 SUBJECTS */}
      <h2>Subjects</h2>

      {subjects.map((sub, i) => (
        <div className="card" key={i}>
          <h3>Subject {i + 1}</h3>

          <input
            type="number"
            min="0"
            max="30"
            placeholder="MSE (out of 30)"
            value={sub.mse}
            onChange={(e) =>
              handleChange(i, "mse", e.target.value)
            }
          />

          <input
            type="number"
            min="0"
            max="70"
            placeholder="ESE (out of 70)"
            value={sub.ese}
            onChange={(e) =>
              handleChange(i, "ese", e.target.value)
            }
          />

          <p>Total: {sub.total}</p>
        </div>
      ))}

      {/* 🔹 RESULT */}
      <h2>Overall Average: {average.toFixed(2)}</h2>

      {/* 🔥 FOOTER */}
      <footer className="footer">
        <p>Made by Rajanee 💙</p>
      </footer>
    </div>
  );
}

export default App;