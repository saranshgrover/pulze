import React, { useState, useEffect, ReactElement } from 'react'
import createCtx from './createCtx'
import {
	createRxDatabase,
	//eslint-disable no-unused-vars
	removeRxDatabase,
	RxDatabase,
	RxDocument,
	addRxPlugin,
	RxCollection,
} from 'rxdb'

import LinearProgress from '@material-ui/core/LinearProgress'

export type SolveDocument = RxDocument<Timer.Solve>
export type SolveCollection = RxCollection<Timer.Solve, {}, {}>

type DatabaseCollections = {
	solves: SolveCollection
}

export type RxDbType = RxDatabase<DatabaseCollections>

const [useRxDb, CtxProvider] = createCtx<RxDbType>()

export default function RxDbProvider({
	children,
}: React.PropsWithChildren<{}>): ReactElement {
	const [rxDb, setRxDb] = useState<RxDbType>()
	useEffect(() => {
		async function bootstrap() {
			addRxPlugin(require('pouchdb-adapter-idb'))
			// if not in production, remove database on every refresh
			if (process.env.NODE_ENV !== 'production') {
				const { RxDBDevModePlugin } = require('rxdb/plugins/dev-mode')
				addRxPlugin(RxDBDevModePlugin)
				// await removeRxDatabase('testing', 'idb')
			}
			const db: RxDbType = await createRxDatabase<DatabaseCollections>({
				name: 'testing',
				adapter: 'idb',
			})
			console.dir(db)
			setRxDb(db)
		}
		bootstrap()
	}, [])
	if (!rxDb) return <LinearProgress />
	return <CtxProvider value={rxDb}>{children}</CtxProvider>
}
export { useRxDb }
