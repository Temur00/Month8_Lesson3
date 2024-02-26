import { Button, Table } from "flowbite-react";
import useStudent from "../app/useStudent";
import { useEffect } from "react";

const Students = () => {
  const { loading, students, error, getStudents } = useStudent();
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="p-8 ">
      <Table hoverable style={{ width: "1240px" }}>
        {loading ? <h1>Loading..</h1> : null}
        <Table.Head>
          <Table.HeadCell>N/o</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Group</Table.HeadCell>
          <Table.HeadCell className="text-center">Activity</Table.HeadCell>
          <Table.HeadCell className="items-end">
            {/* <span className="sr-only">Edit</span>
              <span className="sr-only">Delete</span> */}
          </Table.HeadCell>
        </Table.Head>
        {students.length > 0
          ? students.map((student, i) => (
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
