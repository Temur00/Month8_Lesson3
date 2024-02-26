import { Button, Table } from "flowbite-react";

const Students = () => {
  return (
    <div className="p-8 ">
      <Table hoverable style={{ width: "1240px" }}>
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
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              1
            </Table.Cell>
            <Table.Cell>Robert Wilson</Table.Cell>
            <Table.Cell>robert</Table.Cell>
            <Table.Cell>robert@gmail.com</Table.Cell>
            <Table.Cell>Frontend</Table.Cell>
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
      </Table>
    </div>
  );
};

export default Students;
