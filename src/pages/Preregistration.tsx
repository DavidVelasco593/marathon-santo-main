import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from '@nextui-org/react';
import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { ChevronDownIcon } from '../components/preinscriptions/ChevronDownIcon';

import {
  columns2
} from '../components/preinscriptions/data';
import { capitalize } from '../components/preinscriptions/utils';
import { getUsers, updateUser } from '../services/api';


const INITIAL_VISIBLE_COLUMNS = [
  'nombres',
  'apellidos',
  'cedula',
  'categoria',
  'talla',
  'status',
  'actions',
];


export default function Users() {
  // @ts-ignore
  const [users, setUsers] = useState<User>([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Se ejecuta solo una vez, cuando se monta el componente

  const [selectedCategories, setSelectedCategories] = useState<Selection>(
    new Set([])
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);
  // const hasCategoryFilter = selectedCategories.size > 0;

  const handleAccept = async (id: any) => {
    try {
      // Actualización del estado local después de que la API haya respondido
      setUsers((prevUsers: any[]) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: 'Aprobada' } : user
        )
      );
      // Llamada a la API para actualizar el estado del usuario
      await updateUser(id, { application_status: 'Aprobada' });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleReject = async (id: any) => {
    try {
      // Actualización del estado local después de que la API haya respondido
      setUsers((prevUsers: any[]) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: 'Rechazada' } : user
        )
      );

      await updateUser(id, { application_status: 'Rechazada' });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns2;

    return columns2.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.identification.toString().includes(filterValue)
      );
    }
    return filteredUsers;
  }, [filterValue, selectedCategories, users]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: typeof User, b: typeof User) => {
      const first = a[sortDescriptor.column as keyof typeof User] as number;
      const second = b[sortDescriptor.column as keyof typeof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const categoryColorMap: Record<string, ChipProps['color']> = {
    '42k': 'success',
    '21k': 'warning',
    '10k': 'danger',
  };

  // @ts-ignore
  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    
    // @ts-ignore
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'firstName':
        return <User name={cellValue} />;
      case 'category':
        return (
          <Chip
            className="capitalize"
            color={categoryColorMap[user.category]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={
              user.status === 'Aprobada'
                ? 'success'
                : user.status === 'Rechazada'
                ? 'danger'
                : 'warning'
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'lastName':
      case 'identification':
      case 'birthDate':
      case 'gender':
      case 'phone':
      case 'email':
      case 'size':
        return cellValue;
      case 'actions':
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Button
              isIconOnly
              size="sm"
              color="success"
              variant="light"
              onPress={() => handleAccept(user.id)}
            >
              ✓
            </Button>
            <Button
              isIconOnly
              size="sm"
              color="danger"
              variant="light"
              onPress={() => handleReject(user.id)}
            >
              ✕
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onCategoryChange = useCallback((category: Selection) => {
    setSelectedCategories(category);
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns2.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} participantes
          </span>
          <label className="flex items-center text-default-400 text-small">
            Registros por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    selectedCategories,
    onSearchChange,
    onRowsPerPageChange,
    onCategoryChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los registros seleccionados'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <div>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
