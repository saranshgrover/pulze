import React, { ReactElement, useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Resizable } from 're-resizable'
import DrawScramble from '../DrawScramble/DrawScramble'
import TimerStats from '../TimerStats/TimerStats'
import TimerSolve from '../TimerSolve/TimerSolve'
import { SidebarContext } from '../../providers/SidebarProvider'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	leftGrid: {
		borderRight: `1px solid ${theme.palette.secondary.light}`,
		width: '100%',
		height: 'calc(100vh - 2px)',
		display: 'flex', // this is probably redundant TODO: should i remove this?
		flexDirection: 'column',
	},
	leftGridScramble: {
		borderBottom: `1px solid ${theme.palette.secondary.light}`,
	},
}))

export default function DrawerTimer(): ReactElement {
	const [width, setWidth] = useState<string | number>('20vw')
	const { drawerWidth, open } = useContext(SidebarContext)
	const [leftGridHeight, setLeftGridHeight] = useState<string | number>('30vh')
	const classes = useStyles()
	return (
		<Grid container style={{ maxHeight: '100vh' }} wrap='nowrap'>
			<Resizable
				size={{ height: '100vh', width: width }}
				onResizeStop={(e, dir, ref, d) => setWidth(`${ref.offsetWidth}px`)}
				minWidth='10vw'
				maxWidth='50vw'
				maxHeight='calc(100%-2px)'
				enable={{
					top: false,
					right: true,
					bottom: false,
					left: true,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false,
				}}
			>
				<Grid
					item
					container
					direction='column'
					className={classes.leftGrid}
					wrap='nowrap'
					style={{ height: '100vh' }}
				>
					<Grid item>
						<Resizable
							enable={{
								top: false,
								right: false,
								bottom: true,
								left: false,
								topRight: false,
								bottomRight: false,
								bottomLeft: false,
								topLeft: false,
							}}
							className={classes.leftGridScramble}
							size={{ width: '100%', height: leftGridHeight }}
							onResizeStop={(e, dir, ref, d) =>
								setLeftGridHeight(`${ref.offsetHeight}px`)
							}
						>
							<DrawScramble />
						</Resizable>
					</Grid>
					<Grid item style={{ height: `calc(100% - ${leftGridHeight})` }}>
						<TimerStats />
					</Grid>
				</Grid>
			</Resizable>
			<Grid item>
				<TimerSolve
					width={
						open
							? `calc(100vw - ${width} - ${drawerWidth})`
							: `calc(100vw - ${width})`
					}
				/>
			</Grid>
		</Grid>
	)
}
