import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import UpgradeIcon from '@mui/icons-material/Upgrade'
import { visuallyHidden } from '@mui/utils'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
    disablePadding: boolean
    id: string | number
    label: string
    numeric: boolean
}

interface EnhancedTableProps {
    numSelected: number
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
    order: Order
    orderBy: string
    rowCount: number
    rows: any[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort, rows } = props
    const createSortHandler =
        (property: any) => (event: React.MouseEvent<unknown>) => {
            console.log(property)
            onRequestSort(event, property)
        }

    const headCells: readonly HeadCell[] = [...Object.entries(rows[0])]
        .filter((row) => !Array.isArray(row[1]) && typeof row[1] !== 'object')
        .map((row, index) => {
            let newItem: HeadCell = {
                id: row[0],
                disablePadding: index === 0,
                label: row[0],
                numeric: index !== 0,
            }
            return newItem
        })
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align={'right'}>Delete</TableCell>
                <TableCell align={'right'}>Update</TableCell>
            </TableRow>
        </TableHead>
    )
}

interface EnhancedTableToolbarProps {
    numSelected: number
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Table
                </Typography>
            )}
        </Toolbar>
    )
}

interface IMyTable {
    rows: any[]
    remove(some: object): void
    upgrade(some: object): void
}

const MyTable: React.FC<IMyTable> = ({ rows, upgrade, remove }) => {
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [selected, setSelected] = useState<readonly string[]>([])
    const location = useLocation()

    const deleteHandler = (row: object) => {
        console.log(location.pathname)
        remove(row)
    }
    const upgradeHandler = (row: object) => {
        console.log(location.pathname)
        upgrade(row)
    }

    const handleRequestSort = (_: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750, borderColor: 'none' }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            rows={rows}
                        />
                        <TableBody>
                            {stableSort(
                                rows,
                                getComparator(order, orderBy)
                            ).map((row, index) => {
                                const isItemSelected = isSelected(
                                    row?.id as string
                                )
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell />
                                        {[...Object.entries(row)]
                                            .filter(
                                                (r) =>
                                                    !Array.isArray(r[1]) &&
                                                    typeof r[1] !== 'object'
                                            )
                                            .map((r, index) => {
                                                if (
                                                    r[0] === 'createdAt' ||
                                                    r[0] === 'updatedAt'
                                                ) {
                                                    return index === 0 ? (
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                            key={r[0]}
                                                        >
                                                            {new Date(
                                                                r[1]
                                                            ).toDateString()}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell
                                                            align="right"
                                                            key={r[0]}
                                                        >
                                                            {new Date(
                                                                r[1]
                                                            ).toDateString()}
                                                        </TableCell>
                                                    )
                                                }
                                                return index === 0 ? (
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                        key={r[0]}
                                                    >
                                                        {r[1]}
                                                    </TableCell>
                                                ) : (
                                                    <TableCell
                                                        align="right"
                                                        key={r[0]}
                                                    >
                                                        {r[1]}
                                                    </TableCell>
                                                )
                                            })}
                                        <TableCell align={'right'}>
                                            <Button
                                                onClick={() => {
                                                    deleteHandler(row)
                                                }}
                                                variant="outlined"
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            <Button
                                                onClick={() => {
                                                    upgradeHandler(row)
                                                }}
                                                variant="outlined"
                                                startIcon={<UpgradeIcon />}
                                            >
                                                Upgrade
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default MyTable
