// import {useAppAsyncDispatch} from '@hooks';
// import {action} from '@store';

// const useAuth = () => {
//   const setAuthStudent = useAppAsyncDispatch(
//     action.AuthAction.studentLoginAction,
//   );
//   const setAuthTeacher = useAppAsyncDispatch(
//     action.AuthAction.teacherLoginAction,
//   );

//   const onSubmit = async (param?: any) => {
//     console.log(param, 'PARAM');
//     try {
//       const student = await setAuthStudent({
//         payload: {data: {nis: param.nis, password: param.password}},
//       });

//       const teacher = await setAuthTeacher({
//         payload: {data: {nip: param.nip, password: param.password}},
//       });

//       console.log(student, 'STUDENT');
//       console.log(teacher, 'TEACHER');
//     } catch (e) {}
//   };

//   return {
//     onSubmit,
//   };
// };

// export default useAuth;
