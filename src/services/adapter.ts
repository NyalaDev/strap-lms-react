import { Classroom, APIResponse, User } from '../types/api.types';

const DataAdapter = {
  apiUser2AppUser(user: APIResponse): User {
    if (!user.data) return {} as User;
    return { id: user.data.id, ...user.data.attributes } as User;
  },

  apiClasses2AppClasses(response: { data: any[] }): Classroom[] {
    return response.data.map(item =>
      DataAdapter.apiClass2AppClass({ data: item })
    );
  },
  apiClass2AppClass(response: APIResponse): Classroom {
    const { data } = response;
    const { attributes } = data;
    const { manager, students, tutorials } = attributes;
    const classroom = {
      id: data.id,
      ...attributes,
      manager: DataAdapter.apiUser2AppUser(manager),
      students: students.data.map((student: { id: any; attributes: any }) => ({
        id: student.id,
        ...student.attributes,
      })),
      tutorials: tutorials.data.map(
        (tutorial: { id: any; attributes: any }) => ({
          id: tutorial.id,
          ...tutorial.attributes,
        })
      ),
    };

    return classroom as Classroom;
  },
};

export { DataAdapter };
