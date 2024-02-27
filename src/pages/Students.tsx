import React, { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import axios from "axios";
import { Item } from "../types/Student.type";

const Students = () => {
  const [students, setStudents] = useState<Item[]>([]);
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [filteredStudents, setFilteredStudents] = useState<Item[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get<Item[]>("http://localhost:3000/students");
      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/students/${id}`);
        setFilteredStudents(filteredStudents.filter((std) => std.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudent(event.target.value);
    filterStudents(event.target.value, selectedGroup);
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
    filterStudents(searchStudent, event.target.value);
  };

  const filterStudents = (search: string, group: string) => {
    const filtered = students.filter(
      (st) =>
        st.name.toLowerCase().includes(search.toLowerCase()) ||
        st.username.toLowerCase().includes(search.toLowerCase()) ||
        st.email.toLowerCase().includes(search.toLowerCase()) ||
        st.group.toLowerCase().includes(search.toLowerCase())
    );

    if (group !== "all") {
      setFilteredStudents(filtered.filter((st) => st.group === group));
    } else {
      setFilteredStudents(filtered);
    }
  };

  return (
    <div className="p-5">
      <div className="flex m-8 justify-between">
        <p className="text-3xl">Students</p>
        <input
          className="w-96 rounded-lg"
          type="search"
          placeholder="Search..."
          value={searchStudent}
          onChange={handleSearchChange}
        />
        <select
          className="rounded-lg"
          name="select"
          id="select"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="all">All</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Design">Design</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>
      </div>
      <Table hoverable style={{ width: "1240px" }}>
        <Table.Head>
          <Table.HeadCell>N/o</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Group</Table.HeadCell>
          <Table.HeadCell className="text-center">Activity</Table.HeadCell>
        </Table.Head>
        {filteredStudents.map((student, index) => (
          <Table.Body className="divide-y" key={student.id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>{student.name}</Table.Cell>
              <Table.Cell>{student.username}</Table.Cell>
              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.group}</Table.Cell>
              <Table.Cell className="flex gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button outline color="warning">
                    Edit
                  </Button>
                  <Button
                    outline
                    color="failure"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default Students;

// {
//   "id": "985629",
//   "name": "Luce Willa",
//   "username": "will",
//   "email": "lucewill@gmail.com",
//   "group": "Design"
// },
// {
//   "id": "564738",
//   "name": "Arthur Kingsley",
//   "username": "arthur",
//   "email": "arthur.kingsley@example.com",
//   "group": "Front-end"
// },
// {
//   "id": "123456",
//   "name": "Beatrice Ashworth",
//   "username": "beatrice",
//   "email": "beatrice.ashworth@example.com",
//   "group": "Design"
// },
// {
//   "id": "345678",
//   "name": "Rupert Faulkner",
//   "username": "rupert",
//   "email": "rupert.faulkner@example.com",
//   "group": "Cyber Security"
// },
// {
//   "id": "890123",
//   "name": "Florence Wainwright",
//   "username": "florence",
//   "email": "florence.wainwright@example.com",
//   "group": "Front-end"
// },
// {
//   "id": "567890",
//   "name": "Cecil Barrett",
//   "username": "cecil",
//   "email": "cecil.barrett@example.com",
//   "group": "Back-end"
// },
// {
//   "id": "234567",
//   "name": "Imogen Worthington",
//   "username": "imogen",
//   "email": "imogen.worthington@example.com",
//   "group": "Design"
// },
// {
//   "id": "901234",
//   "name": "Hugo Warrington",
//   "username": "hugo",
//   "email": "hugo.warrington@example.com",
//   "group": "Cyber Security"
// },
// {
//   "id": "678901",
//   "name": "Matilda Harrington",
//   "username": "matilda",
//   "email": "matilda.harrington@example.com",
//   "group": "Front-end"
// },
// {
//   "id": "456789",
//   "name": "Percy Hargreaves",
//   "username": "percy",
//   "email": "percy.hargreaves@example.com",
//   "group": "Back-end"
// },
// {
//   "id": "345612",
//   "name": "Edith Aldridge",
//   "username": "edith",
//   "email": "edith.aldridge@example.com",
//   "group": "Design"
// }
