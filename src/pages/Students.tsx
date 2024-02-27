import { Button, Table } from "flowbite-react";
import useStudent from "../app/useStudent";
import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../types/Student.type";

const Students = () => {
  const { loading, students, error, getStudents } = useStudent();
  useEffect(() => {
    getStudents();
  }, []);

  // SEARCH
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [searchedStudents, setSearchedStudents] = useState<Item[]>([]);

  useEffect(() => {
    axios
      .get<Item[]>("http://localhost:3000/students")
      .then((res) => {
        setSearchedStudents(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudent(event.target.value);
  };

  const filteredStudents = searchedStudents.filter(
    (st) =>
      st.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      st.username.toLowerCase().includes(searchStudent.toLowerCase()) ||
      st.email.toLowerCase().includes(searchStudent.toLowerCase()) ||
      st.group.toLowerCase().includes(searchStudent.toLowerCase())
  );
  // SEARCH

  return (
    <div className="p-5 ">
      <div className="flex m-8 justify-between">
        <p className="text-3xl">Students</p>
        <input
          className="w-96 rounded-lg"
          type="search"
          placeholder="Search..."
          value={searchStudent}
          onChange={handleSearchChange}
        />
        <select className="rounded-lg" name="select" id="select">
          <option value="all">All</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Design">Design</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>
      </div>
      <Table hoverable style={{ width: "1240px" }}>
        {loading ? <h1>Loading..</h1> : null}
        <Table.Head>
          <Table.HeadCell>N/o</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Group</Table.HeadCell>
          <Table.HeadCell className="text-center">Activity</Table.HeadCell>
          <Table.HeadCell className="items-end"></Table.HeadCell>
        </Table.Head>
        {students.length > 0
          ? filteredStudents.map((student, i) => (
              <Table.Body className="divide-y" key={student.id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </Table.Cell>
                  <Table.Cell>{student.name}</Table.Cell>
                  <Table.Cell>{student.username}</Table.Cell>
                  <Table.Cell>{student.email}</Table.Cell>
                  <Table.Cell>{student.group}</Table.Cell>
                  <Table.Cell className="flex gap-3  ">
                    <div className="flex flex-wrap gap-2">
                      <Button outline color="warning">
                        Edit
                      </Button>
                      <Button outline color="failure">
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))
          : null}

        {error ? <h1>{error.message}</h1> : null}
      </Table>
    </div>
  );
};

export default Students;

// ,
//     {
//       "id": "568479",
//       "name": "Harry Potter",
//       "username": "harry",
//       "email": "poharry@gmail.com",
//       "group": "Front-end"
//     },
//     {
//       "id": "845293",
//       "name": "Mike Thompson",
//       "username": "thomp",
//       "email": "mikethomp@gmail.com",
//       "group": "Cyber Security"
//     }
