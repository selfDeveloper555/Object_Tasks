// 1. Создать систему управления студентами и курсами.
const universitySistems = {
  student: [],
  studentsId: 0,
  courses: [
    { id: 0, name: "JS" },
    { id: 1, name: "Python" },
    { id: 2, name: "C++" },
    { id: 3, name: "Java" },
    { id: 4, name: "C#" },
  ],
  // 2. Добавить студента и курс
  addStudent: function (name, age, courseName) {
    const studentCourses = courseName
      .map((courseName) => {
        const foundCourse = this.courses.find(
          (course) => course.name === courseName
        );
        if (foundCourse) {
          return {
            courseId: foundCourse.id,
            courseName: foundCourse.name,
          };
        } else {
          console.log(`Курс ${courseName} не найден`);
          return null;
        }
      })
      .filter((course) => course != null);
    if (studentCourses.length > 0) {
      this.student.push({
        name,
        age,
        courses: studentCourses,
        id: this.studentsId++,
      });
    } else {
      console.log("course not found");
    }
  },

  // 3. удалить студента
  removeStudent: function (name) {
    this.student = this.student.filter((student) => student.name != name);
  },
  // 4. изменить информацию студента
  renameInfoStudent: function (name, newName, newAge, newCourse) {
    const foundStudent = this.student.find((student) => student.name === name);
    if (foundStudent) {
      foundStudent.name = newName;
      foundStudent.age = newAge;

      const studentCourses = newCourse
        .map((courseName) => {
          const foundCourse = this.courses.find(
            (course) => course.name === courseName
          );
          if (foundCourse) {
            return { courseId: foundCourse.id, courseName: foundCourse.name };
          } else {
            console.log(`course ${newCourse} not found`);
            return null;
          }
        })
        .filter((course) => course != null);
      foundStudent.courses = studentCourses;
    } else {
      console.log(`student ${name} not found`);
    }
  },
  // 5. получить список всех студентов и курсов
  getListfullStudents: function () {
    return this.student;
  },
  // 6. получить информацию о студенте
  getStudent: function (name, id) {
    return this.student.find(
      (student) => student.name === name || student.id === id
    );
  },
  // 7. добавить студента на курс
  addStudentToCourse: function (studentName, courseName) {
    const student = this.student.find(
      (student) => student.name === studentName
    );
    const course = this.courses.find((course) => course.name === courseName);

    if (!student || !course) {
      console.log("Студент или курс не найден");
      return;
    }
    if (!student.courses.find((course) => course.courseId === course.id)) {
      student.courses.push({ courseId: course.id, courseName: course.name });
    }
  },

  // 8. удалить студента с курса
  removeStudentToCourse: function (studentName, courseName) {
    const student = this.student.find(
      (student) => student.name === studentName
    );
    const course = this.courses.find((course) => course.name === courseName);
    if (student && course) {
      student.courses = student.courses.filter(
        (studentCourse) => studentCourse.courseName !== courseName
      );
    } else {
      console.log("student not foudn");
    }
  },

  // 9. оплучение списка всех курсов определеного студента
  getStudentCourses: function (studentName) {
    const student = this.student.find(
      (student) => student.name === studentName
    );
    if (studentName) {
      return student.courses;
    } else {
      console.log("student not found");
    }
  },
  // 10. получить список всех студентов на определенном курсе
  getListStudentsOnCourse: function (courseName) {
    const course = this.courses.find((course) => course.name === courseName);
    if (course) {
      return this.student.filter((student) =>
        student.courses.some((course) => course.courseName === courseName)
      );
    } else {
      console.log("course not found");
    }
  },

  // 11.добавить оценки студентам за курсы
  addMarkToStudent: function (studentName, courseName, mark) {
    const student = this.student.find(
      (student) => student.name === studentName
    );
    const course = this.courses.find((course) => course.name === courseName);
    if (student && course) {
      const studentCourse = student.courses.find(
        (studentCourse) => studentCourse.courseName === courseName
      );
      if (studentCourse) {
        studentCourse.mark = mark;
      } else {
        console.log("course not found");
      }
    } else {
      console.log("student not found");
    }
  },

  // 12. получение среднего балла студента по всем курсам
  getGPAStudent: function (studentName) {
    const student = this.student.find(
      (student) => student.name === studentName
    );
    if (student) {
      const totalMark = student.courses.reduce(
        (sum, course) => sum + course.mark,
        0
      );
      return totalMark / student.courses.length;
    } else {
      console.log("student not found");
    }
  },

  // 13. получение списка всех оценок студента по всем курсам
  getListMarksStudent: function (studentName) {
    const student = this.student.find(
      (student) => student.name === studentName
    );
    if (student) {
      return student.courses.map((course) => ({
        name: course.courseName,
        mark: course.mark,
      }));
    } else {
      console.log("student not found");
    }
  },
};

// манипуляции со студентами и курсами-------------
universitySistems.addStudent("John", 20, ["JS", "Python"]);
universitySistems.addStudent("Any", 20, ["C#", "C++"]);
universitySistems.renameInfoStudent("John", "Bob", 21, ["JS", "C++", "Java"]);
universitySistems.addStudentToCourse("Any", "JS");
universitySistems.addMarkToStudent("Any", "JS", 5);
universitySistems.addMarkToStudent("Any", "C#", 4);
universitySistems.addMarkToStudent("Any", "C++", 3);
universitySistems.addMarkToStudent("Bob", "JS", 5);
universitySistems.addMarkToStudent("Bob", "C++", 2);
universitySistems.addMarkToStudent("Bob", "Java", 5);

// консольные вызовы--------------------------------
console.log(universitySistems.getListfullStudents());
console.log(universitySistems.getStudentCourses("Bob"));
console.log(universitySistems.getListStudentsOnCourse("JS"));
console.log(universitySistems.getGPAStudent("Any"));
console.log(universitySistems.getGPAStudent("Bob"));
console.log(universitySistems.getListMarksStudent("Any"));
