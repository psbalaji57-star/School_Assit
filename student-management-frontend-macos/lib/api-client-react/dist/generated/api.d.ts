import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Attendance, AttendanceInput, Class, ClassInput, Dashboard, HealthStatus, Leave, LeaveInput, LeaveUpdate, ListAttendanceParams, ListLeavesParams, ListPerformanceParams, ListStudentsParams, Performance, PerformanceInput, SensorAttendanceInput, Student, StudentInput, StudentUpdate } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDashboardUrl: () => string;
/**
 * @summary Get dashboard overview
 */
export declare const getDashboard: (options?: Parameters<typeof customFetch>[1]) => Promise<Dashboard>;
export declare const getGetDashboardQueryKey: () => readonly ["/api/dashboard"];
export declare const getGetDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboard>>>;
export type GetDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard overview
 */
export declare function useGetDashboard<TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListStudentsUrl: (params?: ListStudentsParams) => string;
/**
 * @summary List students
 */
export declare const listStudents: (params?: ListStudentsParams, options?: Parameters<typeof customFetch>[1]) => Promise<Student[]>;
export declare const getListStudentsQueryKey: (params?: ListStudentsParams) => readonly ["/api/students", ...ListStudentsParams[]];
export declare const getListStudentsQueryOptions: <TData = Awaited<ReturnType<typeof listStudents>>, TError = ErrorType<unknown>>(params?: ListStudentsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStudents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listStudents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListStudentsQueryResult = NonNullable<Awaited<ReturnType<typeof listStudents>>>;
export type ListStudentsQueryError = ErrorType<unknown>;
/**
 * @summary List students
 */
export declare function useListStudents<TData = Awaited<ReturnType<typeof listStudents>>, TError = ErrorType<unknown>>(params?: ListStudentsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStudents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateStudentUrl: () => string;
/**
 * @summary Create a student
 */
export declare const createStudent: (studentInput: StudentInput, options?: Parameters<typeof customFetch>[1]) => Promise<Student>;
export declare const getCreateStudentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createStudent>>, TError, {
        data: BodyType<StudentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createStudent>>, TError, {
    data: BodyType<StudentInput>;
}, TContext>;
export type CreateStudentMutationResult = NonNullable<Awaited<ReturnType<typeof createStudent>>>;
export type CreateStudentMutationBody = BodyType<StudentInput>;
export type CreateStudentMutationError = ErrorType<unknown>;
/**
* @summary Create a student
*/
export declare const useCreateStudent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createStudent>>, TError, {
        data: BodyType<StudentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createStudent>>, TError, {
    data: BodyType<StudentInput>;
}, TContext>;
export declare const getGetStudentUrl: (id: number) => string;
/**
 * @summary Get a student
 */
export declare const getStudent: (id: number, options?: Parameters<typeof customFetch>[1]) => Promise<Student>;
export declare const getGetStudentQueryKey: (id: number) => readonly [`/api/students/${number}`];
export declare const getGetStudentQueryOptions: <TData = Awaited<ReturnType<typeof getStudent>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStudent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStudent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStudentQueryResult = NonNullable<Awaited<ReturnType<typeof getStudent>>>;
export type GetStudentQueryError = ErrorType<void>;
/**
 * @summary Get a student
 */
export declare function useGetStudent<TData = Awaited<ReturnType<typeof getStudent>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStudent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateStudentUrl: (id: number) => string;
/**
 * @summary Update a student
 */
export declare const updateStudent: (id: number, studentUpdate: StudentUpdate, options?: Parameters<typeof customFetch>[1]) => Promise<Student>;
export declare const getUpdateStudentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateStudent>>, TError, {
        id: number;
        data: BodyType<StudentUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateStudent>>, TError, {
    id: number;
    data: BodyType<StudentUpdate>;
}, TContext>;
export type UpdateStudentMutationResult = NonNullable<Awaited<ReturnType<typeof updateStudent>>>;
export type UpdateStudentMutationBody = BodyType<StudentUpdate>;
export type UpdateStudentMutationError = ErrorType<unknown>;
/**
* @summary Update a student
*/
export declare const useUpdateStudent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateStudent>>, TError, {
        id: number;
        data: BodyType<StudentUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateStudent>>, TError, {
    id: number;
    data: BodyType<StudentUpdate>;
}, TContext>;
export declare const getDeleteStudentUrl: (id: number) => string;
/**
 * @summary Delete a student
 */
export declare const deleteStudent: (id: number, options?: Parameters<typeof customFetch>[1]) => Promise<void>;
export declare const getDeleteStudentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteStudent>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteStudent>>, TError, {
    id: number;
}, TContext>;
export type DeleteStudentMutationResult = NonNullable<Awaited<ReturnType<typeof deleteStudent>>>;
export type DeleteStudentMutationError = ErrorType<unknown>;
/**
* @summary Delete a student
*/
export declare const useDeleteStudent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteStudent>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteStudent>>, TError, {
    id: number;
}, TContext>;
export declare const getListAttendanceUrl: (params?: ListAttendanceParams) => string;
/**
 * @summary List attendance records
 */
export declare const listAttendance: (params?: ListAttendanceParams, options?: Parameters<typeof customFetch>[1]) => Promise<Attendance[]>;
export declare const getListAttendanceQueryKey: (params?: ListAttendanceParams) => readonly ["/api/attendance", ...ListAttendanceParams[]];
export declare const getListAttendanceQueryOptions: <TData = Awaited<ReturnType<typeof listAttendance>>, TError = ErrorType<unknown>>(params?: ListAttendanceParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttendance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAttendance>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAttendanceQueryResult = NonNullable<Awaited<ReturnType<typeof listAttendance>>>;
export type ListAttendanceQueryError = ErrorType<unknown>;
/**
 * @summary List attendance records
 */
export declare function useListAttendance<TData = Awaited<ReturnType<typeof listAttendance>>, TError = ErrorType<unknown>>(params?: ListAttendanceParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttendance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAttendanceUrl: () => string;
/**
 * @summary Record attendance
 */
export declare const createAttendance: (attendanceInput: AttendanceInput, options?: Parameters<typeof customFetch>[1]) => Promise<Attendance>;
export declare const getCreateAttendanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAttendance>>, TError, {
        data: BodyType<AttendanceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAttendance>>, TError, {
    data: BodyType<AttendanceInput>;
}, TContext>;
export type CreateAttendanceMutationResult = NonNullable<Awaited<ReturnType<typeof createAttendance>>>;
export type CreateAttendanceMutationBody = BodyType<AttendanceInput>;
export type CreateAttendanceMutationError = ErrorType<unknown>;
/**
* @summary Record attendance
*/
export declare const useCreateAttendance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAttendance>>, TError, {
        data: BodyType<AttendanceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAttendance>>, TError, {
    data: BodyType<AttendanceInput>;
}, TContext>;
export declare const getRecordSensorAttendanceUrl: () => string;
/**
 * @summary Record attendance from an RFID, NFC, or ID sensor
 */
export declare const recordSensorAttendance: (sensorAttendanceInput: SensorAttendanceInput, options?: Parameters<typeof customFetch>[1]) => Promise<Attendance>;
export declare const getRecordSensorAttendanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof recordSensorAttendance>>, TError, {
        data: BodyType<SensorAttendanceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof recordSensorAttendance>>, TError, {
    data: BodyType<SensorAttendanceInput>;
}, TContext>;
export type RecordSensorAttendanceMutationResult = NonNullable<Awaited<ReturnType<typeof recordSensorAttendance>>>;
export type RecordSensorAttendanceMutationBody = BodyType<SensorAttendanceInput>;
export type RecordSensorAttendanceMutationError = ErrorType<unknown>;
/**
* @summary Record attendance from an RFID, NFC, or ID sensor
*/
export declare const useRecordSensorAttendance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof recordSensorAttendance>>, TError, {
        data: BodyType<SensorAttendanceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof recordSensorAttendance>>, TError, {
    data: BodyType<SensorAttendanceInput>;
}, TContext>;
export declare const getListPerformanceUrl: (params?: ListPerformanceParams) => string;
/**
 * @summary List performance records
 */
export declare const listPerformance: (params?: ListPerformanceParams, options?: Parameters<typeof customFetch>[1]) => Promise<Performance[]>;
export declare const getListPerformanceQueryKey: (params?: ListPerformanceParams) => readonly ["/api/performance", ...ListPerformanceParams[]];
export declare const getListPerformanceQueryOptions: <TData = Awaited<ReturnType<typeof listPerformance>>, TError = ErrorType<unknown>>(params?: ListPerformanceParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPerformance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listPerformance>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPerformanceQueryResult = NonNullable<Awaited<ReturnType<typeof listPerformance>>>;
export type ListPerformanceQueryError = ErrorType<unknown>;
/**
 * @summary List performance records
 */
export declare function useListPerformance<TData = Awaited<ReturnType<typeof listPerformance>>, TError = ErrorType<unknown>>(params?: ListPerformanceParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPerformance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreatePerformanceUrl: () => string;
/**
 * @summary Add marks
 */
export declare const createPerformance: (performanceInput: PerformanceInput, options?: Parameters<typeof customFetch>[1]) => Promise<Performance>;
export declare const getCreatePerformanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPerformance>>, TError, {
        data: BodyType<PerformanceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPerformance>>, TError, {
    data: BodyType<PerformanceInput>;
}, TContext>;
export type CreatePerformanceMutationResult = NonNullable<Awaited<ReturnType<typeof createPerformance>>>;
export type CreatePerformanceMutationBody = BodyType<PerformanceInput>;
export type CreatePerformanceMutationError = ErrorType<unknown>;
/**
* @summary Add marks
*/
export declare const useCreatePerformance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPerformance>>, TError, {
        data: BodyType<PerformanceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPerformance>>, TError, {
    data: BodyType<PerformanceInput>;
}, TContext>;
export declare const getListLeavesUrl: (params?: ListLeavesParams) => string;
/**
 * @summary List leave requests
 */
export declare const listLeaves: (params?: ListLeavesParams, options?: Parameters<typeof customFetch>[1]) => Promise<Leave[]>;
export declare const getListLeavesQueryKey: (params?: ListLeavesParams) => readonly ["/api/leaves", ...ListLeavesParams[]];
export declare const getListLeavesQueryOptions: <TData = Awaited<ReturnType<typeof listLeaves>>, TError = ErrorType<unknown>>(params?: ListLeavesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeaves>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLeaves>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLeavesQueryResult = NonNullable<Awaited<ReturnType<typeof listLeaves>>>;
export type ListLeavesQueryError = ErrorType<unknown>;
/**
 * @summary List leave requests
 */
export declare function useListLeaves<TData = Awaited<ReturnType<typeof listLeaves>>, TError = ErrorType<unknown>>(params?: ListLeavesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeaves>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateLeaveUrl: () => string;
/**
 * @summary Create a leave request
 */
export declare const createLeave: (leaveInput: LeaveInput, options?: Parameters<typeof customFetch>[1]) => Promise<Leave>;
export declare const getCreateLeaveMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLeave>>, TError, {
        data: BodyType<LeaveInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLeave>>, TError, {
    data: BodyType<LeaveInput>;
}, TContext>;
export type CreateLeaveMutationResult = NonNullable<Awaited<ReturnType<typeof createLeave>>>;
export type CreateLeaveMutationBody = BodyType<LeaveInput>;
export type CreateLeaveMutationError = ErrorType<unknown>;
/**
* @summary Create a leave request
*/
export declare const useCreateLeave: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLeave>>, TError, {
        data: BodyType<LeaveInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLeave>>, TError, {
    data: BodyType<LeaveInput>;
}, TContext>;
export declare const getUpdateLeaveUrl: (id: number) => string;
/**
 * @summary Approve or reject a leave request
 */
export declare const updateLeave: (id: number, leaveUpdate: LeaveUpdate, options?: Parameters<typeof customFetch>[1]) => Promise<Leave>;
export declare const getUpdateLeaveMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLeave>>, TError, {
        id: number;
        data: BodyType<LeaveUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateLeave>>, TError, {
    id: number;
    data: BodyType<LeaveUpdate>;
}, TContext>;
export type UpdateLeaveMutationResult = NonNullable<Awaited<ReturnType<typeof updateLeave>>>;
export type UpdateLeaveMutationBody = BodyType<LeaveUpdate>;
export type UpdateLeaveMutationError = ErrorType<unknown>;
/**
* @summary Approve or reject a leave request
*/
export declare const useUpdateLeave: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLeave>>, TError, {
        id: number;
        data: BodyType<LeaveUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateLeave>>, TError, {
    id: number;
    data: BodyType<LeaveUpdate>;
}, TContext>;
export declare const getListClassesUrl: () => string;
/**
 * @summary List classes
 */
export declare const listClasses: (options?: Parameters<typeof customFetch>[1]) => Promise<Class[]>;
export declare const getListClassesQueryKey: () => readonly ["/api/classes"];
export declare const getListClassesQueryOptions: <TData = Awaited<ReturnType<typeof listClasses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listClasses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listClasses>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListClassesQueryResult = NonNullable<Awaited<ReturnType<typeof listClasses>>>;
export type ListClassesQueryError = ErrorType<unknown>;
/**
 * @summary List classes
 */
export declare function useListClasses<TData = Awaited<ReturnType<typeof listClasses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listClasses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateClassUrl: () => string;
/**
 * @summary Create a class
 */
export declare const createClass: (classInput: ClassInput, options?: Parameters<typeof customFetch>[1]) => Promise<Class>;
export declare const getCreateClassMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createClass>>, TError, {
        data: BodyType<ClassInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createClass>>, TError, {
    data: BodyType<ClassInput>;
}, TContext>;
export type CreateClassMutationResult = NonNullable<Awaited<ReturnType<typeof createClass>>>;
export type CreateClassMutationBody = BodyType<ClassInput>;
export type CreateClassMutationError = ErrorType<unknown>;
/**
* @summary Create a class
*/
export declare const useCreateClass: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createClass>>, TError, {
        data: BodyType<ClassInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createClass>>, TError, {
    data: BodyType<ClassInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map