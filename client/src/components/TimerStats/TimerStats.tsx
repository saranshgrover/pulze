import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/CancelOutlined'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { formatSolve } from '../../utils/solves'
import SessionStats from '../../utils/stats'
import { useTimerDB } from '../../providers/TimerDBProvider'
import { StoredAttempt } from 'timer-db'

const useStyles = makeStyles((theme) => ({
	tableContainer: {
		width: '100%',
		height: '100%',
	},
	table: {
		width: '100%',
		maxHeight: '100%',
		tableLayout: 'auto',
		'&:hover $iconActionsHelper, &:active $iconActionsHelper': {
			visibility: 'visible !important',
		},
	},
	tableCell: {},
	iconActionsHelper: {
		cursor: 'pointer',
	},
	tableCellNumber: {
		width: '10%',
		borderRight: `1px solid ${theme.palette.text.primary}`,
	},
	iconActions: {
		visibility: 'hidden',
	},
}))

interface StatSnapshot {
	latest100: StoredAttempt[]
	mean3: number | null
	avg5: number | null
	avg12: number | null
	avg100: number | null
	best100: number | null
	worst100: number | null
	avg1000?: number
	best1000?: number
	worst1000?: number
}
export default function TimerStats() {
	const [, currentSession, { removeSolve }] = useTimerDB()
	const [solveInfo, setSolveInfo] = useState<StatSnapshot>()
	const classes = useStyles()
	useEffect(() => {
		if (currentSession) {
			currentSession.addStatListener(listener)
			currentSession.getStatSnapshot().then((stats) => setSolveInfo(stats))
			return () => currentSession.removeStatListener(listener)
		}
	}, [currentSession])

	const listener = (stats: StatSnapshot) => {
		setSolveInfo(stats)
	}

	return (
		<TableContainer
			component={'div'}
			className={clsx(
				classes.tableContainer,
				'_scrollable autoHideScrollbar only-y little'
			)}
		>
			<Table size='small' className={classes.table}>
				<TableHead>
					<TableRow>
						{['mo3', 'ao5', 'ao12', 'ao100'].map((average) => (
							<TableCell key={average}>{average}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{['mean3', 'avg5', 'avg12', 'avg100'].map((average) => (
						<TableCell key={average + '-num'}>
							{solveInfo ? formatSolve(solveInfo[average]) || '' : ''}
						</TableCell>
					))}
				</TableBody>
			</Table>
			<Table
				stickyHeader
				className={classes.table}
				size='small'
				aria-label='a dense table'
			>
				<TableHead>
					<TableRow>
						<TableCell
							size='small'
							className={clsx(classes.tableCell, classes.tableCellNumber)}
						>
							{' '}
							#
						</TableCell>
						<TableCell className={classes.tableCell}>Time</TableCell>
						<TableCell align='right'></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{solveInfo &&
						solveInfo.latest100 &&
						solveInfo.latest100.map((solve, i) => (
							<TableRow key={solve._id}>
								<TableCell
									className={clsx([classes.tableCellNumber, classes.tableCell])}
								>
									{solveInfo.latest100.length - i}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{formatSolve(solve.totalResultMs)}
								</TableCell>
								<TableCell
									align='right'
									onClick={() => removeSolve(solve)}
									className={clsx(classes.tableCell)}
								>
									<DeleteIcon
										color='error'
										className={clsx(
											classes.iconActionsHelper,
											classes.iconActions
										)}
										fontSize='small'
									/>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
