const Student = function (newName, newEmail) {
  const name = newName;
  const email = newEmail;
  const homeworkResults = [];
  this.getName = () => name;
  this.getEmail = () => email;
  this.addHomeworkResult = (topic, success) => {
    homeworkResults.push({'topic' : topic, 'success' : success});
  }
  this.getHomeworkResults = () => homeworkResults;
}

const FrontendLab = function (students, failedLimit) {
  const failedHomeworksLimit = failedLimit;
  let studentsList = [];

  function setStudentsList (students) {
    for(let student of students) {
      if (student) {
        let newStudent = new Student(student.name, student.email);
        newStudent['failedHomeworks'] = 0;
        studentsList.push(newStudent);
      }
    }
  }
  setStudentsList(students);
  this.printStudentsList = () => {
    for (let student of studentsList) {
        console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
        console.log(student.getHomeworkResults());
    }
  };
  this.addHomeworkResults = (homeworkResults) => {
    if(!homeworkResults) {
      return ;
    }
    for(let studentResult of homeworkResults.results) {
      let st = studentsList.find( student => student.getEmail() === studentResult['email']);
      st.failedHomeworks += studentResult.success ? 0 : 1;
      st.addHomeworkResult(homeworkResults.topic, studentResult.success);
    }
  }
  this.printStudentsEligibleForTest = () => {
    for(let student of studentsList) {
      if (student.failedHomeworks <= failedHomeworksLimit) {
        console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
      }
    }
  }
}
