import AdminIcon from '@mui/icons-material/People';
import AdminList from './AdminList';
import AdminCreate from './AdminCreate';
import AdminEdit from './AdminEdit';


const resource = {
    list: AdminList,
    create: AdminCreate,
    edit: AdminEdit,
    icon: AdminIcon,
    recordRepresentation: (record: any) =>
        `${record.firstName} ${record.lastName}`,
};

export default resource;
