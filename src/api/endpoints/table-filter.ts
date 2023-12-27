import {ToastType, toastsActions} from '../../store/slices/toasts-slice';
import {TableData, TableFilter} from '../../types/table';
import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';

export const tableFilteredData = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTableFilteredData: builder.query<TableData, TableFilter>({
      query: (data: TableFilter) => ({
        url: API_URL.tableFilteredData(data),
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (e) {
          dispatch(
            toastsActions.showToast({
              type: ToastType.Error,
              message: 'Something went wrong',
            }),
          );
        }
      },
      providesTags: (result) => ['tableFilteredData'],
    }),
  }),
});
