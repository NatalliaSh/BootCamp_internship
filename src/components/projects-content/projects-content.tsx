import {FC} from 'react';
import {TableToolbar} from '../table-toolbar';
import {tableID} from '../../constants';
import {useGetTableDataQuery} from '../../api/endpoints';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {stateSelectors} from '../../store/store';
import {userRoles} from '../../constants';
import {Table} from '../table';

export const ProjectsContent: FC = () => {
  const {data} = useGetTableDataQuery(tableID.projectsTable);
  const {role} = useAppSelector(stateSelectors.currentUserSliceData);

  return (
    <>
      <TableToolbar />
      {data && (
        <Table
          data={data}
          isReadOnlyTable={role === userRoles.user}
          withFooter
        />
      )}
    </>
  );
};
